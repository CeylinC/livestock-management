import Barns from "@/components/pages/Barns"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ağıllar | Dijital Çiftlik",
  description: "Dijital Çiftlik, çiftlik yönetimini kolaylaştıran ve optimize eden bir platformdur.",
};

export default function BarnsPage() {
 return <Barns />
}
