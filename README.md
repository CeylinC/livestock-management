
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
```

### b. Bağımlılıkların Kurulması

```bash
yarn install
```

### c. Ortam Değişkenlerinin Tanımlanması

#### Web (Next.js)

Proje dizininde `.env.local` dosyası oluşturun ve aşağıdakileri yapıştırın:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

#### Mobil (Expo)

Aynı şekilde `.env.local` dosyasına aşağıdakileri ekleyin:

```env
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## 🚀 3. Uygulamanın Başlatılması

### Web

```bash
yarn workspace web dev
```

Tarayıcıda şu adrese gidin: [http://localhost:3000](http://localhost:3000)

#### 💻 Web Tanıtım Videosu

📺 [YouTube – Web Sürümü](https://youtu.be/JoLCGfA7OJE)

---

### Mobil (Expo)

1. Mobil emülatörü başlatın.
2. Terminalde şu komutu çalıştırın:

```bash
yarn workspace mobile start
```

3. Açılan **Expo Metro Bundler** ekranında:
   - Android için `a` tuşuna basın
   - iOS için `i` tuşuna basın

#### 📱 Mobil Tanıtım Videosu

📺 [YouTube Shorts – Mobil Sürüm](https://youtube.com/shorts/-8g-ubEY5b8?feature=share)

---

## 👤 4. Test Kullanıcı Bilgileri

Varsayılan test hesabı ile giriş yapabilirsiniz:

- **E-posta:** aile.sev.com@gmail.com  
- **Şifre:** deneme123

---

## 🐞 5. Hata Bildirimi

Karşılaştığınız hataları aşağıdaki e-posta adresine bildirebilirsiniz:

📧 **E-posta:** caltepeceylin@gmail.com

**Lütfen bildirirken şu bilgilere yer verin:**

- Hangi adımlardan sonra oluştu?
- Ekran görüntüsü varsa ekleyin.

---

## 🧩 Katkıda Bulunmak

Geliştirmelere katkı sunmak isterseniz, fork edip pull request gönderebilirsiniz. 🎉  
Katkılarınızı bekliyoruz!

---
