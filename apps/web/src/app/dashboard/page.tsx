import DashboardHomepage from "@/components/views/DashboardHomapage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anasayfa | Dijital Çiftlik",
  description:
    "Dijital Çiftlik, çiftlik yönetimini kolaylaştıran ve optimize eden bir platformdur.",
};

export default function DashboardPage() {
  return <DashboardHomepage />;
}
