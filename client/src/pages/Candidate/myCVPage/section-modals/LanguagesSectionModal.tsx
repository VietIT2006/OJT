import { useEffect, useState } from "react";
import type { CandidateCvSection } from "../../../../types/cv-section.type";

type Props = {
  section: CandidateCvSection;
  saving: boolean;
  onCancel: () => void;
  onSave: (payload: { title: string; description: string }) => void;
};

type LanguagesData = {
  type: "languages";
  language: string;
  level: string;
  description: string;
};

const defaultData: LanguagesData = {
  type: "languages",
  language: "",
  level: "Sơ cấp",
  description: "",
};

const LanguagesSectionModal = ({ section, saving, onCancel, onSave }: Props) => {
  const [data, setData] = useState<LanguagesData>(defaultData);

  useEffect(() => {
    try {
      const parsed = JSON.parse(section.description || "");
      if (parsed?.type === "languages") {
        setData({
          type: "languages",
          language: parsed.language ?? "",
          level: parsed.level ?? "Sơ cấp",
          description: parsed.description ?? "",
        });
      } else {
        setData(defaultData);
      }
    } catch {
      setData(defaultData);
    }
  }, [section]);

  const handleChange = (field: keyof LanguagesData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = () => {
    onSave({ title: section.title, description: JSON.stringify(data) });
  };

  return (
    <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-3xl font-bold">Thêm ngôn ngữ</h1>
      <div className="mb-8 space-y-6">
        <div>
          <label className="mb-2 block text-gray-700">Ngôn ngữ</label>
          <input
            type="text"
            value={data.language}
            onChange={handleChange("language")}
            placeholder="Tiếng Anh"
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Trình độ</label>
          <select
            value={data.level}
            onChange={handleChange("level")}
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          >
            {["Sơ cấp", "Trung cấp", "Thành thạo", "Bản ngữ"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Mô tả thêm</label>
          <textarea
            value={data.description}
            onChange={handleChange("description")}
            rows={4}
            placeholder="Hint text"
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

export default LanguagesSectionModal;
