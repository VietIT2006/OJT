import { useEffect, useState } from "react";
import type { CandidateCvSection } from "../../../../types/cv-section.type";

type Props = {
  section: CandidateCvSection;
  saving: boolean;
  onCancel: () => void;
  onSave: (payload: { title: string; description: string }) => void;
};

type CustomData = {
  type: "custom";
  customTitle: string;
  content: string;
};

const defaultData: CustomData = {
  type: "custom",
  customTitle: "",
  content: "",
};

const CustomSectionModal = ({ section, saving, onCancel, onSave }: Props) => {
  const [data, setData] = useState<CustomData>(defaultData);

  useEffect(() => {
    try {
      const parsed = JSON.parse(section.description || "");
      if (parsed?.type === "custom") {
        setData({
          type: "custom",
          customTitle: parsed.customTitle ?? "",
          content: parsed.content ?? "",
        });
      } else {
        setData(defaultData);
      }
    } catch {
      setData(defaultData);
    }
  }, [section]);

  const handleSubmit = () => {
    onSave({ title: section.title, description: JSON.stringify(data) });
  };

  return (
    <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-3xl font-bold">Thêm mục tùy chỉnh</h1>
      <div className="mb-8 space-y-6">
        <div>
          <label className="mb-2 block text-gray-700">Tiêu đề mục</label>
          <input
            type="text"
            value={data.customTitle}
            onChange={(event) => setData((prev) => ({ ...prev, customTitle: event.target.value }))}
            placeholder="Tên mục tùy chỉnh..."
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Nội dung</label>
          <textarea
            value={data.content}
            onChange={(event) => setData((prev) => ({ ...prev, content: event.target.value }))}
            rows={8}
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

export default CustomSectionModal;
