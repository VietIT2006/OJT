import { useEffect, useState } from "react";
import type { CandidateCvSection } from "../../../../types/cv-section.type";

type Props = {
  section: CandidateCvSection;
  saving: boolean;
  onCancel: () => void;
  onSave: (payload: { title: string; description: string }) => void;
};

type CourseData = {
  type: "courses";
  name: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
};

const defaultData: CourseData = {
  type: "courses",
  name: "",
  organization: "",
  startDate: "",
  endDate: "",
  description: "",
};

const CoursesSectionModal = ({ section, saving, onCancel, onSave }: Props) => {
  const [data, setData] = useState<CourseData>(defaultData);

  useEffect(() => {
    try {
      const parsed = JSON.parse(section.description || "");
      if (parsed?.type === "courses") {
        setData({
          type: "courses",
          name: parsed.name ?? "",
          organization: parsed.organization ?? "",
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

  const handleChange = (field: keyof CourseData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = () => {
    onSave({ title: section.title, description: JSON.stringify(data) });
  };

  return (
    <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-3xl font-bold">Thêm khóa học</h1>
      <div className="mb-8 space-y-6">
        <div>
          <label className="mb-2 block text-gray-700">Tên khóa học</label>
          <input
            type="text"
            value={data.name}
            onChange={handleChange("name")}
            placeholder="ABC Course"
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Tổ chức đào tạo</label>
          <input
            type="text"
            value={data.organization}
            onChange={handleChange("organization")}
            placeholder="Coursera, Udemy..."
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Thời gian học</label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="mb-1 text-xs text-red-600">Start Date</div>
              <input
                type="text"
                value={data.startDate}
                onChange={handleChange("startDate")}
                className="w-full border-b border-gray-300 px-0 py-2"
              />
            </div>
            <span className="text-gray-500">to</span>
            <div className="flex-1">
              <div className="mb-1 text-xs text-red-600">End Date</div>
              <input
                type="text"
                value={data.endDate}
                onChange={handleChange("endDate")}
                className="w-full border-b border-gray-300 px-0 py-2"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-gray-700">Mô tả khóa học</label>
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

export default CoursesSectionModal;
