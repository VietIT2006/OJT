import { useEffect, useState } from "react";

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
      <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-2xl pb-15">
        <div className="flex items-start gap-3 border-b-2 border-[#CCCCCC]">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Thư xin việc</h2>
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-4">
          Gợi ý: Bắt đầu bằng việc mô tả những gì bạn có thể mang đến cho công việc và tại sao công việc này lại khiến bạn hứng thú        </div>
        <div className="mt-6 space-y-4">
          <div>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="mt-2 h-60 w-full rounded border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#BC2228]"
              placeholder="Giới thiệu bản thân và lý do bạn phù hợp với vị trí..."
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-10 text-sm font-semibold">
          <button
            type="button"
            disabled={saving}
            onClick={() => onSave({ title, content })}
            className="cursor-pointer rounded bg-[#BC2228] px-5 py-2 text-white shadow-sm transition hover:bg-[#a31c20] disabled:cursor-not-allowed disabled:bg-[#d1696e]"
          >
            {saving ? "Đang lưu..." : "Lưu thư"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-gray-700 bg-[#EFF1F4] hover:bg-gray-100"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterModal;
