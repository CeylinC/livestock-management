import { BadgeColors } from "../../../../packages/shared/constant/badgeColors"

export default function Badge({
  value,
  label
}: {
  value?: keyof typeof BadgeColors
  label: string
}) {
  return <div
    className="rounded-full text-center text-xs inline py-0.5 px-2"
    style={{
      backgroundColor: value ? BadgeColors[value].bg : "#fefefe",
      color: value ? BadgeColors[value].text : "black"
    }}
  >
    {label}
  </div>
}