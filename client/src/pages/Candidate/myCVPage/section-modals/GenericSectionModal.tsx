import { useEffect, useState } from "react";
import type { CandidateCvSection } from "../../../../types/cv-section.type";

type Props = {
  section: CandidateCvSection;
  saving: boolean;
  onCancel: () => void;
  onSave: (payload: { title: string; description: string }) => void;
};

const GenericSectionModal = ({ section, saving, onCancel, onSave }: Props) => {
  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description || "");

  useEffect(() => {
    setTitle(section.title);
    setDescription(section.description || "");
  }, [section]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ title: title.trim(), description: description.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#1E1E1E]">
      <div className="mb-6 text-center">
        <h3 className="text-2xl	font-semibold text-[#1b1b1b] dark:text-white">{section.title}</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Cập nhật nội dung để cải thiện CV của bạn.</p>
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Tiêu đề
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#BC2228]"
            placeholder="Nhập tiêu đề"
          />
        </label>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Nội dung chi tiết
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={6}
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#BC2228]"
            placeholder="Ghi miêu tả, thành tựu hoặc thông tin nổi bật..."
          />
        </label>
      </div>
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200"
          disabled={saving}
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          className="rounded bg-[#BC2228] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(188,34,40,0.25)] hover:bg-[#a51d22]"
          disabled={saving}
        >
          {saving ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </div>
    </form>
  );
};

export default GenericSectionModal;
