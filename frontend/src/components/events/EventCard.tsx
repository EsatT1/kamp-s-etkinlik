import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

export default function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
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
        onClick={() => onShowDetail(event.id)}
      >
        Detayları gör &rarr;
      </button>
    </article>
  );
}