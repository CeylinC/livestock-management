import Stocks from "@/components/pages/Stocks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stoklar | Dijital Çiftlik",
  description: "Dijital Çiftlik, çiftlik yönetimini kolaylaştıran ve optimize eden bir platformdur.",
};

export default function StocksPage() {
  return <Stocks />
}