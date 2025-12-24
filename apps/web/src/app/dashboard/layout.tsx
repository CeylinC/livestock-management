"use client";

import Sidebar from "@/components/Sidebar";
import useCurrentUser from "@/hooks/useCurrentUser";

export const dynamic = "force-dynamic";

export default function DasboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useCurrentUser()

  return (
    <div className="w-full h-screen bg-gradient-to-tr from-[#0A8270] to-[#7CFF6B] flex flex-row ">
      <Sidebar />
      <div className="bg-white m-5 p-4 rounded-xl w-[calc(100%_-_220px)]">
        {children}
      </div>
    </div>
  );
}
