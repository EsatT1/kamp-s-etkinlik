import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "add" | "detail" | "update";

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

const parseCustomDate = (d: string) => {
  const [day, month, year] = d.split("-");
  return new Date(`${year}-${month}-${day}`).getTime();
};

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;

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

  const upcoming = [...events]
    .sort((a, b) => parseCustomDate(a.date) - parseCustomDate(b.date))
    .slice(0, 2);

  const categories: Category[] = [...new Set(events.map((e) => e.category))];

  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <div>
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
        </div>
        <button
          type="button"
          className="kart-detay-btn"
          onClick={() => go("detail", event.id)}
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

      <main>
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
                className="btn-ana"
                onClick={() => go("events")}
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
                  className="kart-detay-btn"
                  onClick={() => go("events")}
                  style={{ textDecoration: "underline", display: "inline-block" }}
                >
                  &larr; Etkinlik Listesine Dön
                </button>
              </div>
            ) : (
              <article className="detay">
                <h2>{selectedEvent.title}</h2>
                <p style={{ fontSize: "1.05rem", color: "#555", margin: "15px 0" }}>
                  {selectedEvent.description}
                </p>

                <div className="detay-kapsayici">
                  {selectedEvent.image && (
                    <figure>
                      <img
                        src="/afis.svg"
                        alt={selectedEvent.title}
                      />
                    </figure>
                  )}

                  <dl>
                    <dt>Kategori:</dt>
                    <dd>{selectedEvent.category}</dd>

                    <dt>Tarih:</dt>
                    <dd>{formatDate(selectedEvent.date)}</dd>

                    <dt>Saat:</dt>
                    <dd>{selectedEvent.time}</dd>

                    <dt>Yer:</dt>
                    <dd>{selectedEvent.location}</dd>

                    <dt>Kontenjan:</dt>
                    <dd>{selectedEvent.capacity} kişi</dd>
                  </dl>
                </div>

                <div style={{ marginTop: "25px", display: "flex", gap: "15px", alignItems: "center" }}>
                  <button
                    type="button"
                    className="btn-ana"
                    style={{ marginTop: 0 }}
                    onClick={() => go("update", selectedEvent.id)}
                  >
                    Bu etkinliği güncelle
                  </button>
                  <button
                    type="button"
                    className="kart-detay-btn"
                    style={{ marginTop: 0 }}
                    onClick={() => go("events")}
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
          <div>
            <h3>{page === "add" ? "Yeni Etkinlik Ekle" : "Etkinlik Güncelle"}</h3>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="title">Etkinlik Adı</label>
                <input id="title" name="title" maxLength={80} required />
              </div>

              <div>
                <label htmlFor="category">Kategori</label>
                <select id="category" name="category" required>
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>

              <div>
                <label htmlFor="date">Tarih</label>
                <input id="date" type="date" name="date" required />
              </div>

              <div>
                <label htmlFor="time">Saat</label>
                <input id="time" type="time" name="time" required />
              </div>

              <div>
                <label htmlFor="location">Yer</label>
                <input id="location" name="location" required />
              </div>

              <div>
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" name="description" rows={5} />
              </div>

              <div>
                <label htmlFor="capacity">Kontenjan</label>
                <input id="capacity" type="number" name="capacity" min={1} max={1000} required />
              </div>

              <button type="submit" className="btn-ana">
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