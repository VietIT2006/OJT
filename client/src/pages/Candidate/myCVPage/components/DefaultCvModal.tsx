import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

type DefaultCvModalProps = {
  open: boolean;
  initialValue: boolean;
  saving: boolean;
  onClose: () => void;
  onSave: (useDefault: boolean) => Promise<void> | void;
};

const DefaultCvModal = ({ open, initialValue, saving, onClose, onSave }: DefaultCvModalProps) => {
  const [useDefault, setUseDefault] = useState(initialValue);

  useEffect(() => {
    if (open) {
      setUseDefault(initialValue);
    }
  }, [open, initialValue]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex items-start gap-3">
          <FileText className="h-10 w-10 text-[#BC2228]" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Chọn CV Mặc Định</h2>
            <p className="text-sm text-gray-500">Sử dụng CV mặc định từ trang hồ sơ</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={useDefault}
              onChange={(event) => setUseDefault(event.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-[#BC2228] focus:ring-[#BC2228]"
            />
            <span className="text-[#BC2228] text-lg font-semibold">Sử dụng CV mặc định</span>
          </label>
          <p className="mt-2 text-sm text-gray-500">
            Khi bật, hệ thống sẽ tự động dùng CV từ trang Hồ sơ của bạn khi ứng tuyển.
          </p>
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
            onClick={() => onSave(useDefault)}
            className="cursor-pointer rounded bg-[#BC2228] px-5 py-2 text-white shadow-sm transition hover:bg-[#a31c20] disabled:cursor-not-allowed disabled:bg-[#d1696e]"
          >
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefaultCvModal;
