import { useEffect, useState } from "react";
import type { CandidateCvSection } from "../../../../types/cv-section.type";

type Props = {
  section: CandidateCvSection;
  saving: boolean;
  onCancel: () => void;
  onSave: (payload: { title: string; description: string }) => void;
};

type HobbiesData = {
  type: "hobbies";
  hobby: string;
  description: string;
};

const defaultData: HobbiesData = {
  type: "hobbies",
  hobby: "",
  description: "",
};

const HobbiesSectionModal = ({ section, saving, onCancel, onSave }: Props) => {
  const [data, setData] = useState<HobbiesData>(defaultData);

  useEffect(() => {
    try {
      const parsed = JSON.parse(section.description || "");
      if (parsed?.type === "hobbies") {
        setData({
          type: "hobbies",
          hobby: parsed.hobby ?? "",
          description: parsed.description ?? "",
        });
      } else {
        setData(defaultData);
      }
    } catch {
      setData(defaultData);
    }
  }, [section]);

  const handleChange =
    (field: keyof HobbiesData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = () => {
    onSave({ title: section.title, description: JSON.stringify(data) });
  };

  return (
    <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-3xl font-bold">Thêm sở thích</h1>
      <div className="mb-8 space-y-6">
        <div>
          <label className="mb-2 block text-gray-700">Sở thích</label>
          <input
            type="text"
            value={data.hobby}
            onChange={handleChange("hobby")}
            placeholder="Đọc sách, chơi thể thao..."
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Mô tả chi tiết</label>
          <textarea
            value={data.description}
            onChange={handleChange("description")}
            rows={6}
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

export default HobbiesSectionModal;
