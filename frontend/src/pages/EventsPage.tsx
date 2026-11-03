import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import type { Category } from "../types/campus-event";
import { filterByCategory, searchEvents } from "../utils/filter-events";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = Array.from(new Set(events.map((e) => e.category)));
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <div className="events-page">
      <h2 className="bolum-baslik">Tüm Etkinlikler</h2>
      <EventFilter
        searchText={searchText}
        category={category}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />
      <EventList events={filtered} />
    </div>
  );
}