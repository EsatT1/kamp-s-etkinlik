import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p className="kategori">{event.category}</p>
      <p><strong>Tarih:</strong> {formatDate(event.date)}</p>
      <p><strong>Yer:</strong> {event.location}</p>
      <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      <Link className="btn-detay" to={`/events/${event.id}`}>
        Detayları gör
      </Link>
    </div>
  );
}