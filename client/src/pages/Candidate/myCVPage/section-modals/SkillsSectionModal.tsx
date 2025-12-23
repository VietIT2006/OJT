import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import type { CandidateCvSection } from "../../../../types/cv-section.type";

type Props = {
  section: CandidateCvSection;
  saving: boolean;
  onCancel: () => void;
  onSave: (payload: { title: string; description: string }) => void;
};

type SkillLevel = "advanced" | "intermediate" | "beginner";

type SkillsData = {
  type: "skills";
  advanced: string[];
  intermediate: string[];
  beginner: string[];
};

const defaultData: SkillsData = {
  type: "skills",
  advanced: [],
  intermediate: [],
  beginner: [],
};

const SkillsSectionModal = ({ section, saving, onCancel, onSave }: Props) => {
  const [formData, setFormData] = useState<SkillsData>(defaultData);
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("advanced");

  useEffect(() => {
    try {
      const parsed = JSON.parse(section.description || "");
      if (parsed?.type === "skills") {
        setFormData({
          type: "skills",
          advanced: parsed.advanced ?? [],
          intermediate: parsed.intermediate ?? [],
          beginner: parsed.beginner ?? [],
        });
      } else {
        setFormData(defaultData);
      }
    } catch {
      setFormData(defaultData);
    }
    setSkillName("");
    setSkillLevel("advanced");
  }, [section]);

  const handleAddSkill = () => {
    const trimmed = skillName.trim();
    if (!trimmed) return;
    setFormData((prev) => ({
      ...prev,
      [skillLevel]: prev[skillLevel].includes(trimmed) ? prev[skillLevel] : [...prev[skillLevel], trimmed],
    }));
    setSkillName("");
  };

  const handleSubmit = () => {
    onSave({ title: section.title, description: JSON.stringify(formData) });
  };

  const renderSkillList = (label: string, level: SkillLevel) => (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <Settings size={20} className="text-gray-400" />
        <h3 className="font-semibold">{label}</h3>
      </div>
      {formData[level].length === 0 ? (
        <p className="text-gray-500">Chưa thêm kỹ năng nào</p>
      ) : (
        <ul className="flex flex-wrap gap-2 text-sm text-gray-700">
          {formData[level].map((item) => (
            <li
              key={`${level}-${item}`}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-3xl font-bold">Kĩ năng</h1>

      <div className="mb-6 grid grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block text-gray-700">Kĩ năng</label>
          <input
            value={skillName}
            onChange={(event) => setSkillName(event.target.value)}
            placeholder="ReactJS"
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
          />
        </div>
        <div className="flex items-end">
          <div className="flex-1">
            <label className="mb-2 block text-gray-700">Mức độ</label>
            <select
              value={skillLevel}
              onChange={(event) => setSkillLevel(event.target.value as SkillLevel)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700"
            >
              <option value="advanced">Thành thạo</option>
              <option value="intermediate">Trung bình</option>
              <option value="beginner">Mới bắt đầu</option>
            </select>
          </div>
          <button
            type="button"
            className="ml-4 rounded border-2 border-red-600 px-6 py-2 font-medium text-red-600"
            onClick={handleAddSkill}
          >
            Thêm Mới
          </button>
        </div>
      </div>

      <div className="mb-8 space-y-6">
        {renderSkillList("Thành thạo", "advanced")}
        {renderSkillList("Trung bình", "intermediate")}
        {renderSkillList("Mới bắt đầu", "beginner")}
      </div>

      <hr className="my-8" />

      <div className="flex justify-center gap-4">
        <button
          type="button"
          className="rounded bg-red-600 px-8 py-2 font-medium text-white"
          disabled={saving}
          onClick={handleSubmit}
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

export default SkillsSectionModal;
