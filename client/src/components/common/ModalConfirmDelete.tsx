import { Trash2, X } from "lucide-react";

type ModalConfirmDeleteProps = {
  open: boolean;
  title?: string;
  description?: string;
  itemName?: string;
  confirming?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const ModalConfirmDelete = ({
  open,
  title = "Xác nhận xóa",
  description = "Hành động này không thể hoàn tác.",
  itemName,
  confirming = false,
  onCancel,
  onConfirm,
}: ModalConfirmDeleteProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-[#1E1E1E]">
        <button
          onClick={onCancel}
          className="absolute right-6 top-6 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-zinc-700"
          aria-label="close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Trash2 className="h-5 w-5 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {description} {itemName ? <span className="font-semibold text-gray-900 dark:text-white">"{itemName}"</span> : null}
          </p>
        </div>
        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-200"
            disabled={confirming}
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(220,38,38,0.25)] hover:bg-red-700 disabled:opacity-60"
            disabled={confirming}
          >
            {confirming ? "Đang xóa..." : "Xóa"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
