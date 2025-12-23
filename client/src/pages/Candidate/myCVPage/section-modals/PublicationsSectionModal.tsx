import { useEffect, useState } from "react";
import type { CandidateCvSection } from "../../../../types/cv-section.type";

type Props = {
  section: CandidateCvSection;
  saving: boolean;
  onCancel: () => void;
  onSave: (payload: { title: string; description: string }) => void;
};

type PublicationsData = {
  type: "publications";
  title: string;
  publisher: string;
  date: string;
  link: string;
  description: string;
};

const defaultData: PublicationsData = {
  type: "publications",
  title: "",
  publisher: "",
  date: "",
  link: "",
  description: "",
};

const PublicationsSectionModal = ({ section, saving, onCancel, onSave }: Props) => {
  const [data, setData] = useState<PublicationsData>(defaultData);

  useEffect(() => {
    try {
      const parsed = JSON.parse(section.description || "");
      if (parsed?.type === "publications") {
        setData({
          type: "publications",
          title: parsed.title ?? "",
          publisher: parsed.publisher ?? "",
          date: parsed.date ?? "",
          link: parsed.link ?? "",
          description: parsed.description ?? "",
        });
      } else {
        setData(defaultData);
      }
    } catch {
      setData(defaultData);
    }
  }, [section]);

  const handleChange = (field: keyof PublicationsData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = () => {
    onSave({ title: section.title, description: JSON.stringify(data) });
  };

  return (
    <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-3xl font-bold">Thêm ấn phẩm</h1>
      <div className="mb-8 space-y-6">
        <div>
          <label className="mb-2 block text-gray-700">Tiêu đề ấn phẩm</label>
          <input
            type="text"
            value={data.title}
            onChange={handleChange("title")}
            placeholder="Tên bài báo, sách..."
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Nhà xuất bản</label>
          <input
            type="text"
            value={data.publisher}
            onChange={handleChange("publisher")}
            placeholder="ABC Publisher"
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Ngày xuất bản</label>
          <input
            type="text"
            value={data.date}
            onChange={handleChange("date")}
            className="w-full border-b border-gray-300 px-0 py-2"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Link ấn phẩm</label>
          <input
            type="text"
            value={data.link}
            onChange={handleChange("link")}
            placeholder="https://..."
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Mô tả nội dung</label>
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

export default PublicationsSectionModal;
