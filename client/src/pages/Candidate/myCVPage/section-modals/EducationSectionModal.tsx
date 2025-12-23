import { useEffect, useState } from "react";
import type { CandidateCvSection } from "../../../../types/cv-section.type";

type Props = {
  section: CandidateCvSection;
  saving: boolean;
  onCancel: () => void;
  onSave: (payload: { title: string; description: string }) => void;
};

type EducationData = {
  type: "education";
  school: string;
  major: string;
  startDate: string;
  endDate: string;
  details: string;
};

const defaultData: EducationData = {
  type: "education",
  school: "",
  major: "",
  startDate: "",
  endDate: "",
  details: "",
};

const EducationSectionModal = ({ section, saving, onCancel, onSave }: Props) => {
  const [data, setData] = useState<EducationData>(defaultData);

  useEffect(() => {
    try {
      const parsed = JSON.parse(section.description || "");
      if (parsed?.type === "education") {
        setData({
          type: "education",
          school: parsed.school ?? "",
          major: parsed.major ?? "",
          startDate: parsed.startDate ?? "",
          endDate: parsed.endDate ?? "",
          details: parsed.details ?? "",
        });
      } else {
        setData(defaultData);
      }
    } catch {
      setData(defaultData);
    }
  }, [section]);

  const handleChange = (field: keyof EducationData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = () => {
    onSave({ title: section.title, description: JSON.stringify(data) });
  };

  return (
    <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-3xl font-bold">Học vấn</h1>

      <div className="mb-8 space-y-6">
        <div>
          <label className="mb-2 block text-gray-700">Trường</label>
          <input
            type="text"
            value={data.school}
            onChange={handleChange("school")}
            placeholder="ABC Corp"
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>

        <div>
          <label className="mb-2 block text-gray-700">Ngành học</label>
          <input
            type="text"
            value={data.major}
            onChange={handleChange("major")}
            placeholder="ABCCorp.com"
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>

        <div>
          <label className="mb-2 block text-gray-700">Thời gian học tập</label>
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
          <label className="mb-2 block text-gray-700">Thông tin thêm</label>
          <textarea
            value={data.details}
            onChange={handleChange("details")}
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

export default EducationSectionModal;
