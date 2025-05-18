import Signup from "@/components/pages/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Üye Ol | Dijital Çiftlik",
  description: "Dijital Çiftlik, çiftlik yönetimini kolaylaştıran ve optimize eden bir platformdur.",
};

export default function SignupPage() {
  return <Signup />;
}