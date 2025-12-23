import { useEffect, useState } from "react";
import type { CandidateCvSection } from "../../../../types/cv-section.type";

type Props = {
  section: CandidateCvSection;
  saving: boolean;
  onCancel: () => void;
  onSave: (payload: { title: string; description: string }) => void;
};

type StatementData = {
  type: "statement";
  content: string;
  date: string;
  signature: string;
};

const defaultData: StatementData = {
  type: "statement",
  content: "",
  date: "",
  signature: "",
};

const StatementSectionModal = ({ section, saving, onCancel, onSave }: Props) => {
  const [data, setData] = useState<StatementData>(defaultData);

  useEffect(() => {
    try {
      const parsed = JSON.parse(section.description || "");
      if (parsed?.type === "statement") {
        setData({
          type: "statement",
          content: parsed.content ?? "",
          date: parsed.date ?? "",
          signature: parsed.signature ?? "",
        });
      } else {
        setData(defaultData);
      }
    } catch {
      setData(defaultData);
    }
  }, [section]);

  const handleChange =
    (field: keyof StatementData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = () => {
    onSave({ title: section.title, description: JSON.stringify(data) });
  };

  return (
    <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-3xl font-bold">Thêm tuyên bố</h1>
      <div className="mb-8 space-y-6">
        <div>
          <label className="mb-2 block text-gray-700">Nội dung cam kết</label>
          <textarea
            value={data.content}
            onChange={handleChange("content")}
            rows={6}
            placeholder="Tôi cam kết rằng..."
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Ngày ký</label>
          <input
            type="text"
            value={data.date}
            onChange={handleChange("date")}
            className="w-full border-b border-gray-300 px-0 py-2"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Chữ ký (tùy chọn)</label>
          <input
            type="text"
            value={data.signature}
            onChange={handleChange("signature")}
            placeholder="Họ tên người ký"
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

export default StatementSectionModal;
