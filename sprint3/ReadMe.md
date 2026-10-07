# Kampüs Etkinlikleri Web Uygulaması

Bu proje; kampüste düzenlenen seminer, atölye ve hackathon gibi etkinlikleri listelemek, filtrelemek, detaylarını görüntülemek ve yeni etkinlik kaydı/güncellemesi oluşturmak amacıyla geliştirilmiş dinamik bir web uygulamasıdır.

## 🔗 Canlı Yayın (Live Demo)
* **Canlı Demo:** [https://kamp-s-etkinlik-sprint2-345h1kck7-esat7.vercel.app/](https://kamp-s-etkinlik-sprint2-345h1kck7-esat7.vercel.app/)

---

## 🚀 Proje Özellikleri ve Yetenekleri

* **Dinamik Kart Listeleme (ES6 Modülleri):** Etkinlik verileri `js/data.js` dosyasından okunarak JavaScript (`js/event-list.js`) aracılığıyla dinamik olarak DOM üzerine aktarılır.
* **Yaklaşan Etkinlikler (Ana Sayfa):** `data-limit="2"` özniteliği kullanılarak ana sayfada tarihe göre sıralı en yakın 2 etkinlik gösterilir.
* **Anlık Arama ve Filtreleme:** 
  * `etkinlikler.html` üzerinde arama kutusu ve kategori filtresi anlık olarak birlikte çalışır (`input` ve `change` olayları).
  * Türkçe karakter duyarlılığı (`toLocaleLowerCase("tr-TR")`) desteklenir.
  * Filtreye uyan etkinlik sayısı dinamik olarak gösterilir (`#sonuc`).
* **Dinamik Detay Sayfası:** `URLSearchParams` ile adres çubuğundaki parametre (`?id=event-X`) okunarak ilgili etkinliğin künyesi (`dl / dt / dd`) ekrana basılır. Geçersiz veya eksik parametrelerde kullanıcı dostu hata ekranı ve listeye dönüş linki sunulur.
* **Form Doğrulama (Client-side Validation):**
  * `novalidate` ile tarayıcı balonları kapatılmış, özel doğrulama kuralları tanımlanmıştır.
  * Hatalı alanlar `aria-invalid="true"` ile işaretlenir ve ilgili alanın altına hata mesajı yazılır.
  * Form başarıyla doğrulandığında sayfa yenilenmeden (`e.preventDefault()`) veriler JSON nesnesi formatında önizlenir.
* **Güncelleme Modu (`data-mode="guncelle"`):** Detay sayfasından yönlendirilen etkinlik ID'si okunarak form alanları mevcut verilerle dolu olarak açılır.

---

## 📁 Dosya ve Klasör Yapısı

```text
kampüs etkinlik/
├── sprint3/
│   ├── css/
│   │   └── 2321032067.css       # Proje stil dosyası ve responsive kurallar
│   ├── js/
│   │   ├── data.js             # 6 adet etkinlik verisini barındıran dizi
│   │   ├── event-list.js       # Listeleme, limit ve filtreleme modülü
│   │   ├── event-detail.js     # URL id parametresi ile detay gösterim modülü
│   │   └── event-form.js       # Form verisi yakalama, doğrulama ve güncelleme modülü
│   ├── index.html              # Ana sayfa (Yaklaşan 2 etkinlik)
│   ├── etkinlikler.html        # Tüm etkinlikler ve filtreleme sayfası
│   ├── etkinlik-detay.html     # Etkinlik detay görüntüleme sayfası
│   ├── etkinlik-ekle.html      # Yeni etkinlik oluşturma formu
│   └── etkinlik-guncelle.html  # Var olan etkinliği güncelleme formu
└── Readme.md