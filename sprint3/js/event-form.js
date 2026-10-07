import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const formMesaj = document.querySelector("#form-mesaj");

// Hata span'ları ve input alanları
const fields = {
  ad: { input: document.querySelector("#ad"), error: document.querySelector("#ad-hata") },
  kategori: { input: document.querySelector("#kategori"), error: document.querySelector("#kategori-hata") },
  tarih: { input: document.querySelector("#tarih"), error: document.querySelector("#tarih-hata") },
  saat: { input: document.querySelector("#saat"), error: document.querySelector("#saat-hata") },
  konum: { input: document.querySelector("#konum"), error: document.querySelector("#konum-hata") },
  kontenjan: { input: document.querySelector("#kontenjan"), error: document.querySelector("#kontenjan-hata") }
};

if (form) {
  // --- GÜNCELLEME MODU KONTROLÜ (Adım 11) ---
  if (form.dataset.mode === "guncelle") {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const etkinlik = events.find((e) => e.id === id);

    if (etkinlik) {
      // Alanları mevcut verilerle doldur
      form.elements.ad.value = etkinlik.title;
      form.elements.kategori.value = etkinlik.category;

      // GG-AA-YYYY formatını HTML input[type="date"] için YYYY-MM-DD formatına çevir
      if (etkinlik.date) {
        const [day, month, year] = etkinlik.date.split("-");
        form.elements.tarih.value = `${year}-${month}-${day}`;
      }

      form.elements.saat.value = etkinlik.time;
      form.elements.konum.value = etkinlik.location;
      form.elements.aciklama.value = etkinlik.description || "";
      form.elements.kontenjan.value = etkinlik.capacity;
    } else {
      // id yoksa veya eşleşen etkinlik bulunamazsa formu gizle ve uyarı bas
      form.outerHTML = `
        <div style="background-color: #ffebee; color: #c62828; border: 1px solid #ef9a9a; padding: 20px; border-radius: 8px; text-align: center;">
          <h3>Geçersiz veya Eksik Etkinlik</h3>
          <p>Güncellenecek etkinlik bulunamadı. Lütfen bir etkinlik seçiniz.</p>
          <a href="etkinlikler.html" style="display: inline-block; margin-top: 10px; color: #1565c0; font-weight: bold; text-decoration: underline;">&larr; Etkinlikler Sayfasına Git</a>
        </div>
      `;
    }
  }

  // --- FORM DOĞRULAMA VE GÖNDERME MANTIĞI ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Hataları temizle
    Object.values(fields).forEach(({ input, error }) => {
      if (input) input.removeAttribute("aria-invalid");
      if (error) error.textContent = "";
    });
    if (formMesaj) formMesaj.innerHTML = "";

    const fd = new FormData(form);

    let formattedDate = "";
    const rawDate = fd.get("tarih");
    if (rawDate) {
      const [year, month, day] = rawDate.split("-");
      formattedDate = `${day}-${month}-${year}`;
    }

    const data = {
      title: fd.get("ad") ? fd.get("ad").trim() : "",
      category: fd.get("kategori"),
      date: formattedDate,
      time: fd.get("saat"),
      location: fd.get("konum") ? fd.get("konum").trim() : "",
      description: fd.get("aciklama") ? fd.get("aciklama").trim() : "",
      capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null
    };

    const errors = {};

    if (!data.title || data.title.length < 3) {
      errors.ad = "Etkinlik adı en az 3 karakter olmalıdır.";
    }
    if (!data.category) {
      errors.kategori = "Lütfen bir kategori seçiniz.";
    }
    if (!rawDate) {
      errors.tarih = "Lütfen etkinlik tarihini seçiniz.";
    }
    if (!data.time) {
      errors.saat = "Lütfen etkinlik saatini seçiniz.";
    }
    if (!data.location) {
      errors.konum = "Lütfen etkinlik yerini giriniz.";
    }
    if (data.capacity === null || isNaN(data.capacity) || data.capacity < 1 || data.capacity > 1000) {
      errors.kontenjan = "Kontenjan 1 ile 1000 arasında bir sayı olmalıdır.";
    }

    if (Object.keys(errors).length > 0) {
      for (const [key, msg] of Object.entries(errors)) {
        if (fields[key]) {
          if (fields[key].input) fields[key].input.setAttribute("aria-invalid", "true");
          if (fields[key].error) fields[key].error.textContent = msg;
        }
      }

      if (formMesaj) {
        formMesaj.innerHTML = `
          <div style="background-color: #ffebee; color: #c62828; border: 1px solid #ef9a9a; padding: 12px; border-radius: 6px;">
            Formda hatalı veya eksik alanlar var. Lütfen kontrol ediniz.
          </div>
        `;
      }
      return;
    }

    // Başarılı durum: Güncelleme veya Ekleme önizlemesi
    const isUpdate = form.dataset.mode === "guncelle";
    if (formMesaj) {
      formMesaj.innerHTML = `
        <div style="background-color: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; padding: 15px; border-radius: 6px;">
          <h4 style="margin: 0 0 10px 0;">Etkinlik ${isUpdate ? "Güncellendi" : "Oluşturuldu"} (Önizleme):</h4>
          <pre style="background: #ffffff; padding: 10px; border-radius: 4px; overflow-x: auto; color: #333;">${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    }
  });
}