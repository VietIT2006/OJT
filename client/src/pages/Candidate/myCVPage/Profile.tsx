import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { Cake, Globe, Mail, MapPin, Phone, PlusCircle, UserRound, Edit3 } from "lucide-react";
import axios from "axios";
import CandidateBreadcrumb from "../../../components/candidate/CandidateBreadcrumb";
import ModalConfirmDelete from "../../../components/common/ModalConfirmDelete";
import { createCandidateSection, deleteCandidateSection, fetchCandidateSections, fetchCvSections, updateCandidateSection, } from "../../../apis/cvSectionsApi";
import type { CandidateCvSection, CvSection } from "../../../types/cv-section.type";
import { RootState } from "../../../store";
import SectionModal from "./SectionModal";
import PreviewCV from "./PreviewCV";
import PersonalInfoModal from "./section-modals/PersonalInfoModal";
import type { CandidateProfile, CustomProfileField } from "../../../types/candidate.type";

import basicAvatar from "../../../assets/images/basicAvatar.jpg";
import ArrowDown from "../../../assets/images/chevron.down.png";
import CvIcon from "../../../assets/images/cv 1.png";
import Trash from "../../../assets/images/Trash.png";
import AddIcon from "../../../assets/images/Add-icon.png";
import Pen from "../../../assets/images/Pen.png";


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

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const DEFAULT_PROFILE: CandidateProfile = {
  id: null,
  fullName: "Chưa cập nhật",
  position: "",
  email: "",
  phone: "",
  address: "",
  dob: "",
  gender: "",
  status: "",
  avatar: "",
  customFields: [],
};

const decodeJwtPayload = (token: string) => {
  try {
    const base64 = token.split(".")[1];
    if (!base64) return null;
    const normalized = base64.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(normalized);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

const parseCustomFields = (raw: unknown): CustomProfileField[] => {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .filter((item): item is CustomProfileField => typeof item?.name === "string" && typeof item?.value === "string")
      .map((field) => ({ name: field.name, value: field.value }));
  }
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed
          .filter((item): item is CustomProfileField => typeof item?.name === "string" && typeof item?.value === "string")
          .map((field) => ({ name: field.name, value: field.value }));
      }
    } catch {
      return [];
    }
  }
  return [];
};

const mapCandidateToProfile = (candidate: any): CandidateProfile => {
  const genderValue =
    typeof candidate?.gender === "number" ? (candidate.gender === 1 ? "Nam" : "Nữ") : candidate?.gender || "";

  return {
    id: candidate?.id ?? null,
    fullName: candidate?.name || candidate?.fullname || "Chưa cập nhật",
    position: candidate?.position || "",
    email: candidate?.email || "",
    phone: candidate?.phone || "",
    address: candidate?.address || "",
    dob: candidate?.dob || "",
    gender: genderValue,
    status: candidate?.status || candidate?.personalStatus || "",
    avatar: candidate?.avatar || "",
    customFields: parseCustomFields(candidate?.customFields),
  };
};

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
  const [profileInfo, setProfileInfo] = useState<CandidateProfile>(DEFAULT_PROFILE);
  const [personalModalOpen, setPersonalModalOpen] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const highlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const payload = decodeJwtPayload(token);
    if (!payload?.id) return;
    axios
      .get(`${API_BASE}/candidates/${payload.id}`)
      .then((res) => setProfileInfo(mapCandidateToProfile(res.data)))
      .catch(() => {
        /* ignore profile load errors */
      });
  }, []);

  useEffect(
    () => () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    },
    []
  );

  const quickSections = useMemo(() => cvSections.slice(0, 4), [cvSections]);

  const highlightTemporarily = (id: string, options: { scrollIntoView?: boolean } = {}) => {
    if (!id) return;
    setHighlightedId(id);
    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }
    if (options.scrollIntoView !== false && typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(`[data-section-entry="${id}"]`);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    }
    highlightTimeoutRef.current = setTimeout(() => setHighlightedId(null), 900);
  };

  const handleAddSection = async (sectionId: string, allowDuplicate = false) => {
    const template = cvSections.find((item) => item.id === sectionId);
    if (!template) return;

    if (!allowDuplicate) {
      const existing = candidateSections.find((item) => item.cvSectionId === sectionId);
      if (existing) {
        highlightTemporarily(existing.id);
        return;
      }
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

  const handleProfileSave = async (updatedProfile: CandidateProfile) => {
    setProfileSaving(true);
    try {
      if (updatedProfile.id) {
        await axios.patch(`${API_BASE}/candidates/${updatedProfile.id}`, {
          name: updatedProfile.fullName,
          position: updatedProfile.position,
          email: updatedProfile.email,
          phone: updatedProfile.phone,
          address: updatedProfile.address,
          dob: updatedProfile.dob,
          gender: updatedProfile.gender,
          status: updatedProfile.status,
          customFields: updatedProfile.customFields,
        });
      }
      setProfileInfo(updatedProfile);
      setPersonalModalOpen(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setProfileSaving(false);
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
      highlightTemporarily(editingSection.id, { scrollIntoView: false });
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
      <PersonalInfoModal
        open={personalModalOpen}
        profile={profileInfo}
        saving={profileSaving}
        onClose={() => setPersonalModalOpen(false)}
        onSave={handleProfileSave}
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
        <div className="mx-auto flex flex-wrap items-center justify-between gap-4 px-10 py-6 bg-white">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Xem trước CV</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Kiểm tra lần cuối trước khi tải xuống.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setPreviewMode(false)}
              className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-zinc-600 dark:text-gray-200 dark:hover:bg-zinc-700"
            >
              Quay về chỉnh sửa
            </button>
            <button
              type="button"
              onClick={handleDownloadPreview}
              className="cursor-pointer rounded bg-[#B71C1C] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(183,28,28,0.25)] hover:bg-[#a11919]"
            >
              Tải CV
            </button>
          </div>
        </div>
        <PreviewCV sections={candidateSections} profile={profileInfo} />
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

      <div className="mx-auto grid max-w-7xl flex-grow grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        <aside className="space-y-4 lg:col-span-4">
          <div className="rounded border border-gray-200 bg-white p-5 pb-15 shadow-sm dark:border-zinc-700 dark:bg-[#1E1E1E]">
            <p className="text-[18px] font-bold text-gray-800 dark:text-white">
              Nâng cấp hồ sơ xin việc của bạn bằng việc bổ sung các trường sau
            </p>
            <ul className="border-t border-gray-200 text-sm dark:border-zinc-700">
              {quickSections.map((section) => (
                <li
                  key={section.id}
                  className="flex cursor-pointer items-center gap-3 py-3 mb-3 text-[#B71C1C] transition hover:bg-gray-50 dark:text-red-400 dark:hover:bg-zinc-800"
                  onClick={() => handleAddSection(section.id)}
                >
                  <PlusCircle className="h-5 w-5" />
                  <span className="font-medium">{section.title}</span>
                </li>
              ))}
              <li
                className="flex cursor-pointer items-center pl-1 gap-4  text-gray-800 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-zinc-800"
                onClick={() => setShowModal(true)}
              >
                <span className="w-3 h-3 mt-1"><img src={ArrowDown} alt="Arrow Down" /></span>
                <span className="font-medium">Thêm thông tin khác</span>
              </li>
            </ul>
            <div className="my-4 h-px bg-gray-200 dark:bg-zinc-700" />
            <div className="mb-4 flex items-start gap-3">
              <img className="w-11 h-11" src={CvIcon} alt="CV Icon" />
              <p className="text-[18px] font-bold text-gray-800 dark:text-white">
                Nâng cấp hồ sơ xin việc của bạn bằng việc bổ sung các trường sau
              </p>
            </div>
            <div className="text-center">
              <button
                className="text-white min-w-[248px] cursor-pointer rounded bg-[#BC2228] py-3 text-sm font-medium transition hover:bg-red-800"
                onClick={() => setPreviewMode(true)}
              >
                Xem Và Tải CV
              </button>
            </div>
          </div>
        </aside>

        <main className="space-y-4 lg:col-span-8">
          <ProfileCard profile={profileInfo} onEdit={() => setPersonalModalOpen(true)} />
          {candidateSections.length === 0 ? (
            <div className="rounded border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500 dark:border-zinc-700 dark:bg-[#1E1E1E]">
              Bạn chưa thêm mục nào. Hãy chọn một trường nội dung để bắt đầu hoàn thiện CV.
            </div>
          ) : (
            Array.from(
              candidateSections.reduce((map, section) => {
                const templateKey = section.cvSectionId || section.id;
                if (!templateKey) return map;
                if (!map.has(templateKey)) {
                  map.set(templateKey, {
                    title: section.title,
                    templateId: templateKey,
                    sections: [] as CandidateCvSection[],
                  });
                }
                map.get(templateKey)?.sections.push(section);
                return map;
              }, new Map<string, { title: string; templateId: string; sections: CandidateCvSection[] }>())
            .values()
            ).map(({ title, templateId, sections }) => (
              <SectionCard
                key={templateId}
                title={title}
                entries={sections}
                highlightId={highlightedId}
                onAdd={() => handleAddSection(templateId, true)}
                onEdit={(entry) => handleEditSection(entry)}
                onDelete={(entry) => handleRequestDelete(entry)}
              />
            ))
          )}
        </main>
      </div>

      {renderModals()}
    </div>
  );
};

const ProfileCard = ({ profile, onEdit }: { profile: CandidateProfile; onEdit: () => void }) => (
  <section className="relative rounded border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-[#1E1E1E]">
    <button
      className="absolute right-4 top-4 rounded p-1 text-[#B71C1C] hover:bg-gray-100 dark:text-red-400 dark:hover:bg-zinc-700 cursor-pointer"
      onClick={onEdit}
    >
      <img src={Pen} alt="edit" />
    </button>
    <div className="flex flex-col items-start gap-6 sm:flex-row">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded border border-gray-200 bg-white text-2xl font-bold italic text-orange-500 dark:border-zinc-700">
        {profile.avatar ? <img src={profile.avatar} alt={profile.fullName} className="h-full w-full object-cover" /> : <img src={basicAvatar} alt="Basic Avatar" className="h-full w-full object-cover" />}
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{profile.fullName}</h2>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{profile.position || "Chưa cập nhật chức danh"}</p>
        <div className="grid grid-cols-1 gap-y-2 gap-x-8 text-sm text-gray-600 dark:text-gray-300 md:grid-cols-2">
          <ProfileField icon={<Mail className="h-4 w-4" />} label={profile.email || "Chưa cập nhật"} />
          <ProfileField icon={<Phone className="h-4 w-4" />} label={profile.phone || "Chưa cập nhật"} />
          <ProfileField icon={<Cake className="h-4 w-4" />} label={profile.dob || "Chưa cập nhật"} />
          <ProfileField icon={<UserRound className="h-4 w-4" />} label={profile.gender || "Chưa cập nhật"} />
          <ProfileField icon={<MapPin className="h-4 w-4" />} label={profile.address || "Chưa cập nhật"} fullWidth />
          <ProfileField icon={<Globe className="h-4 w-4" />} label={profile.status || "Chưa cập nhật"} fullWidth />
          {profile.customFields.map((field) => (
            <ProfileField
              key={`${field.name}-${field.value}`}
              label={`${field.name}: ${field.value || "Chưa cập nhật"}`}
              fullWidth
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

const formatSectionDescription = (section: CandidateCvSection) => {
  const raw = section.description;
  if (!raw) return "Chưa có nội dung";
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return typeof parsed === "string" ? parsed : raw;
    }

    switch (parsed.type) {
      case "about":
        return parsed.summary || raw;
      case "education": {
        const parts = [parsed.school, parsed.major].filter(Boolean);
        const time = [parsed.startDate, parsed.endDate].filter(Boolean).join(" - ");
        if (time) parts.push(`(${time})`);
        return parts.join(" ") || raw;
      }
      case "experience": {
        const parts = [parsed.position, parsed.company].filter(Boolean);
        const time = [parsed.startDate, parsed.endDate].filter(Boolean).join(" - ");
        if (time) parts.push(`(${time})`);
        return parts.join(" @ ") || raw;
      }
      case "projects": {
        const parts = [parsed.name, parsed.link].filter(Boolean);
        return parts.join(" • ") || raw;
      }
      case "certificates":
        return parsed.name || raw;
      case "skills": {
        const counts = [
          parsed.advanced?.length ? `Thành thạo: ${parsed.advanced.length}` : "",
          parsed.intermediate?.length ? `Trung bình: ${parsed.intermediate.length}` : "",
          parsed.beginner?.length ? `Mới bắt đầu: ${parsed.beginner.length}` : "",
        ]
          .filter(Boolean)
          .join(" | ");
        return counts || "Đã cập nhật kỹ năng";
      }
      default:
        if (parsed.description) return parsed.description;
        if (parsed.summary) return parsed.summary;
        const firstValue = Object.values(parsed).find((value) => typeof value === "string" && value.trim().length);
        if (typeof firstValue === "string") return firstValue;
        return raw;
    }
  } catch {
    return raw;
  }
};

const SectionCard = ({
  title,
  entries,
  highlightId,
  onAdd,
  onEdit,
  onDelete,
}: {
  title: string;
  entries: CandidateCvSection[];
  highlightId: string | null;
  onAdd: () => void;
  onEdit: (entry: CandidateCvSection) => void;
  onDelete: (entry: CandidateCvSection) => void;
}) => (
  <section className="rounded border border-gray-200 bg-white p-6 shadow-sm transition-transform dark:border-zinc-700 dark:bg-[#1E1E1E]">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
      <button
        className="cursor-pointer rounded p-1 text-[#B71C1C] transition hover:bg-gray-100 dark:text-red-400 dark:hover:bg-zinc-700"
        onClick={onAdd}
      >
        <img src={AddIcon} alt="Add entry" className="h-4 w-4" />
      </button>
    </div>
    <div className="space-y-3">
      {entries.map((entry) => (
        <div
          key={entry.id}
          id={`candidate-section-${entry.id}`}
          data-section-entry={entry.id}
          className={`flex items-start justify-between rounded border border-transparent bg-gray-50 px-4 py-3 transition duration-300 transform dark:bg-[#1A1A1A] ${
            highlightId === entry.id ? "border-[#BC2228] scale-[1.01] shadow-[0_15px_35px_rgba(188,34,40,0.12)]" : ""
          }`}
        >
          <p className="text-sm italic text-gray-600 dark:text-gray-300">{formatSectionDescription(entry)}</p>
          <div className="ml-3 flex gap-2">
            <button
              className="cursor-pointer rounded p-1 text-[#B71C1C] transition hover:bg-gray-100 dark:text-red-400 dark:hover:bg-zinc-700"
              onClick={() => onEdit(entry)}
            >
              <img src={Pen} alt="Edit entry" className="h-4 w-4" />
            </button>
            <button
              className="cursor-pointer rounded p-1 text-[#B71C1C] transition hover:bg-gray-100 dark:text-red-400 dark:hover:bg-zinc-700"
              onClick={() => onDelete(entry)}
            >
              <img src={Trash} alt="Delete entry" className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);
const ProfileField = ({ icon, label, fullWidth }: { icon?: React.ReactNode; label: string; fullWidth?: boolean }) => (
  <div className={`flex items-center ${fullWidth ? "md:col-span-2" : ""}`}>
    {icon ? <span className="mr-2 text-gray-400">{icon}</span> : null}
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
        <button onClick={onClose} className="cursor-pointer rounded-full p-2 text-gray-500 hover:bg-gray-100">
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

