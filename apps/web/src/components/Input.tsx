import { useState } from 'react';

export default function Input({
  name,
  label,
  value,
  onChange,
  type = 'text',
}: {
  name: string,
  label: string,
  value?: string,
  onChange: (value: string) => void,
  type?: 'text' | 'password'
}) {
  const [inputType, setInputType] = useState(type);

  const toggleShowHide = () => {
    setInputType(prevType => prevType === 'password' ? 'text' : 'password');
  };

  return (
    <div>
      <label htmlFor={name} className="text-sm ml-1.5 cursor-pointer">{label}</label>
      <div className="relative">
        <input
          id={name}
          defaultValue={value}
          onChange={(event) => onChange(event.currentTarget.value)}
          className="w-full border border-gray-300 outline-none rounded-md px-4 py-2 focus:border-[#7CFF6B]"
          type={inputType}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={toggleShowHide}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
          >
            {inputType === 'password' ? 'Show' : 'Hide'}
          </button>
        )}
      </div>
    </div>
  );
}
