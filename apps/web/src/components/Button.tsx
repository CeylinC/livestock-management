export default function Button({
  label,
  onClick,
  variant = 'default',
}: {
  label: string,
  onClick: () => void,
  variant?: 'default' | 'danger',
}) {
  const buttonStyles = variant === 'danger'
    ? 'bg-gradient-to-tr from-[#d71d38] to-[#D70654]'
    : 'bg-gradient-to-tr from-[#0A8270] to-[#7CFF6B]';

  return (
    <button
      onClick={onClick}
      className={`w-full h-10 ${buttonStyles} flex justify-center items-center rounded-md text-white font-semibold hover:brightness-90 transition`}
    >
      {label}
    </button>
  );
}
