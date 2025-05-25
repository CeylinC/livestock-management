# 🐄 Livestock Management – Test Kullanıcı Rehberi

Bu rehber, **Livestock Management** uygulamasının test sürecinde kullanılmak üzere hazırlanmıştır.  
Test kullanıcılarının uygulamayı sorunsuz şekilde kurup çalıştırabilmesi ve temel işlevleri test edebilmesi için gerekli adımlar açıklanmıştır.

---

## 🎯 Amaç

Test kullanıcılarının hem **web** hem de **mobil** sürümleri kolayca çalıştırmasını ve temel işlevleri denemesini sağlamak.

---

## 🖥️ 1. Sistem Gereksinimleri

Aşağıdaki araçların cihazınızda kurulu olması gerekmektedir:

- Node.js (v18 veya üzeri)
- Git
- Terminal (Terminal / CMD / PowerShell)
- Web tarayıcısı (Chrome, Firefox, Safari vb.)
- (Opsiyonel) Visual Studio Code
- Mobil emülatör (Android Studio, Xcode vb.)

---

## 📦 2. Projenin Kurulumu

### a. Reponun Klonlanması

```bash
git clone https://github.com/CeylinC/livestock-management.git
cd livestock-management
b. Bağımlılıkların Kurulması
bash
Kopyala
Düzenle
yarn install
c. Ortam Değişkenlerinin Tanımlanması
Web (Next.js)
Proje dizininde .env.local dosyası oluşturun ve aşağıdakileri yapıştırın:

env
Kopyala
Düzenle
NEXT_PUBLIC_SUPABASE_URL=https://khfbbenxfpmneregtaud.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZmJiZW54ZnBtbmVyZWd0YXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2ODExNTIsImV4cCI6MjA2MTI1NzE1Mn0.hrzTfXWjZqW1HYjyT5TjSiVgNEfIyK8QJs35K9ZiWBI
Mobil (Expo)
Aynı şekilde .env.local dosyasına aşağıdakileri ekleyin:

env
Kopyala
Düzenle
EXPO_PUBLIC_SUPABASE_URL=https://khfbbenxfpmneregtaud.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZmJiZW54ZnBtbmVyZWd0YXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2ODExNTIsImV4cCI6MjA2MTI1NzE1Mn0.hrzTfXWjZqW1HYjyT5TjSiVgNEfIyK8QJs35K9ZiWBI
🚀 3. Uygulamanın Başlatılması
Web
bash
Kopyala
Düzenle
yarn workspace web dev
Tarayıcıda şu adrese gidin: http://localhost:3000

💻 Web Tanıtım Videosu
📺 YouTube – Web Sürümü

Mobil (Expo)
Mobil emülatörü başlatın.

Terminalde şu komutu çalıştırın:

bash
Kopyala
Düzenle
yarn workspace mobile start
Açılan Expo Metro Bundler ekranında:

Android için a tuşuna basın

iOS için i tuşuna basın

📱 Mobil Tanıtım Videosu
📺 YouTube Shorts – Mobil Sürüm

👤 4. Test Kullanıcı Bilgileri
Varsayılan test hesabı ile giriş yapabilirsiniz:

E-posta: aile.sev.com@gmail.com

Şifre: deneme123

🐞 5. Hata Bildirimi
Karşılaştığınız hataları aşağıdaki e-posta adresine bildirebilirsiniz:

📧 E-posta: caltepeceylin@gmail.com

Lütfen bildirirken şu bilgilere yer verin:

Hangi adımlardan sonra oluştu?

Ekran görüntüsü varsa ekleyin.

🧩 Katkıda Bulunmak
Geliştirmelere katkı sunmak isterseniz, fork edip pull request gönderebilirsiniz. 🎉
Katkılarınızı bekliyoruz!

