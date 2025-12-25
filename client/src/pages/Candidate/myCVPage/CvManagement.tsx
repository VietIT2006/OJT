import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { Edit2, FileText, Upload } from "lucide-react";
import Loading from "../../../components/common/Loading";
import {
  deleteCvFile,
  fetchCoverLetter,
  fetchCvFiles,
  fetchCvSetting,
  patchCvFile,
  saveCoverLetter,
  uploadCvFile,
  upsertCvSetting,
} from "../../../apis/cvManagementApi";
import type {
  CandidateCoverLetterEntry,
  CandidateCvFile,
  CandidateCvSetting,
} from "../../../types/candidate.type";
import { RootState } from "../../../store";
import CoverLetterModal from "./components/CoverLetterModal";
import ModalConfirmDelete from "../../../components/common/ModalConfirmDelete";
import CvIcon from "../../../assets/images/cv 1.png"
import Pen from "../../../assets/images/Pen.png"

const tabs = [
  { to: "/my-cv", label: "Hồ sơ", end: true },
  { to: "/my-cv/manage", label: "Quản lý CV", end: true },
  { to: "/my-cv/job-preferences", label: "Tiêu chí tìm việc", end: true },
] as const;

type ActiveModal = "cover" | null;

const truncateText = (text: string, limit = 160) => {
  if (!text) return "Chưa có thư xin việc.";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

const formatBytes = (bytes: number) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB"];
  const idx = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** idx).toFixed(1)} ${units[idx]}`;
};

const formatTimestamp = (value?: string | null) => {
  if (!value) return "Chưa cập nhật";
  return new Date(value).toLocaleString("vi-VN");
};

const CvManagement = () => {
  const { userId } = useSelector((state: RootState) => state.user);
  const candidateId = userId ?? "0446";

  const [loading, setLoading] = useState(true);
  const [cvSetting, setCvSetting] = useState<CandidateCvSetting | null>(null);
  const [cvFiles, setCvFiles] = useState<CandidateCvFile[]>([]);
  const [coverLetter, setCoverLetter] = useState<CandidateCoverLetterEntry | null>(null);

  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [savingDefault, setSavingDefault] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);
  const [primaryUpdatingId, setPrimaryUpdatingId] = useState<string | null>(null);
  const [savingCoverLetter, setSavingCoverLetter] = useState(false);
  const [isProfileMode, setIsProfileMode] = useState(true);
  const [confirmDeleteFile, setConfirmDeleteFile] = useState<CandidateCvFile | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [setting, files, coverLetterEntry] = await Promise.all([
          fetchCvSetting(candidateId),
          fetchCvFiles(candidateId),
          fetchCoverLetter(candidateId),
        ]);
        setCvSetting(setting);
        setCvFiles(files);
        setCoverLetter(coverLetterEntry);
        setIsProfileMode((setting?.mode ?? "profile") === "profile");
      } catch (error) {
        console.error(error);
        window.alert("Không thể tải thông tin quản lý CV.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [candidateId]);

  const summaryCoverLetter = useMemo(() => truncateText(coverLetter?.content ?? ""), [coverLetter]);
  const sortedCvFiles = useMemo(
    () => [...cvFiles].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()),
    [cvFiles],
  );
  const activeFileId = cvSetting?.mode === "file" ? cvSetting.fileId ?? null : null;

  const updateCvSettingMode = async (mode: "profile" | "file", fileId: string | null = null) => {
    setSavingDefault(true);
    try {
      const updated = await upsertCvSetting(candidateId, mode, fileId, cvSetting);
      setCvSetting(updated);
      setIsProfileMode(updated.mode === "profile");
    } catch (error) {
      console.error(error);
      window.alert("Không thể cập nhật chế độ CV mặc định.");
      throw error;
    } finally {
      setSavingDefault(false);
    }
  };

  const handleToggleProfileMode = async (checked: boolean) => {
    if (checked) {
      try {
        await updateCvSettingMode("profile");
      } catch {
        setIsProfileMode(false);
      }
      return;
    }

    const nextFile = cvFiles.find((file) => file.isPrimary) ?? cvFiles[0];
    if (!nextFile) {
      window.alert("Bạn chưa tải CV nào lên để sử dụng.");
      setIsProfileMode(true);
      return;
    }

    try {
      await updateCvSettingMode("file", nextFile.id);
    } catch {
      setIsProfileMode(true);
    }
  };

  const validateFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      throw new Error("Vui lòng chọn tệp .pdf, .doc hoặc .docx");
    }
    if (file.size > 3 * 1024 * 1024) {
      throw new Error("Dung lượng tệp vượt quá 3MB");
    }
  };

  const handleUploadCv = async (file: File) => {
    setUploadingCv(true);
    try {
      validateFile(file);
      const newFile = await uploadCvFile(candidateId, file);
      setCvFiles((prev) => {
        const normalized = newFile.isPrimary
          ? prev.map((entry) => (entry.candidateId === candidateId ? { ...entry, isPrimary: false } : entry))
          : prev;
        return [newFile, ...normalized];
      });

      if (!cvSetting || cvSetting.mode !== "profile") {
        await updateCvSettingMode("file", newFile.id);
      }
    } catch (error) {
      console.error(error);
      window.alert(error instanceof Error ? error.message : "Không thể tải CV mới.");
    } finally {
      setUploadingCv(false);
    }
  };

  const handleDeleteCv = async (fileId: string) => {
    setDeletingFileId(fileId);
    try {
      await deleteCvFile(fileId);
      const remaining = cvFiles.filter((file) => file.id !== fileId);
      setCvFiles(remaining);

      if (cvSetting?.mode === "file" && cvSetting.fileId === fileId) {
        const next = remaining.find((file) => file.isPrimary) ?? remaining[0] ?? null;
        if (next) {
          await updateCvSettingMode("file", next.id);
        } else {
          await updateCvSettingMode("profile");
        }
      }
    } catch (error) {
      console.error(error);
      window.alert("Không thể xoá CV này.");
    } finally {
      setDeletingFileId(null);
    }
  };

  const handleConfirmDeleteCv = async () => {
    if (!confirmDeleteFile) return;
    try {
      await handleDeleteCv(confirmDeleteFile.id);
      setConfirmDeleteFile(null);
    } catch {
      // errors handled inside handleDeleteCv
    }
  };

  const handleSetPrimary = async (fileId: string) => {
    setPrimaryUpdatingId(fileId);
    try {
      const updated = await patchCvFile(fileId, { isPrimary: true });
      setCvFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) return updated;
          if (file.candidateId === updated.candidateId) return { ...file, isPrimary: false };
          return file;
        }),
      );
      await updateCvSettingMode("file", fileId);
    } catch (error) {
      console.error(error);
      window.alert("Không thể đặt CV này làm mặc định.");
    } finally {
      setPrimaryUpdatingId(null);
    }
  };

  const handleSaveCoverLetter = async ({ title, content }: { title: string; content: string }) => {
    setSavingCoverLetter(true);
    try {
      const saved = await saveCoverLetter(
        candidateId,
        content,
        title || "Thư xin việc mặc định",
        coverLetter,
      );
      setCoverLetter(saved);
      setActiveModal(null);
    } catch (error) {
      console.error(error);
      window.alert("Không thể lưu thư xin việc.");
    } finally {
      setSavingCoverLetter(false);
    }
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#333333] antialiased dark:bg-[#121212] dark:text-gray-200">
      <div className="border-b border-gray-200 bg-white dark:border-zinc-700 dark:bg-[#1E1E1E]">
        <nav className="mx-auto flex max-w-7xl gap-5 px-4 text-sm font-medium">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `py-3 transition-colors ${isActive
                  ? "border-b-2 border-[#BC2228] text-[#BC2228] dark:border-red-500 dark:text-red-500"
                  : "text-gray-600 hover:text-[#BC2228] dark:text-gray-300 dark:hover:text-white"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6">
        <section className="rounded-[8px] border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <div>
                <span className="text-2xl font-bold text-gray-900">Chọn CV mặc định</span>
              </div>
            </div>
            <div className="rounded-[8px] border border-gray-200 bg-white p-6 shadow-sm">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={isProfileMode}
                  onChange={(event) => handleToggleProfileMode(event.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-[#BC2228] focus:ring-[#BC2228]"
                />
                <span className="text-lg font-semibold text-[#BC2228]">Sử dụng CV từ Hồ sơ</span>
              </label>
              <span className="text-sm text-gray-500">Sử dụng CV được tạo từ trang Hồ sơ.</span>
              {savingDefault && <p className="mt-2 text-sm text-gray-500">Đang cập nhật...</p>}
            </div>
          </div>
        </section>

        <section className="rounded-[8px] border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div>
              <span className="text-2xl font-bold text-gray-900">Tải lên CV</span>
              <div className="text-sm text-gray-500">
                Tải CV của bạn bên dưới để có thể sử dụng xuyên suốt quá trình tìm việc.
              </div>
            </div>
          </div>

          <div className="flex gap-5 mt-6 rounded-[8px] border-2 border-dashed border-gray-200 bg-gray-50 p-4 ">
            <img className="w-17 h-17" src={CvIcon} alt="CV Icon" />
            <div className="">
              <div className="text-[20px] font-semibold text-gray-900">CV của bạn</div>
              <div className="mt-1 text-sm text-gray-500">(Sử dụng tệp .doc, .docx hoặc .pdf, không chứa mật khẩu bảo vệ và dưới 3MB)</div>
              <div className="mt-1 flex flex-wrap gap-3 text-sm font-semibold">
                <button
                  type="button"
                  onClick={handleTriggerFileInput}
                  className="cursor-pointer inline-flex items-center gap-2 text-[#BC2228] hover:text-[#a31c20]"
                >
                  <Upload className="h-4 w-4" />
                  {uploadingCv ? "Đang tải lên..." : "Tải lên CV mới"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      handleUploadCv(file);
                      event.target.value = "";
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            {sortedCvFiles.length === 0 ? (
              <p className="text-gray-500">Bạn chưa tải CV nào.</p>
            ) : (
              sortedCvFiles.map((file) => {
                const isActiveFile = activeFileId === file.id && cvSetting?.mode === "file";
                return (
                  <div
                    key={file.id}
                    className="flex flex-col gap-3 rounded-[8px] border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{file.fileName}</p>
                      <p className="text-gray-500">
                        {formatBytes(file.fileSize)} · {formatTimestamp(file.uploadedAt)}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs">
                        {file.isPrimary && (
                          <span className="inline-flex items-center rounded-[8px] bg-white px-2 py-0.5 font-semibold text-[#BC2228]">
                            Ưu tiên
                          </span>
                        )}
                        {isActiveFile && (
                          <span className="inline-flex items-center rounded-[8px] bg-[#BC2228]/10 px-2 py-0.5 font-semibold text-[#BC2228]">
                            Đang dùng để ứng tuyển
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(file.id)}
                        disabled={primaryUpdatingId === file.id || deletingFileId === file.id}
                        className="cursor-pointer rounded-[8px] border border-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
                      >
                        {isActiveFile
                          ? "Đang sử dụng"
                          : primaryUpdatingId === file.id
                            ? "Đang cập nhật..."
                            : "Đặt làm mặc định"}
                      </button>
                      <a
                        href={file.fileUrl}
                        download={file.fileName}
                        className="cursor-pointer rounded-[8px] border border-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-100"
                      >
                        Tải xuống
                      </a>
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer rounded-[8px] border border-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-100"
                      >
                        Xem CV
                      </a>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteFile(file)}
                        disabled={deletingFileId === file.id || primaryUpdatingId === file.id}
                        className="cursor-pointer rounded-[8px] border border-red-200 px-3 py-1 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:text-red-300"
                      >
                        {deletingFileId === file.id ? "Đang xoá..." : "Xoá"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className="rounded-[8px] border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">Thư xin việc</p>
              <p className="text-sm text-gray-500">
                Giới thiệu bản thân và lý do vì sao bạn là ứng viên phù hợp.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal("cover")}
              className="cursor-pointer rounded-full p-2 text-[#BC2228] hover:bg-red-50"
            >
              <img src={Pen} alt="Edit" />
            </button>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">{summaryCoverLetter}</p>
          <p className="mt-2 text-xs text-gray-400">
            Cập nhật lần cuối: {formatTimestamp(coverLetter?.updatedAt)}
          </p>
        </section>
      </div>

      <CoverLetterModal
        open={activeModal === "cover"}
        initialTitle={coverLetter?.title ?? "Thư xin việc mặc định"}
        initialContent={coverLetter?.content ?? ""}
        saving={savingCoverLetter}
        onClose={() => setActiveModal(null)}
        onSave={handleSaveCoverLetter}
      />
      <ModalConfirmDelete
        open={Boolean(confirmDeleteFile)}
        itemName={confirmDeleteFile?.fileName}
        confirming={Boolean(deletingFileId)}
        onCancel={() => {
          if (!deletingFileId) {
            setConfirmDeleteFile(null);
          }
        }}
        onConfirm={handleConfirmDeleteCv}
      />
    </div>
  );
};

export default CvManagement;
