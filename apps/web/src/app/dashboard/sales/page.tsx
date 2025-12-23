import Sales from "@/components/views/Sales";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Satışlar | Dijital Çiftlik",
  description:
    "Dijital Çiftlik, çiftlik yönetimini kolaylaştıran ve optimize eden bir platformdur.",
};

export default function SalesPage() {
  return <Sales />;
}
