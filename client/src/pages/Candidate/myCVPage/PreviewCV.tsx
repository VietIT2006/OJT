import type { CandidateCvSection } from "../../../types/cv-section.type";
import type { CandidateProfile } from "../../../types/candidate.type";
import basicAvatar from "../../../assets/images/basicAvatar.jpg";

type PreviewCVProps = {
  sections: CandidateCvSection[];
  profile: CandidateProfile;
};

const PreviewCV = ({ sections, profile }: PreviewCVProps) => {
  const displayName = profile.fullName?.trim() || "Chưa cập nhật";
  const displayRole = profile.position?.trim() || "Ứng viên";
  const contactDetails = [
    profile.phone?.trim() && `Điện thoại: ${profile.phone}`,
    profile.email?.trim() && `Email: ${profile.email}`,
    profile.address?.trim() && `Địa chỉ: ${profile.address}`,
    profile.customFields.find((field) => field.value)?.value || (profile.status?.trim() ? `Trạng thái: ${profile.status}` : ""),
  ].filter(Boolean);
  const avatarSrc = profile.avatar?.trim() || basicAvatar;

  return (
  <div className="bg-[#EDF0F5] px-4 pb-12 pt-7 print:bg-white print:px-0 print:pb-0 print:pt-0">
    <div className="mx-auto max-w-[920px] print:mx-0 print:max-w-full">
      <div
        id="cv-print-area"
        className="rounded-[16px] bg-white p-10 shadow-[0_25px_60px_rgba(15,23,42,0.12)] print:mx-auto print:max-w-[210mm] print:rounded-none print:p-10 print:shadow-none"
      >
        <div className="flex flex-col gap-6 border-b border-[#E5E7EB] pb-6 md:flex-row md:items-center md:justify-between print:flex-row print:items-center print:justify-between">
          <div className="flex items-start gap-4">
            <img src={avatarSrc} alt={displayName} className="h-20 w-20 rounded-full border border-[#E5E7EB] object-cover" />
            <div>
              <p className="text-sm uppercase text-[#B71C1C]">Ứng viên</p>
              <h1 className="mt-2 text-3xl font-bold text-[#111827]">{displayName}</h1>
              <p className="text-sm text-[#6B7280]">{displayRole}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-[#F7F8FD] p-4 text-sm text-[#374151]">
            {contactDetails.length ? (
              contactDetails.map((item, index) => <p key={`${item}-${index}`}>{item}</p>)
            ) : (
              <>
                <p>Phone: (not set)</p>
                <p>Email: (not set)</p>
              </>
            )}
          </div>
        </div>
        <div className="mt-8 space-y-6">
          {sections.length === 0 ? (
            <p className="text-center text-sm text-gray-500">Bạn chưa thêm mục nào cho CV.</p>
          ) : (
            sections.map((section) => (
              <div key={section.id}>
                <h3 className="text-lg font-semibold uppercase tracking-wide text-[#B71C1C]">{section.title}</h3>
                <div className="mt-3 text-sm leading-relaxed text-[#4B5563]">{renderSectionContent(section)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </div>
);
};

const renderSectionContent = (section: CandidateCvSection) => {
  try {
    const parsed = JSON.parse(section.description || "");
    if (!parsed?.type) throw new Error("Missing type");
    switch (parsed.type) {
      case "skills":
        return (
          <div className="space-y-4">
            {[
              { label: "Thành thạo", list: parsed.advanced ?? [] },
              { label: "Trung bình", list: parsed.intermediate ?? [] },
              { label: "Mới bắt đầu", list: parsed.beginner ?? [] },
            ].map((group) => (
              <div key={group.label}>
                <p className="font-semibold">{group.label}</p>
                {group.list.length ? (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {group.list.map((skill: string) => (
                      <span key={`${group.label}-${skill}`} className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs text-[#374151]">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">Chưa cập nhật.</p>
                )}
              </div>
            ))}
          </div>
        );
      case "certificates":
        return (
          <DetailList
            items={[
              { label: "Tên chứng chỉ", value: parsed.name },
              { label: "Tổ chức", value: parsed.organization },
              { label: "Thời gian", value: `${parsed.startDate || "..."} - ${parsed.endDate || "..."}` },
              { label: "Mô tả", value: parsed.description },
            ]}
          />
        );
      case "projects":
        return (
          <DetailList
            items={[
              { label: "Tên dự án", value: parsed.name },
              { label: "Link demo", value: parsed.link },
              { label: "Thời gian", value: `${parsed.startDate || "..."} - ${parsed.endDate || "..."}` },
              { label: "Mô tả", value: parsed.description },
            ]}
          />
        );
      case "experience":
        return (
          <DetailList
            items={[
              { label: "Vị trí", value: parsed.position },
              { label: "Đơn vị", value: parsed.company },
              { label: "Thời gian", value: `${parsed.startDate || "..."} - ${parsed.endDate || "..."}` },
              { label: "Mô tả", value: parsed.description },
            ]}
          />
        );
      case "education":
        return (
          <DetailList
            items={[
              { label: "Trường", value: parsed.school },
              { label: "Ngành học", value: parsed.major },
              { label: "Thời gian", value: `${parsed.startDate || "..."} - ${parsed.endDate || "..."}` },
              { label: "Thông tin thêm", value: parsed.details },
            ]}
          />
        );
      case "languages":
        return (
          <DetailList
            items={[
              { label: "Ngôn ngữ", value: parsed.language },
              { label: "Trình độ", value: parsed.level },
              { label: "Mô tả", value: parsed.description },
            ]}
          />
        );
      case "hobbies":
        return (
          <DetailList
            items={[
              { label: "Sở thích", value: parsed.hobby },
              { label: "Mô tả", value: parsed.description },
            ]}
          />
        );
      case "courses":
        return (
          <DetailList
            items={[
              { label: "Tên khóa học", value: parsed.name },
              { label: "Tổ chức đào tạo", value: parsed.organization },
              { label: "Thời gian", value: `${parsed.startDate || "..."} - ${parsed.endDate || "..."}` },
              { label: "Mô tả", value: parsed.description },
            ]}
          />
        );
      case "awards":
        return (
          <DetailList
            items={[
              { label: "Tên giải thưởng", value: parsed.name },
              { label: "Tổ chức trao giải", value: parsed.organization },
              { label: "Thời gian nhận giải", value: parsed.date },
              { label: "Mô tả", value: parsed.description },
            ]}
          />
        );
      case "organizations":
        return (
          <DetailList
            items={[
              { label: "Tên tổ chức", value: parsed.name },
              { label: "Vai trò", value: parsed.role },
              { label: "Thời gian", value: `${parsed.startDate || "..."} - ${parsed.endDate || "..."}` },
              { label: "Mô tả", value: parsed.description },
            ]}
          />
        );
      case "publications":
        return (
          <DetailList
            items={[
              { label: "Tiêu đề", value: parsed.title },
              { label: "Nhà xuất bản", value: parsed.publisher },
              { label: "Ngày xuất bản", value: parsed.date },
              { label: "Link", value: parsed.link },
              { label: "Mô tả", value: parsed.description },
            ]}
          />
        );
      case "references":
        return (
          <DetailList
            items={[
              { label: "Họ tên", value: parsed.name },
              { label: "Chức vụ", value: parsed.position },
              { label: "Công ty/Tổ chức", value: parsed.organization },
              { label: "Email", value: parsed.email },
              { label: "Số điện thoại", value: parsed.phone },
            ]}
          />
        );
      case "statement":
        return (
          <DetailList
            items={[
              { label: "Nội dung cam kết", value: parsed.content },
              { label: "Ngày ký", value: parsed.date },
              { label: "Chữ ký", value: parsed.signature },
            ]}
          />
        );
      case "activities":
        return (
          <DetailList
            items={[
              { label: "Tên hoạt động", value: parsed.name },
              { label: "Vai trò", value: parsed.role },
              { label: "Thời gian", value: `${parsed.startDate || "..."} - ${parsed.endDate || "..."}` },
              { label: "Mô tả", value: parsed.description },
            ]}
          />
        );
      case "custom":
        return (
          <div className="space-y-2">
            <p>
              <strong>Tiêu đề mục:</strong> {parsed.customTitle || "Đang cập nhật"}
            </p>
            <p className="whitespace-pre-line">
              <strong>Nội dung:</strong> {parsed.content || "..."}
            </p>
          </div>
        );
      case "about":
        return <p className="whitespace-pre-line">{parsed.summary || "..."}</p>;
      default:
        throw new Error("Unknown type");
    }
  } catch {
    return <p className="whitespace-pre-line">{section.description || "Đang cập nhật..."}</p>;
  }
};

const DetailList = ({ items }: { items: { label: string; value?: string }[] }) => (
  <ul className="grid gap-x-6 gap-y-3 md:grid-cols-2">
    {items.map((item) => (
      <li key={item.label}>
        <strong>{item.label}:</strong> {item.value || "Đang cập nhật"}
      </li>
    ))}
  </ul>
);

export default PreviewCV;
