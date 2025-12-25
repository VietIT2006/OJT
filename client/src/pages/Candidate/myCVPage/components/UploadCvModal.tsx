import { useRef } from "react";
import { FileText, Upload, Trash2, Star } from "lucide-react";
import type { CandidateCvFile } from "../../../../types/candidate.type";

type UploadCvModalProps = {
  open: boolean;
  files: CandidateCvFile[];
  uploading: boolean;
  deletingId: string | null;
  primaryUpdatingId: string | null;
  onUpload: (file: File) => void;
  onDelete: (fileId: string) => void;
  onSetPrimary: (fileId: string) => void;
  onClose: () => void;
};

const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

const UploadCvModal = ({
  open,
  files,
  uploading,
  deletingId,
  primaryUpdatingId,
  onUpload,
  onDelete,
  onSetPrimary,
  onClose,
}: UploadCvModalProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex items-start gap-3">
          <FileText className="h-10 w-10 text-[#BC2228]" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tải Lên CV</h2>
            <p className="text-sm text-gray-500">
              Tải CV của bạn bên dưới để có thể sử dụng xuyên suốt quá trình tìm việc
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <FileText className="h-14 w-14 text-gray-400" />
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900">CV của bạn</p>
              <p className="text-sm text-gray-500">
                (Hỗ trợ tệp .doc, .docx hoặc .pdf, không chứa mật khẩu bảo vệ và dưới 3MB)
              </p>
              <div className="mt-4 flex gap-3 text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer inline-flex items-center gap-2 text-[#BC2228] hover:text-[#a31c20]"
                >
                  <Upload className="h-4 w-4" />
                  {uploading ? "Đang tải..." : "Tải lên CV mới"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  Đóng
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    onUpload(file);
                    event.target.value = "";
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {files.length === 0 ? (
            <p className="text-sm text-gray-500">Bạn chưa tải CV nào lên.</p>
          ) : (
            files.map((file) => (
              <div
                key={file.id}
                className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-900">{file.fileName}</p>
                  <p className="text-sm text-gray-500">
                    {formatBytes(file.fileSize)} · {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                  {file.isPrimary && (
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#BC2228]">
                      <Star className="h-3 w-3" /> Đang sử dụng
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 text-sm font-semibold">
                  {!file.isPrimary && (
                    <button
                      type="button"
                      onClick={() => onSetPrimary(file.id)}
                      className="cursor-pointer rounded border border-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-50"
                      disabled={primaryUpdatingId === file.id}
                    >
                      {primaryUpdatingId === file.id ? "Đang chọn..." : "Đặt làm mặc định"}
                    </button>
                  )}
                  <a
                    href={file.fileUrl}
                    download={file.fileName}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer rounded border border-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-50"
                  >
                    Tải xuống
                  </a>
                  <button
                    type="button"
                    onClick={() => onDelete(file.id)}
                    disabled={deletingId === file.id}
                    className="cursor-pointer inline-flex items-center gap-1 rounded border border-red-200 px-3 py-1 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                    {deletingId === file.id ? "Đang xoá..." : "Xoá"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadCvModal;

