import { Calendar } from "lucide-react";
import { useRef } from "react";

type DatePickerInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: "default" | "underline";
};

const toInputValue = (raw: string) => {
  if (!raw) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return "";
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DatePickerInput = ({
  label,
  value,
  onChange,
  placeholder,
  className = "",
  variant = "default",
}: DatePickerInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => {
    const input = inputRef.current as (HTMLInputElement & { showPicker?: () => void }) | null;
    if (!input) return;
    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.focus();
    }
  };

  const baseInputClass =
    (variant === "underline"
      ? "w-full border-b border-gray-300 bg-transparent py-2 pr-10 text-sm text-gray-700 focus:border-[#B71C1C] focus:outline-none"
      : "w-full rounded border border-gray-300 px-3 py-2 pr-10 text-sm text-gray-700 focus:border-[#B71C1C] focus:outline-none") +
    " custom-date-input";

  return (
    <div className={`space-y-2 ${className}`}>
      {label ? <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">{label}</label> : null}
      <div className="relative">
        <input
          ref={inputRef}
          type="date"
          value={toInputValue(value)}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={baseInputClass}
        />
        <button
          type="button"
          onClick={openPicker}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#B71C1C]"
        >
          <Calendar className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default DatePickerInput;
