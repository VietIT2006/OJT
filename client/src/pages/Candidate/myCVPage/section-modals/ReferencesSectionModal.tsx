import { useEffect, useState } from "react";
import type { CandidateCvSection } from "../../../../types/cv-section.type";

type Props = {
  section: CandidateCvSection;
  saving: boolean;
  onCancel: () => void;
  onSave: (payload: { title: string; description: string }) => void;
};

type ReferencesData = {
  type: "references";
  name: string;
  position: string;
  organization: string;
  email: string;
  phone: string;
};

const defaultData: ReferencesData = {
  type: "references",
  name: "",
  position: "",
  organization: "",
  email: "",
  phone: "",
};

const ReferencesSectionModal = ({ section, saving, onCancel, onSave }: Props) => {
  const [data, setData] = useState<ReferencesData>(defaultData);

  useEffect(() => {
    try {
      const parsed = JSON.parse(section.description || "");
      if (parsed?.type === "references") {
        setData({
          type: "references",
          name: parsed.name ?? "",
          position: parsed.position ?? "",
          organization: parsed.organization ?? "",
          email: parsed.email ?? "",
          phone: parsed.phone ?? "",
        });
      } else {
        setData(defaultData);
      }
    } catch {
      setData(defaultData);
    }
  }, [section]);

  const handleChange =
    (field: keyof ReferencesData) => (event: React.ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = () => {
    onSave({ title: section.title, description: JSON.stringify(data) });
  };

  return (
    <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-3xl font-bold">Thêm người giới thiệu</h1>
      <div className="mb-8 space-y-6">
        <div>
          <label className="mb-2 block text-gray-700">Họ tên</label>
          <input
            type="text"
            value={data.name}
            onChange={handleChange("name")}
            placeholder="Nguyễn Văn A"
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Chức vụ</label>
          <input
            type="text"
            value={data.position}
            onChange={handleChange("position")}
            placeholder="Giám đốc, Trưởng phòng..."
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Công ty/Tổ chức</label>
          <input
            type="text"
            value={data.organization}
            onChange={handleChange("organization")}
            placeholder="ABC Corp"
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={handleChange("email")}
            placeholder="example@email.com"
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Số điện thoại</label>
          <input
            type="tel"
            value={data.phone}
            onChange={handleChange("phone")}
            placeholder="0123456789"
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button
          type="button"
          className="rounded bg-red-600 px-8 py-2 font-medium text-white"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? "Đang cập nhật..." : "Cập Nhật"}
        </button>
        <button
          type="button"
          className="rounded bg-gray-200 px-8 py-2 font-medium text-gray-700"
          onClick={onCancel}
          disabled={saving}
        >
          Hủy Bỏ
        </button>
      </div>
    </div>
  );
};

export default ReferencesSectionModal;
