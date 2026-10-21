import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";

import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import { parseCustomDate } from "./utils/format-date";

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

  return (
    <>
      <header>
        <Header />
        <Navigation current={page} onNavigate={go} />
      </header>

      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <div>
            <h3>Yaklaşan 2 Etkinlik</h3>
            <EventList
              events={upcoming}
              onShowDetail={(id) => go("detail", id)}
            />
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

        {/* TÜM ETKİNLİKLER VE FİLTRELEME */}
        {page === "events" && (
          <div>
            <h3>Tüm Etkinlikler</h3>
            <EventFilter
              searchText={searchText}
              category={selectedCategory}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setSelectedCategory}
            />
            {filteredEvents.length > 0 && (
              <p id="sonuc">{filteredEvents.length} etkinlik listeleniyor.</p>
            )}
            <EventList
              events={filteredEvents}
              onShowDetail={(id) => go("detail", id)}
            />
          </div>
        )}

        {/* DETAY SAYFASI */}
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
              <EventDetail
                event={selectedEvent}
                onBack={() => go("events")}
                onEdit={(id) => go("update", id)}
              />
            )}
          </div>
        )}

        {/* EKLE VE GÜNCELLE SAYFALARI */}
        {(page === "add" || page === "update") && (
          <div>
            <h3>{page === "add" ? "Yeni Etkinlik Ekle" : "Etkinlik Güncelle"}</h3>
            <EventForm
              isUpdate={page === "update"}
              onSubmit={() => window.scrollTo(0, 0)}
            />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;