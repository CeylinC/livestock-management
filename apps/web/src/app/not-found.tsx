import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Sayfa Bulunamadı | Dijital Çiftlik",
  description: "Aradığınız sayfa bulunamadı.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-4">Sayfa bulunamadı</p>
    </div>
  );
}
