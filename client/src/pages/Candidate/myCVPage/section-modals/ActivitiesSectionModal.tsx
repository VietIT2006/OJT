import { useEffect, useState } from "react";
import DatePickerInput from "../components/DatePickerInput";
import type { CandidateCvSection } from "../../../../types/cv-section.type";

type Props = {
  section: CandidateCvSection;
  saving: boolean;
  onCancel: () => void;
  onSave: (payload: { title: string; description: string }) => void;
};

type ActivitiesData = {
  type: "activities";
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

const defaultData: ActivitiesData = {
  type: "activities",
  name: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
};

const ActivitiesSectionModal = ({ section, saving, onCancel, onSave }: Props) => {
  const [data, setData] = useState<ActivitiesData>(defaultData);

  useEffect(() => {
    try {
      const parsed = JSON.parse(section.description || "");
      if (parsed?.type === "activities") {
        setData({
          type: "activities",
          name: parsed.name ?? "",
          role: parsed.role ?? "",
          startDate: parsed.startDate ?? "",
          endDate: parsed.endDate ?? "",
          description: parsed.description ?? "",
        });
      } else {
        setData(defaultData);
      }
    } catch {
      setData(defaultData);
    }
  }, [section]);

  const handleChange =
    (field: keyof ActivitiesData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = () => {
    onSave({ title: section.title, description: JSON.stringify(data) });
  };

  return (
    <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-3xl font-bold">Thêm hoạt động ngoại khóa</h1>
      <div className="mb-8 space-y-6">
        <div>
          <label className="mb-2 block text-gray-700">Tên hoạt động</label>
          <input
            type="text"
            value={data.name}
            onChange={handleChange("name")}
            placeholder="Thể thao, nghệ thuật, sự kiện..."
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Vai trò</label>
          <input
            type="text"
            value={data.role}
            onChange={handleChange("role")}
            placeholder="Thành viên, Tổ chức..."
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Thời gian tham gia</label>
          <div className="flex items-center gap-4">
            <DatePickerInput
              label="Start Date"
              value={data.startDate}
              onChange={(value) => setData((prev) => ({ ...prev, startDate: value }))}
              className="flex-1"
              variant="underline"
            />
            <span className="text-gray-500">to</span>
            <DatePickerInput
              label="End Date"
              value={data.endDate}
              onChange={(value) => setData((prev) => ({ ...prev, endDate: value }))}
              className="flex-1"
              variant="underline"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Mô tả hoạt động</label>
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

export default ActivitiesSectionModal;
