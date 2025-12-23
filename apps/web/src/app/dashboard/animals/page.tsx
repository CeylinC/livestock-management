import Animals from "@/components/views/Animals";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hayvanlar | Dijital Çiftlik",
  description:
    "Dijital Çiftlik, çiftlik yönetimini kolaylaştıran ve optimize eden bir platformdur.",
};

export default function AnimalsPage() {
  return <Animals />;
}
