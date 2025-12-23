import { useEffect, useState } from "react";
import type { CandidateCvSection } from "../../../../types/cv-section.type";

type Props = {
  section: CandidateCvSection;
  saving: boolean;
  onCancel: () => void;
  onSave: (payload: { title: string; description: string }) => void;
};

type AboutData = {
  type: "about";
  summary: string;
};

const defaultData: AboutData = {
  type: "about",
  summary: "",
};

const AboutSectionModal = ({ section, saving, onCancel, onSave }: Props) => {
  const [data, setData] = useState<AboutData>(defaultData);

  useEffect(() => {
    try {
      const parsed = JSON.parse(section.description || "");
      if (parsed?.type === "about") {
        setData({
          type: "about",
          summary: parsed.summary ?? "",
        });
      } else {
        setData(defaultData);
      }
    } catch {
      setData(defaultData);
    }
  }, [section]);

  const handleSubmit = () => {
    onSave({ title: section.title, description: JSON.stringify(data) });
  };

  return (
    <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-3xl font-bold">Giới thiệu về bản thân</h1>
      <div className="mb-8 space-y-6">
        <div>
          <label className="mb-2 block text-gray-700">Mô tả về bản thân, các kĩ năng của mình...</label>
          <textarea
            value={data.summary}
            onChange={(event) => setData((prev) => ({ ...prev, summary: event.target.value }))}
            rows={10}
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

export default AboutSectionModal;
