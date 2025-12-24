import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { Edit2, Upload } from "lucide-react";
import CandidateBreadcrumb from "../../../components/candidate/CandidateBreadcrumb";
import Loading from "../../../components/common/Loading";
import {
  fetchCoverLetter,
  fetchCvFiles,
  fetchCvSetting,
  patchCvFile,
  saveCoverLetter,
  deleteCvFile,
  upsertCvSetting,
  uploadCvFile,
} from "../../../apis/cvManagementApi";
import type {
  CandidateCoverLetterEntry,
  CandidateCvFile,
  CandidateCvSetting,
} from "../../../types/candidate.type";
import { RootState } from "../../../store";
import DefaultCvModal from "./components/DefaultCvModal";
import UploadCvModal from "./components/UploadCvModal";
import CoverLetterModal from "./components/CoverLetterModal";

const tabs = [
  { to: "/my-cv", label: "Hồ sơ", end: true },
  { to: "/my-cv/manage", label: "Quản lý CV", end: true },
  { to: "/my-cv/job-preferences", label: "Tiêu chí tìm việc", end: true },
] as const;

type ActiveModal = "default" | "upload" | "cover" | null;

const truncateText = (text: string, limit = 160) => {
  if (!text) return "Chưa có thư xin việc.";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Không thể đọc nội dung tệp"));
    reader.readAsDataURL(file);
  });

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
      } catch (error) {
        console.error(error);
        window.alert("Không thể tải thông tin quản lý CV");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [candidateId]);

  const summaryCoverLetter = useMemo(() => truncateText(coverLetter?.content ?? ""), [coverLetter]);

  const handleSaveDefaultCv = async (useDefault: boolean) => {
    setSavingDefault(true);
    try {
      const updated = await upsertCvSetting(candidateId, useDefault, cvSetting);
      setCvSetting(updated);
      setActiveModal(null);
    } catch (error) {
      console.error(error);
      window.alert("Không thể cập nhật cài đặt CV mặc định");
    } finally {
      setSavingDefault(false);
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
      const content = await fileToBase64(file);

      await Promise.all(
        cvFiles.filter((existing) => existing.isPrimary).map((existing) => patchCvFile(existing.id, { isPrimary: false })),
      );

      const newFile = await uploadCvFile({
        candidateId,
        fileName: file.name,
        fileType: file.type || "application/octet-stream",
        fileSize: file.size,
        fileContent: content,
        isPrimary: true,
      });

      setCvFiles((prev) => [
        newFile,
        ...prev.map((fileEntry) => ({ ...fileEntry, isPrimary: false })),
      ]);
      setActiveModal(null);
    } catch (error) {
      console.error(error);
      window.alert(error instanceof Error ? error.message : "Không thể tải lên CV");
    } finally {
      setUploadingCv(false);
    }
  };

  const handleDeleteCv = async (fileId: string) => {
    setDeletingFileId(fileId);
    try {
      await deleteCvFile(fileId);
      setCvFiles((prev) => prev.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error(error);
      window.alert("Không thể xoá CV đã chọn");
    } finally {
      setDeletingFileId(null);
    }
  };

  const handleSetPrimary = async (fileId: string) => {
    setPrimaryUpdatingId(fileId);
    try {
      const updates = cvFiles.map((file) => {
        if (file.id === fileId) {
          return patchCvFile(file.id, { isPrimary: true });
        }
        if (file.isPrimary) {
          return patchCvFile(file.id, { isPrimary: false });
        }
        return Promise.resolve(null);
      });
      await Promise.all(updates);
      setCvFiles((prev) =>
        prev.map((file) => ({
          ...file,
          isPrimary: file.id === fileId,
        })),
      );
    } catch (error) {
      console.error(error);
      window.alert("Không thể đặt CV mặc định");
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
      window.alert("Không thể lưu thư xin việc");
    } finally {
      setSavingCoverLetter(false);
    }
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
      <CandidateBreadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "CV của bạn", to: "/my-cv" },
          { label: "Quản lý CV", highlight: true },
        ]}
      />
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
                  : "text-gray-600 hover:text-[#BC2228] dark:text-gray-300 dark:hover:text-white"}`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-bold text-gray-900">Chọn CV mặc định</p>
              <p className="text-sm text-gray-500">Sử dụng CV mặc định từ trang hồ sơ</p>
              <p className="mt-4 text-sm text-gray-600">
                {cvSetting?.useDefaultCv
                  ? "Hệ thống sẽ tạo CV từ thông tin Hồ sơ khi bạn ứng tuyển."
                  : "Bạn đang sử dụng CV tải lên thủ công khi ứng tuyển."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal("default")}
              className="cursor-pointer rounded-full border border-gray-200 p-2 text-[#BC2228] hover:bg-red-50"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-bold text-gray-900">Tải lên CV</p>
              <p className="text-sm text-gray-500">
                CV của bạn sẽ được sử dụng xuyên suốt quá trình ứng tuyển
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal("upload")}
              className="cursor-pointer rounded-full border border-gray-200 p-2 text-[#BC2228] hover:bg-red-50"
            >
              <Upload className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-6 space-y-3 text-sm">
            {cvFiles.length === 0 ? (
              <p className="text-gray-500">Bạn chưa tải CV nào.</p>
            ) : (
              cvFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{file.fileName}</p>
                    <p className="text-gray-500">
                      {`${(file.fileSize / (1024 * 1024)).toFixed(2)} MB`} ·{" "}
                      {new Date(file.uploadedAt).toLocaleString()} {file.isPrimary ? "· Đang sử dụng" : ""}
                    </p>
                  </div>
                  <div className="flex gap-2 text-xs font-semibold">
                    <a
                      href={file.fileContent}
                      download={file.fileName}
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-pointer rounded border border-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-100"
                    >
                      Xem CV
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-bold text-gray-900">Thư xin việc</p>
              <p className="text-sm text-gray-500">{summaryCoverLetter}</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal("cover")}
              className="cursor-pointer rounded-full border border-gray-200 p-2 text-[#BC2228] hover:bg-red-50"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>

      <DefaultCvModal
        open={activeModal === "default"}
        initialValue={cvSetting?.useDefaultCv ?? true}
        saving={savingDefault}
        onClose={() => setActiveModal(null)}
        onSave={handleSaveDefaultCv}
      />
      <UploadCvModal
        open={activeModal === "upload"}
        files={cvFiles}
        uploading={uploadingCv}
        deletingId={deletingFileId}
        primaryUpdatingId={primaryUpdatingId}
        onUpload={handleUploadCv}
        onDelete={handleDeleteCv}
        onSetPrimary={handleSetPrimary}
        onClose={() => setActiveModal(null)}
      />
      <CoverLetterModal
        open={activeModal === "cover"}
        initialTitle={coverLetter?.title ?? "Thư xin việc mặc định"}
        initialContent={coverLetter?.content ?? ""}
        saving={savingCoverLetter}
        onClose={() => setActiveModal(null)}
        onSave={handleSaveCoverLetter}
      />
    </div>
  );
};

export default CvManagement;
