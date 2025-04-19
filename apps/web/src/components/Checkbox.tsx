export default function Checkbox({
  label, checked, onChange, disabled = false
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}
) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer select-none">
      <span className={`text-sm ${disabled ? "text-gray-400" : "text-gray-800"}`}>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded-md text-blue-600 focus:ring-blue-500 disabled:opacity-50"
      />
    </label>
  );
} 