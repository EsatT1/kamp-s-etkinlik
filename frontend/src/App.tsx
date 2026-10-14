import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

// Adım 8: Sayfa adları için tip tanımı
type PageName = "home" | "events" | "add" | "detail" | "update";

// Tarihi Türkçe formatlayan yardımcı fonksiyon
function formatDate(dateStr: string) {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    const dateObj = new Date(`${year}-${month}-${day}`);
    return dateObj.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }
  return dateStr;
}

// Tarihleri sıralamak için milisaniyeye çevirici
const parseCustomDate = (d: string) => {
  const [day, month, year] = d.split("-");
  return new Date(`${year}-${month}-${day}`).getTime();
};

function App() {
  // Sayfa ve seçili etkinlik durumu
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Arama ve filtreleme durumları
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  // Sayfa yönlendirme fonksiyonu
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  // Adım 12: Seçili etkinliği bul
  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;

  // Adım 11: Sekme başlığını güncelleme (useEffect)
  useEffect(() => {
    let title = "Ana Sayfa";
    if (page === "events") title = "Tüm Etkinlikler";
    if (page === "add") title = "Etkinlik Ekle";
    if (page === "update") title = "Etkinlik Güncelle";
    if (page === "detail") {
      title = selectedEvent ? selectedEvent.title : "Etkinlik Bulunamadı";
    }
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [page, selectedEvent]);

  // Adım 9: Tarihe göre en yakın 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => parseCustomDate(a.date) - parseCustomDate(b.date))
    .slice(0, 2);

  // Kategorileri dinamik al
  const categories: Category[] = [...new Set(events.map((e) => e.category))];

  // Arama ve filtre sonucunu hesapla
  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );

  // Kart bileşeni
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p>
          {event.category} - {formatDate(event.date)}, {event.time}
        </p>
        <p>
          <strong>Yer:</strong> {event.location}
        </p>
        <p>
          <strong>Kontenjan:</strong> {event.capacity} kişi
        </p>
        <button
          type="button"
          onClick={() => go("detail", event.id)}
          style={{
            background: "none",
            border: "none",
            color: "green",
            fontWeight: "bold",
            cursor: "pointer",
            padding: 0,
            marginTop: "8px",
            fontSize: "0.95rem"
          }}
        >
          Detayları gör &rarr;
        </button>
      </article>
    );
  }

  const navItems: { name: PageName; label: string }[] = [
    { name: "home", label: "Ana Sayfa" },
    { name: "events", label: "Etkinlikler" },
    { name: "add", label: "Ekle" }
  ];

  return (
    <>
      <header>
        <h2>Kampüs Etkinlikleri</h2>
        <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
        <nav>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={`#${item.name}`}
              aria-current={page === item.name ? "page" : undefined}
              className={page === item.name ? "aktif" : ""}
              onClick={(e) => {
                e.preventDefault();
                go(item.name);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: "900px", margin: "20px auto", padding: "0 15px" }}>
        {/* --- 1. ANA SAYFA --- */}
        {page === "home" && (
          <div>
            <h3>Yaklaşan 2 Etkinlik</h3>
            <section className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
            <div style={{ marginTop: "20px" }}>
              <button
                type="button"
                onClick={() => go("events")}
                style={{
                  backgroundColor: "#2e7d32",
                  color: "white",
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 500
                }}
              >
                Tüm etkinlikleri gör
              </button>
            </div>
          </div>
        )}

        {/* --- 2. TÜM ETKİNLİKLER VE FİLTRELEME --- */}
        {page === "events" && (
          <div>
            <h3>Tüm Etkinlikler</h3>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  id="arama"
                  type="search"
                  placeholder="atölye, kariyer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as Category | "")
                  }
                >
                  <option value="">Tümü</option>
                  {categories.map((kat) => (
                    <option key={kat} value={kat}>
                      {kat}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p id="sonuc">
              {filteredEvents.length > 0
                ? `${filteredEvents.length} etkinlik listeleniyor.`
                : "Eşleşen etkinlik bulunamadı."}
            </p>

            <section className="etkinlik-listesi">
              {filteredEvents.map(renderCard)}
            </section>
          </div>
        )}

        {/* --- 3. DETAY SAYFASI --- */}
        {page === "detail" && (
          <div>
            {!selectedEvent ? (
              <div
                style={{
                  backgroundColor: "#ffebee",
                  color: "#c62828",
                  border: "1px solid #ef9a9a",
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center"
                }}
              >
                <h2>Hata: Etkinlik Bulunamadı</h2>
                <p>Aradığınız etkinlik mevcut değil veya kaldırılmış olabilir.</p>
                <button
                  type="button"
                  onClick={() => go("events")}
                  style={{
                    marginTop: "10px",
                    background: "none",
                    border: "none",
                    color: "#1565c0",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  &larr; Etkinlik Listesine Dön
                </button>
              </div>
            ) : (
              <article
                className="detay"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px",
                  background: "#fff"
                }}
              >
                <h2>{selectedEvent.title}</h2>
                <p style={{ fontSize: "1.05rem", color: "#555", margin: "15px 0" }}>
                  {selectedEvent.description}
                </p>

                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-start" }}>
                  {selectedEvent.image && (
                    <figure style={{ margin: 0, maxWidth: "250px", flexShrink: 0 }}>
                      <img
                        src="/afis.svg"
                        alt={selectedEvent.title}
                        style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px" }}
                      />
                    </figure>
                  )}

                  <dl style={{ display: "grid", gridTemplateColumns: "130px 1fr", rowGap: "10px", flex: 1 }}>
                    <dt><strong>Kategori:</strong></dt>
                    <dd>{selectedEvent.category}</dd>

                    <dt><strong>Tarih:</strong></dt>
                    <dd>{formatDate(selectedEvent.date)}</dd>

                    <dt><strong>Saat:</strong></dt>
                    <dd>{selectedEvent.time}</dd>

                    <dt><strong>Yer:</strong></dt>
                    <dd>{selectedEvent.location}</dd>

                    <dt><strong>Kontenjan:</strong></dt>
                    <dd>{selectedEvent.capacity} kişi</dd>
                  </dl>
                </div>

                <div style={{ marginTop: "25px", display: "flex", gap: "15px" }}>
                  <button
                    type="button"
                    onClick={() => go("update", selectedEvent.id)}
                    style={{
                      backgroundColor: "#2e7d32",
                      color: "white",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Bu etkinliği güncelle
                  </button>
                  <button
                    type="button"
                    onClick={() => go("events")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#333",
                      cursor: "pointer",
                      padding: "8px 0"
                    }}
                  >
                    &larr; Listeye Dön
                  </button>
                </div>
              </article>
            )}
          </div>
        )}

        {/* --- 4. EKLE VE GÜNCELLE FORMU --- */}
        {(page === "add" || page === "update") && (
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h3>{page === "add" ? "Yeni Etkinlik Ekle" : "Etkinlik Güncelle"}</h3>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="title">Etkinlik Adı</label><br />
                <input id="title" name="title" maxLength={80} required /><br />
              </div>
              <br />
              <div>
                <label htmlFor="category">Kategori</label><br />
                <select id="category" name="category" required>
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select><br />
              </div>
              <br />
              <div>
                <label htmlFor="date">Tarih</label><br />
                <input id="date" type="date" name="date" required /><br />
              </div>
              <br />
              <div>
                <label htmlFor="time">Saat</label><br />
                <input id="time" type="time" name="time" required /><br />
              </div>
              <br />
              <div>
                <label htmlFor="location">Yer</label><br />
                <input id="location" name="location" required /><br />
              </div>
              <br />
              <div>
                <label htmlFor="description">Açıklama</label><br />
                <textarea id="description" name="description" rows={5} style={{ width: "100%" }} /><br />
              </div>
              <br />
              <div>
                <label htmlFor="capacity">Kontenjan</label><br />
                <input id="capacity" type="number" name="capacity" min={1} max={1000} required /><br />
              </div>
              <br />
              <button
                type="submit"
                style={{
                  backgroundColor: "#2e7d32",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </div>
        )}
      </main>

      <footer>
        <p>Mahmut Esat Özkan - 2321032067 - 2026</p>
      </footer>
    </>
  );
}

export default App;