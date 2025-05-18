"use client";

import { useEffect, useState } from "react";
import heroImage from "../../../public/hero.jpg";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 transition-colors duration-300 ${isScrolled ? "bg-gradient-to-tr from-[#0A8270] to-[#7CFF6B] text-white shadow-md" : "bg-transparent text-white"
          }`}
      >
        <div className="text-xl font-bold">Dijital Çiftlik</div>
        <nav className="flex gap-4">
          <button className="hover:underline" onClick={() => router.push("/signup")}>Üye Ol</button>
          <button className="hover:underline" onClick={() => router.push("/login")}>Giriş Yap</button>
        </nav>
      </header>

      {/* Hero */}
      <section
        className="h-screen flex flex-col gap-4 items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: `linear-gradient(to top right, #0A8270cc, #7CFF6B99), url(${heroImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl md:text-6xl font-bold max-w-3xl">
          Çiftliğinizi Dijital Dünyaya Taşıyın
        </h1>
        <h2 className="text-3xl md:text-2xl font-bold max-w-3xl">
          Dijital çözümlerle işinizi geleceğe taşıyın.
        </h2>
      </section>

      {/* Hizmetlerimiz */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Dijital İkiz Teknolojisi</h3>
              <p>
                Fiziksel çiftlik süreçlerini sanal ortama taşır ve bu sayede çiftlik operasyonlarını gerçek zamanlı olarak izler ve optimize eder.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Veri Tabanlı Yönetim Sistemi</h3>
              <p>
                Hayvan sağlığı, yem tüketimi, üretim ve finansal operasyonlar gibi verileri gerçek zamanlı olarak takip etmenizi sağlar.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Mobil ve Web Uygulama Geliştirme</h3>
              <p>
                Web ve mobil platformlarda kullanıcı dostu uygulamalar geliştirerek çiftlik sahiplerinin yönetim süreçlerini kolaylaştırıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Neden Dijital Hayvancılık */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Neden Dijital Hayvancılık?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Verimlilik Artışı</h3>
              <p>
                Dijital ikiz teknolojisi ile çiftlik operasyonlarını gerçek zamanlı izleyebilir, optimize edebilir ve verimliliği artırabilirsiniz.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Dijital Dönüşümle Rekabet Avantajı</h3>
              <p>
                Küçük ve orta ölçekli çiftlikler, dijital çözümlerle büyük işletmelerle rekabet edebilir hale gelir.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Kolay Erişim ve Düşük Maliyetli Çözümler</h3>
              <p>
                Geliştirdiğimiz yazılım çözümleri, küçük ve orta ölçekli çiftlikler için uygun maliyetli ve kullanımı kolaydır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* İletişim */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">İletişime Geçin</h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            LinkedIn üzerinden benimle iletişime geçebilirsiniz:
            <a
              href="https://www.linkedin.com/in/ceylin-caltepe/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 font-semibold hover:underline"
            >
              Ceylin Caltepe
            </a>
          </p>
          <p className="text-lg text-gray-700">
            Ayrıca e-posta ile bana ulaşabilirsiniz:
            <a
              href="mailto:caltepeceylin@gmail.com"
              className="text-green-700 font-semibold hover:underline"
            >
              caltepeceylin@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gradient-to-tr from-[#0A8270] to-[#7CFF6B] text-white text-center">
        © 2025 Dijital Çiftlik. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
