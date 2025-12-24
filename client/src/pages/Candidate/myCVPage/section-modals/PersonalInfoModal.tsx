import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import ModalConfirmDelete from "../../../../components/common/ModalConfirmDelete";
import basicAvatar from "../../../../assets/images/basicAvatar.jpg";
import type { CandidateProfile, CustomProfileField } from "../../../../types/candidate.type";
import DatePickerInput from "../components/DatePickerInput";

type PersonalInfoModalProps = {
  open: boolean;
  profile: CandidateProfile;
  saving: boolean;
  onClose: () => void;
  onSave: (updated: CandidateProfile) => void;
};

type EditableField = "fullName" | "position" | "address" | "email" | "phone" | "dob" | "gender" | "status";

const PersonalInfoModal = ({ open, profile, saving, onClose, onSave }: PersonalInfoModalProps) => {
  const [formData, setFormData] = useState(profile);
  const [customFields, setCustomFields] = useState<CustomProfileField[]>(profile.customFields || []);
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [newFieldName, setNewFieldName] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setFormData(profile);
      setCustomFields(profile.customFields || []);
    }
  }, [open, profile]);

  if (!open) return null;

  const handleChange = (field: EditableField) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleAddField = () => {
    if (!newFieldName.trim()) return;
    setCustomFields((prev) => [...prev, { name: newFieldName.trim(), value: "" }]);
    setNewFieldName("");
    setShowFieldModal(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, avatar: typeof reader.result === "string" ? reader.result : prev.avatar }));
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAvatar = () => {
    setFormData((prev) => ({ ...prev, avatar: "" }));
    setShowDeleteConfirm(false);
  };

  const handleCustomFieldChange = (index: number, value: string) => {
    setCustomFields((prev) => prev.map((item, idx) => (idx === index ? { ...item, value } : item)));
  };

  const handleRemoveField = (index: number) => {
    setCustomFields((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ ...formData, customFields });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form onSubmit={handleSubmit} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-2xl font-bold">Cập nhật thông tin cá nhân</h1>
        <div className="mb-6 flex flex-col items-center gap-4">
          <img
            src={formData.avatar || basicAvatar}
            alt="Avatar"
            className="h-20 w-20 rounded-full border border-gray-200 object-cover"
          />
          <div className="flex gap-6 text-sm font-medium">
            <button
              type="button"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                <polyline points="21 15 16 10 5 21" strokeWidth="2" />
              </svg>
              Sửa
            </button>
            <button
              type="button"
              className="flex items-center gap-2 text-red-500 hover:text-red-600 cursor-pointer"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6" strokeWidth="2" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2" />
              </svg>
              Xóa
            </button>
          </div>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />

        <div className="space-y-5">
          <InputField label="Họ và tên" value={formData.fullName} onChange={handleChange("fullName")} />
          <InputField label="Chức danh" value={formData.position} onChange={handleChange("position")} />
          <InputField label="Địa chỉ" value={formData.address} onChange={handleChange("address")} />
          <InputField label="Email" type="email" value={formData.email} onChange={handleChange("email")} />
          <InputField label="SĐT" value={formData.phone} onChange={handleChange("phone")} />
          <DatePickerInput
            label="Ngày sinh (DOB)"
            value={formData.dob}
            onChange={(value) => setFormData((prev) => ({ ...prev, dob: value }))}
          />
         <InputField label="Giới tính" value={formData.gender} onChange={handleChange("gender")} />
          <InputField label="Trạng cá nhân" value={formData.status} onChange={handleChange("status")} />

          {customFields.map((field, index) => (
            <div key={`${field.name}-${index}`}>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">{field.name}</label>
                <button type="button" onClick={() => handleRemoveField(index)} className="text-red-500 hover:text-red-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <input
                type="text"
                value={field.value}
                onChange={(event) => handleCustomFieldChange(index, event.target.value)}
                className="w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder={`Nhập ${field.name.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            type="submit"
            className="rounded bg-red-600 px-8 py-2 font-medium text-white hover:bg-red-700 cursor-pointer"
            disabled={saving}
          >
            {saving ? "Đang cập nhật..." : "Cập Nhật"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-gray-300 px-8 py-2 font-medium text-gray-700 hover:bg-gray-400 cursor-pointer"
            disabled={saving}
          >
            Hủy Bỏ
          </button>
        </div>  

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowFieldModal(true)}
            className="flex items-center gap-2 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 cursor-pointer"
          >
            <Plus className="h-5 w-5" />
            Thêm chi tiết
          </button>
        </div>
      </form>

      {showFieldModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Thêm trường thông tin mới</h2>
              <button
                type="button"
                onClick={() => {
                  setShowFieldModal(false);
                  setNewFieldName("");
                }}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">Tên trường thông tin</label>
              <input
                type="text"
                value={newFieldName}
                onChange={(event) => setNewFieldName(event.target.value)}
                placeholder="Ví dụ: LinkedIn, Instagram..."
                className="w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowFieldModal(false);
                  setNewFieldName("");
                }}
                className="rounded bg-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-400 cursor-pointer"
              >
                Hủy
              </button>
              <button type="button" onClick={handleAddField} className="cursor-pointer rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
      <ModalConfirmDelete
        open={showDeleteConfirm}
        itemName="ảnh đại diện"
        description="Bạn muốn xóa ảnh và sử dụng hình mặc định?"
        confirming={false}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAvatar}
      />
    </div>
  );
};

export default PersonalInfoModal;

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
    />
  </div>
);
