import type { CandidateCvSection } from "../../../types/cv-section.type";
import SkillsSectionModal from "./section-modals/SkillsSectionModal";
import CertificatesSectionModal from "./section-modals/CertificatesSectionModal";
import ProjectsSectionModal from "./section-modals/ProjectsSectionModal";
import ExperienceSectionModal from "./section-modals/ExperienceSectionModal";
import EducationSectionModal from "./section-modals/EducationSectionModal";
import AboutSectionModal from "./section-modals/AboutSectionModal";
import LanguagesSectionModal from "./section-modals/LanguagesSectionModal";
import HobbiesSectionModal from "./section-modals/HobbiesSectionModal";
import CoursesSectionModal from "./section-modals/CoursesSectionModal";
import AwardsSectionModal from "./section-modals/AwardsSectionModal";
import OrganizationsSectionModal from "./section-modals/OrganizationsSectionModal";
import PublicationsSectionModal from "./section-modals/PublicationsSectionModal";
import ReferencesSectionModal from "./section-modals/ReferencesSectionModal";
import StatementSectionModal from "./section-modals/StatementSectionModal";
import ActivitiesSectionModal from "./section-modals/ActivitiesSectionModal";
import CustomSectionModal from "./section-modals/CustomSectionModal";
import GenericSectionModal from "./section-modals/GenericSectionModal";

type SectionType =
  | "skills"
  | "certificates"
  | "projects"
  | "experience"
  | "education"
  | "about"
  | "languages"
  | "hobbies"
  | "courses"
  | "awards"
  | "organizations"
  | "publications"
  | "references"
  | "statement"
  | "activities"
  | "custom"
  | "generic";

const SECTION_BY_ID: Record<string, SectionType> = {
  cv_section_1: "about",
  cv_section_2: "education",
  cv_section_3: "experience",
  cv_section_4: "skills",
  cv_section_6: "certificates",
  cv_section_8: "projects",
  cv_section_5: "languages",
  cv_section_7: "hobbies",
  cv_section_9: "courses",
  cv_section_10: "awards",
  cv_section_11: "organizations",
  cv_section_12: "publications",
  cv_section_13: "references",
  cv_section_14: "statement",
  cv_section_15: "activities",
  cv_section_16: "custom",
};

const getSectionType = (section?: CandidateCvSection | null): SectionType => {
  if (!section) return "generic";
  return SECTION_BY_ID[section.cvSectionId] ?? "generic";
};

type SectionModalProps = {
  open: boolean;
  section: CandidateCvSection | null;
  saving?: boolean;
  onClose: () => void;
  onSave: (payload: { title: string; description: string }) => void;
};

const SectionModal = ({ open, section, saving = false, onClose, onSave }: SectionModalProps) => {
  if (!open || !section) return null;
  const sectionType = getSectionType(section);

  const renderContent = () => {
    switch (sectionType) {
      case "skills":
        return <SkillsSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "certificates":
        return <CertificatesSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "projects":
        return <ProjectsSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "experience":
        return <ExperienceSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "education":
        return <EducationSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "about":
        return <AboutSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "languages":
        return <LanguagesSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "hobbies":
        return <HobbiesSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "courses":
        return <CoursesSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "awards":
        return <AwardsSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "organizations":
        return <OrganizationsSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "publications":
        return <PublicationsSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "references":
        return <ReferencesSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "statement":
        return <StatementSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "activities":
        return <ActivitiesSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      case "custom":
        return <CustomSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
      default:
        return <GenericSectionModal section={section} saving={saving} onCancel={onClose} onSave={onSave} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      {renderContent()}
    </div>
  );
};

export default SectionModal;
