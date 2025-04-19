export default function Input({
name,
label,
onChange,
} : {
name: string,
label: string,
onChange: (value: string) => void
}) {
  return <div>
    <label htmlFor={name} className="text-sm ml-1.5 cursor-pointer">{label}</label>
    <input
    id={name}
    className=" w-full border border-gray-300 outline-none rounded-md px-4 py-2 focus:border-[#7CFF6B]"
    type="text" />
  </div>
}