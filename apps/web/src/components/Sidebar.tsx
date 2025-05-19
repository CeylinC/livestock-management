'use client';

import { usePathname, useRouter } from "next/navigation"

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickMenuItem = (redirect: string) => {
    router.push(redirect)
  }

  return <div className="w-[200px] p-5 flex flex-col">
    <div className="flex flex-col text-white">
      <span className="text-sm">Hoşgeldin</span>
      <span className="text-2xl w-[200px] truncate">Ceylin</span>
    </div>
    <div className="mt-5 flex flex-col w-[200px]">
      {menuItems.map((menuItem, index) => (
        <div
          key={index}
          className={`text-white opacity-80 hover:opacity-100 transition-opacity px-2 py-2 cursor-pointer rounded-l-xl ${pathname === menuItem.redirect && "bg-white !text-[#0A8270] opacity-100"}`}
          onClick={() => handleClickMenuItem(menuItem.redirect)}>
          {menuItem.label}
        </div>
      ))}
    </div>
  </div>
}

const menuItems = [
  {
    label: "Anasayfa",
    redirect: "/dashboard"
  },
  {
    label: "Hayvanlar",
    redirect: "/dashboard/animals"
  },
  {
    label: "Ağıllar",
    redirect: "/dashboard/barns"
  },
  {
    label: "Stoklar",
    redirect: "/dashboard/stocks"
  },
  {
    label: "Satışlar",
    redirect: "/dashboard/sales"
  },
  {
    label: "Ayarlar",
    redirect: "/dashboard/settings"
  },
]