import Login from "@/components/views/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giriş Yap | Dijital Çiftlik",
  description:
    "Dijital Çiftlik, çiftlik yönetimini kolaylaştıran ve optimize eden bir platformdur.",
};

export default function LoginPage() {
  return <Login />;
}
