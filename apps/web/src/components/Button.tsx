export default function Button({
  label,
  onClick
}: {
  label: string,
  onClick: () => void
}) {
  return <button
  onClick={onClick}
  className="w-full h-10 bg-gradient-to-tr from-[#0A8270] to-[#7CFF6B] flex justify-center items-center rounded-md text-white font-semibold hover:brightness-90 transition"
  >
    {label}
  </button>
}