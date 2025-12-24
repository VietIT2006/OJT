import { useEffect, useState } from "react";
import { Edit2 } from "lucide-react";

type CoverLetterModalProps = {
  open: boolean;
  initialTitle: string;
  initialContent: string;
  saving: boolean;
  onClose: () => void;
  onSave: (payload: { title: string; content: string }) => Promise<void> | void;
};

const CoverLetterModal = ({
  open,
  initialTitle,
  initialContent,
  saving,
  onClose,
  onSave,
}: CoverLetterModalProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    if (open) {
      setTitle(initialTitle);
      setContent(initialContent);
    }
  }, [open, initialTitle, initialContent]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex items-start gap-3">
          <Edit2 className="h-10 w-10 text-[#BC2228]" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Thư xin việc</h2>
            <p className="text-sm text-gray-500">
              Giới thiệu bản thân và lý do vì sao bạn sẽ là lựa chọn phù hợp
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Tiêu đề</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#BC2228]"
              placeholder="Ví dụ: Thư xin việc Backend Developer"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Nội dung thư</label>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="mt-2 h-60 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#BC2228]"
              placeholder="Giới thiệu bản thân và lý do bạn phù hợp với vị trí..."
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 text-sm font-semibold">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => onSave({ title, content })}
            className="cursor-pointer rounded bg-[#BC2228] px-5 py-2 text-white shadow-sm transition hover:bg-[#a31c20] disabled:cursor-not-allowed disabled:bg-[#d1696e]"
          >
            {saving ? "Đang lưu..." : "Lưu thư"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterModal;
