import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import {
  Cake,
  Edit3,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  PlusCircle,
  Trash2,
  UserRound,
} from "lucide-react";

import CandidateBreadcrumb from "../../../components/candidate/CandidateBreadcrumb";
import ModalConfirmDelete from "../../../components/common/ModalConfirmDelete";
import {
  createCandidateSection,
  deleteCandidateSection,
  fetchCandidateSections,
  fetchCvSections,
  updateCandidateSection,
} from "../../../apis/cvSectionsApi";
import type { CandidateCvSection, CvSection } from "../../../types/cv-section.type";
import { RootState } from "../../../store";
import SectionModal from "./SectionModal";
import PreviewCV from "./PreviewCV";

const DEFAULT_CV_SECTIONS: CvSection[] = [
  {
    id: "cv_section_1",
    title: "Thêm giới thiệu bản thân",
    description: "Tóm tắt ngắn gọn về bạn, mục tiêu nghề nghiệp, tính cách và điểm mạnh nổi bật.",
  },
  {
    id: "cv_section_2",
    title: "Thêm thông tin học vấn",
    description: "Liệt kê trường học, chuyên ngành, thời gian học và thành tích học tập nổi bật.",
  },
  {
    id: "cv_section_3",
    title: "Thêm kinh nghiệm làm việc",
    description: "Ghi rõ vị trí, công ty, thời gian làm việc, mô tả trách nhiệm và thành tựu.",
  },
  {
    id: "cv_section_4",
    title: "Thêm kỹ năng chuyên môn",
    description: "Liệt kê kỹ năng kỹ thuật, phần mềm, kỹ năng mềm và mức độ thành thạo.",
  },
];

const tabs = [
  { to: "/my-cv", label: "Hồ sơ" },
  { to: "/my-cv/manage", label: "Quản lý CV" },
  { to: "/my-cv/job-preferences", label: "Tiêu chí tìm việc" },
];

const Profile = () => {
  const { userId } = useSelector((state: RootState) => state.user);
  const candidateId = userId ?? "demo_candidate";

  const [cvSections, setCvSections] = useState<CvSection[]>(DEFAULT_CV_SECTIONS);
  const [candidateSections, setCandidateSections] = useState<CandidateCvSection[]>([]);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingSection, setEditingSection] = useState<CandidateCvSection | null>(null);
  const [savingSection, setSavingSection] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<CandidateCvSection | null>(null);
  const [deletingSection, setDeletingSection] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    fetchCvSections()
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setCvSections(data);
        }
      })
      .catch(() => {
        /* ignore fallback */
      });
  }, []);

  useEffect(() => {
    fetchCandidateSections(candidateId)
      .then((data) => setCandidateSections(data))
      .catch(() => {
        /* ignore */
      });
  }, [candidateId]);

  const quickSections = useMemo(() => cvSections.slice(0, 4), [cvSections]);

  const highlightTemporarily = (id: string) => {
    setHighlightedId(id);
    setTimeout(() => setHighlightedId(null), 900);
  };

  const handleAddSection = async (sectionId: string) => {
    const template = cvSections.find((item) => item.id === sectionId);
    if (!template) return;

    const existing = candidateSections.find((item) => item.cvSectionId === sectionId);
    if (existing) {
      highlightTemporarily(existing.id);
      return;
    }

    try {
      const created = await createCandidateSection({
        candidateId,
        cvSectionId: template.id,
        title: template.title,
        description: template.description,
      });
      setCandidateSections((prev) => [...prev, created]);
      highlightTemporarily(created.id);
    } catch {
      alert("Không thể thêm mục mới lúc này.");
    }
  };

  const handleEditSection = (section: CandidateCvSection) => {
    setEditingSection(section);
  };

  const handleUpdateSection = async (payload: { title: string; description: string }) => {
    if (!editingSection) return;
    setSavingSection(true);
    try {
      const updated = await updateCandidateSection(editingSection.id, payload);
      setCandidateSections((prev) => prev.map((item) => (item.id === editingSection.id ? updated : item)));
      highlightTemporarily(editingSection.id);
      setEditingSection(null);
    } catch {
      alert("Không thể cập nhật mục này.");
    } finally {
      setSavingSection(false);
    }
  };

  const handleRequestDelete = (section: CandidateCvSection) => {
    setSectionToDelete(section);
  };

  const handleCancelDelete = () => {
    if (deletingSection) return;
    setSectionToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!sectionToDelete) return;
    setDeletingSection(true);
    try {
      await deleteCandidateSection(sectionToDelete.id);
      setCandidateSections((prev) => prev.filter((item) => item.id !== sectionToDelete.id));
      setSectionToDelete(null);
    } catch {
      alert("Không thể xóa mục này.");
    } finally {
      setDeletingSection(false);
    }
  };

  const handleDownloadPreview = () => {
    window.print();
  };

  const renderModals = () => (
    <>
      {showModal && (
        <AddContentModal sections={cvSections} onClose={() => setShowModal(false)} onSelect={handleAddSection} />
      )}
      <SectionModal
        open={Boolean(editingSection)}
        section={editingSection}
        saving={savingSection}
        onClose={() => setEditingSection(null)}
        onSave={handleUpdateSection}
      />
      <ModalConfirmDelete
        open={Boolean(sectionToDelete)}
        itemName={sectionToDelete?.title}
        description="Bạn chắc chắn muốn xóa mục"
        confirming={deletingSection}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );

  if (previewMode) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] text-[#333333] antialiased dark:bg-[#0f172a] dark:text-gray-200">
        <CandidateBreadcrumb
          items={[
            { label: "Trang chủ", to: "/" },
            { label: "CV của bạn", highlight: true },
          ]}
        />
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Xem trước CV</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Kiểm tra lần cuối trước khi tải xuống.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setPreviewMode(false)}
              className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-zinc-600 dark:text-gray-200 dark:hover:bg-zinc-700"
            >
              Quay về chỉnh sửa
            </button>
            <button
              type="button"
              onClick={handleDownloadPreview}
              className="rounded bg-[#B71C1C] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(183,28,28,0.25)] hover:bg-[#a11919]"
            >
              Tải CV
            </button>
          </div>
        </div>
        <PreviewCV sections={candidateSections} />
        {renderModals()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#333333] antialiased dark:bg-[#121212] dark:text-gray-200">
      <CandidateBreadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "CV của bạn", highlight: true },
        ]}
      />

      <div className="border-b border-gray-200 bg-white dark:border-zinc-700 dark:bg-[#1E1E1E]">
        <nav className="mx-auto flex max-w-7xl gap-5 px-4 text-sm font-medium">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `py-3 transition-colors ${
                  isActive
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

      <div className="mx-auto grid max-w-7xl flex-grow grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        <aside className="space-y-4 lg:col-span-4">
          <div className="rounded border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-[#1E1E1E]">
            <h3 className="mb-4 font-bold text-gray-800 dark:text-white">
              Nâng cấp hồ sơ xin việc của bạn bằng việc bổ sung các trường sau
            </h3>
            <ul className="border-t border-gray-200 text-sm dark:border-zinc-700">
              {quickSections.map((section) => (
                <li
                  key={section.id}
                  className="flex cursor-pointer items-center gap-3 py-3 text-[#B71C1C] transition hover:bg-gray-50 dark:text-red-400 dark:hover:bg-zinc-800"
                  onClick={() => handleAddSection(section.id)}
                >
                  <PlusCircle className="h-5 w-5" />
                  <span className="font-medium">{section.title}</span>
                </li>
              ))}
              <li
                className="flex cursor-pointer items-center justify-between py-4 text-gray-800 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-zinc-800"
                onClick={() => setShowModal(true)}
              >
                <span className="font-medium">Thêm thông tin khác</span>
                <span className="text-xl text-gray-400">⌄</span>
              </li>
            </ul>
            <div className="my-4 h-px bg-gray-200 dark:bg-zinc-700" />
            <div className="mb-4 flex items-start gap-3">
              <FileText className="h-10 w-10 text-gray-600 dark:text-gray-300" />
              <p className="text-sm font-bold text-gray-800 dark:text-white">
                Nâng cấp hồ sơ xin việc của bạn bằng việc bổ sung các trường sau
              </p>
            </div>
            <button
              className="w-full rounded bg-[#B71C1C] py-2 text-sm font-medium text-white transition hover:bg-red-800"
              onClick={() => setPreviewMode(true)}
            >
              Xem Và Tải CV
            </button>
          </div>
        </aside>

        <main className="space-y-4 lg:col-span-8">
          <ProfileCard />
          {candidateSections.length === 0 ? (
            <div className="rounded border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500 dark:border-zinc-700 dark:bg-[#1E1E1E]">
              Bạn chưa thêm mục nào. Hãy chọn một trường nội dung để bắt đầu hoàn thiện CV.
            </div>
          ) : (
            candidateSections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                highlight={highlightedId === section.id}
                onEdit={() => handleEditSection(section)}
                onDelete={() => handleRequestDelete(section)}
              />
            ))
          )}
        </main>
      </div>

      {renderModals()}
    </div>
  );
};

const ProfileCard = () => (
  <section className="relative rounded border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-[#1E1E1E]">
    <button className="absolute right-4 top-4 rounded p-1 text-[#B71C1C] hover:bg-gray-100 dark:text-red-400 dark:hover:bg-zinc-700">
      <Edit3 className="h-4 w-4" />
    </button>
    <div className="flex flex-col items-start gap-6 sm:flex-row">
      <div className="flex h-20 w-20 items-center justify-center rounded border border-gray-200 bg-white text-2xl font-bold italic text-orange-500 dark:border-zinc-700">
        FPT
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Nguyễn Minh Dương</h2>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Full-Stack Developer</p>
        <div className="grid grid-cols-1 gap-y-2 gap-x-8 text-sm text-gray-600 dark:text-gray-300 md:grid-cols-2">
          <ProfileField icon={<Mail className="h-4 w-4" />} label="Abc@Gmail.Com" />
          <ProfileField icon={<Phone className="h-4 w-4" />} label="0123456789" />
          <ProfileField icon={<Cake className="h-4 w-4" />} label="8/3/2023" />
          <ProfileField icon={<UserRound className="h-4 w-4" />} label="Giới tính" />
          <ProfileField icon={<MapPin className="h-4 w-4" />} label="Địa chỉ hiện tại" fullWidth />
          <ProfileField icon={<Globe className="h-4 w-4" />} label="Trang cá nhân" fullWidth />
        </div>
      </div>
    </div>
  </section>
);

const SectionCard = ({
  section,
  highlight,
  onEdit,
  onDelete,
}: {
  section: CandidateCvSection;
  highlight: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <section
    className={`rounded border border-gray-200 bg-white p-6 shadow-sm transition-transform dark:border-zinc-700 dark:bg-[#1E1E1E] ${
      highlight ? "scale-[1.01] ring-2 ring-[#BC2228]" : ""
    }`}
  >
    <div className="mb-2 flex items-center justify-between">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{section.title}</h3>
      <div className="flex gap-2">
        <button
          className="rounded p-1 text-[#B71C1C] transition hover:bg-gray-100 dark:text-red-400 dark:hover:bg-zinc-700"
          onClick={onEdit}
        >
          <Edit3 className="h-4 w-4" />
        </button>
        <button
          className="rounded p-1 text-[#B71C1C] transition hover:bg-gray-100 dark:text-red-400 dark:hover:bg-zinc-700"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
    <p className="text-sm italic text-gray-500 dark:text-gray-400">{section.description}</p>
  </section>
);

const ProfileField = ({ icon, label, fullWidth }: { icon: React.ReactNode; label: string; fullWidth?: boolean }) => (
  <div className={`flex items-center ${fullWidth ? "md:col-span-2" : ""}`}>
    <span className="mr-2 text-gray-400">{icon}</span>
    <span>{label}</span>
  </div>
);

const AddContentModal = ({
  sections,
  onClose,
  onSelect,
}: {
  sections: CvSection[];
  onClose: () => void;
  onSelect: (id: string) => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h3 className="text-2xl font-bold text-[#1b103f]">Add content</h3>
          <p className="text-sm text-gray-500">Chọn nội dung bạn muốn thêm vào CV.</p>
        </div>
        <button onClick={onClose} className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
          ✕
        </button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <div
            key={section.id}
            className="cursor-pointer rounded-lg border border-gray-200 bg-[#F7F7FB] p-4 text-left text-sm text-gray-600 transition hover:border-[#BC2228] hover:bg-white"
            onClick={() => {
              onSelect(section.id);
              onClose();
            }}
          >
            <p className="text-base font-semibold text-[#2a1f5c]">{section.title}</p>
            <p className="mt-2 text-xs text-gray-500">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Profile;
