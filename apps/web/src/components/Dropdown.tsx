import { useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
};

export default function Dropdown({
  options,
  value,
  onChange,
  label,
  placeholder = "Seçiniz",
  direction = "down"
}: {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  direction?: "up" | "down";
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {<label className="text-sm ml-1.5 cursor-pointer">{label}</label>}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-left outline-none focus:border-[#7CFF6B]"
      >
        {selected ? selected.label : <span className="text-gray-400">{placeholder}</span>}
      </button>

      {open && (
        <div
          className={`absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto ${direction === "up" ? "bottom-full mb-1" : "mt-1"
            }`}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-100 ${opt.value === value ? "bg-blue-50 font-medium" : ""
                }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}