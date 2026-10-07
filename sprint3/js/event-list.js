import { events } from "./data.js";

// Tarihi "12 Ekim 2026" formatına dönüştüren fonksiyon
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

// Kart HTML şablonu
function createCard(event) {
  return `
    <article class="kart">
      <h3>${event.title}</h3>
      <p>${event.category} - ${formatDate(event.date)}</p>
      <a href="etkinlik-detay.html?id=${event.id}" style="color: green; text-decoration: none; font-weight: bold;">Detayları gör &rarr;</a>
    </article>
  `;
}

// Sayfa elemanları
const list = document.querySelector("#etkinlik-listesi");
const filtreFormu = document.querySelector("#filtre-formu");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

// Kartları sayfaya basan fonksiyon
function render(dizi) {
  if (!list) return;
  if (dizi.length === 0) {
    list.innerHTML = "<p>Aradığınız kriterlere uygun etkinlik bulunamadı.</p>";
  } else {
    list.innerHTML = dizi.map(createCard).join("");
  }
}

// --- ANA SAYFA (index.html) MANTIĞI ---
if (list && list.dataset.limit) {
  const yaklasan = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
}

// --- TÜM ETKİNLİKLER SAYFASI (etkinlikler.html) VE FİLTRELEME MANTIĞI ---
if (filtreFormu && aramaInput && kategoriSelect) {
  // 1. Kategorileri veriden tekil (new Set) olarak üretip select içine ekle
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriler.forEach((kat) => {
    const opt = document.createElement("option");
    opt.value = kat;
    opt.textContent = kat;
    kategoriSelect.appendChild(opt);
  });

  // Filtreleme fonksiyonu
  function filtrele() {
    const aranan = aramaInput.value.trim().toLocaleLowerCase("tr-TR");
    const secilenKategori = kategoriSelect.value;

    const sonuc = events.filter((e) => {
      const baslikUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan);
      const aciklamaUyuyor = e.description ? e.description.toLocaleLowerCase("tr-TR").includes(aranan) : false;
      const metinUyuyor = baslikUyuyor || aciklamaUyuyor;

      const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;

      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    // Sonuç sayısını göster
    if (sonucSatiri) {
      sonucSatiri.textContent = sonuc.length > 0 
        ? `${sonuc.length} etkinlik listeleniyor.` 
        : "Eşleşen etkinlik bulunamadı.";
    }
  }

  // Dinleyiciler (Arama ve Kategori değişimi)
  aramaInput.addEventListener("input", filtrele);
  kategoriSelect.addEventListener("change", filtrele);

  // Formda Enter'a basınca sayfa yenilenmesini engelle
  filtreFormu.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // İlk açılışta tümünü listele ve sonucu yaz
  render(events);
  if (sonucSatiri) {
    sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;
  }
}