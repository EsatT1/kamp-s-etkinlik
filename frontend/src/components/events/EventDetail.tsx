import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <article className="event-detail">
      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.title} className="detail-img" />
      )}
      <h2>{event.title}</h2>
      <dl>
        <dt>Kategori:</dt> <dd>{event.category}</dd>
        <dt>Tarih:</dt> <dd>{formatDate(event.date)}</dd>
        <dt>Yer:</dt> <dd>{event.location}</dd>
        <dt>Kontenjan:</dt> <dd>{event.capacity} kişi</dd>
      </dl>
      <p className="description">{event.description}</p>
      <div className="detail-actions">
        <Link to="/events" className="btn-ikincil">Listeye dön</Link>
        <Link to={`/admin/${event.id}/edit`} className="btn-ana">Güncelle</Link>
      </div>
    </article>
  );
}