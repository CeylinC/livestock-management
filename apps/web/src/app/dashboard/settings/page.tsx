import Settings from "@/components/pages/Settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ayarlar | Dijital Çiftlik",
  description: "Dijital Çiftlik, çiftlik yönetimini kolaylaştıran ve optimize eden bir platformdur.",
};

export default function SettingsPage() {
  return <Settings />
}