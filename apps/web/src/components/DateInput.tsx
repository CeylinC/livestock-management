import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export default function DateInput({
  value,
  onChange,
  label,
  format = "DD.MM.YYYY",
}: {
  value: Dayjs;
  onChange: (date: Dayjs) => void;
  label: string;
  format?: string;
}) {
  const [inputValue, setInputValue] = useState(dayjs(value).format(format));
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    const parsed = dayjs(val, format, true);
    if (parsed.isValid()) {
      setError(false);
      onChange(parsed);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col">
      {<label className="text-sm ml-1.5 cursor-pointer">{label}</label>}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={format.toLowerCase()}
        className="w-full border border-gray-300 outline-none rounded-md px-4 py-2 focus:border-[#7CFF6B]"
      />
      {error && (
        <span className="ml-1.5 text-xs text-red-500">Geçerli bir tarih girin ({format})</span>
      )}
    </div>
  );
};
