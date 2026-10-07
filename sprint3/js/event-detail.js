import { events } from "./data.js";

// Tarihi Türkçe okunabilir formata dönüştür
function formatDate(dateStr) {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    const dateObj = new Date(`${year}-${month}-${day}`);
    return dateObj.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }
  return dateStr;
}

const container = document.querySelector("#detay");

// 1. Adres çubuğundaki id değerini al (?id=event-3 gibi)
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 2. Etkinliği dizi içinde ara
const event = events.find((e) => e.id === id);

if (!event) {
  // 3. Etkinlik bulunamazsa hata kutusu göster
  document.title = "Etkinlik Bulunamadı";
  if (container) {
    container.innerHTML = `
      <div style="background-color: #ffebee; color: #c62828; border: 1px solid #ef9a9a; padding: 20px; border-radius: 8px; margin: 20px auto; max-width: 600px; text-align: center;">
        <h2>Hata: Etkinlik Bulunamadı</h2>
        <p>Aradığınız etkinlik mevcut değil veya kaldırılmış olabilir.</p>
        <a href="etkinlikler.html" style="display: inline-block; margin-top: 10px; color: #1565c0; font-weight: bold; text-decoration: underline;">&larr; Etkinlik Listesine Dön</a>
      </div>
    `;
  }
} else {
  // 4. Etkinlik bulunursa sekme başlığını ve künyeyi doldur
  document.title = `${event.title} - Detay`;

  if (container) {
    container.innerHTML = `
      <article style="max-width: 700px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #fff;">
        <h2>${event.title}</h2>
        <p style="font-size: 1.1rem; color: #555; margin-bottom: 20px;">${event.description}</p>
        
        <dl style="display: grid; grid-template-columns: 140px 1fr; row-gap: 12px; column-gap: 10px;">
          <dt><strong>Kategori:</strong></dt>
          <dd>${event.category}</dd>

          <dt><strong>Tarih:</strong></dt>
          <dd>${formatDate(event.date)}</dd>

          <dt><strong>Saat:</strong></dt>
          <dd>${event.time}</dd>

          <dt><strong>Yer:</strong></dt>
          <dd>${event.location}</dd>

          <dt><strong>Kontenjan:</strong></dt>
          <dd>${event.capacity} kişi</dd>
        </dl>

        <div style="margin-top: 25px; display: flex; gap: 15px;">
          <a href="etkinlik-guncelle.html?id=${event.id}" style="background-color: #2e7d32; color: #fff; padding: 8px 16px; border-radius: 4px; text-decoration: none;">Güncelle</a>
          <a href="etkinlikler.html" style="display: inline-block; padding: 8px 0; color: #333; text-decoration: none;">&larr; Listeye Dön</a>
        </div>
      </article>
    `;
  }
}