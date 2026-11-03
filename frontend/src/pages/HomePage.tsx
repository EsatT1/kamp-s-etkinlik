import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

export default function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  return (
    <div className="home-page">
      <h2 className="bolum-baslik">Yaklaşan Etkinlikler</h2>
      <EventList events={upcoming} />
      <div style={{ marginTop: "20px" }}>
        <Link className="btn-ana" to="/events">
          Tüm etkinlikleri gör
        </Link>
      </div>
    </div>
  );
}