import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export default function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      <h2>{event.title}</h2>
      <p style={{ fontSize: "1.05rem", color: "#555", margin: "15px 0" }}>
        {event.description}
      </p>

      <div className="detay-kapsayici">
        {event.image && (
          <figure>
            <img src="/afis.svg" alt={event.title} />
          </figure>
        )}

        <dl>
          <dt>Kategori:</dt>
          <dd>{event.category}</dd>

          <dt>Tarih:</dt>
          <dd>{formatDate(event.date)}</dd>

          <dt>Saat:</dt>
          <dd>{event.time}</dd>

          <dt>Yer:</dt>
          <dd>{event.location}</dd>

          <dt>Kontenjan:</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </div>

      <div style={{ marginTop: "25px", display: "flex", gap: "15px", alignItems: "center" }}>
        <button
          type="button"
          className="btn-ana"
          style={{ marginTop: 0 }}
          onClick={() => onEdit(event.id)}
        >
          Bu etkinliği güncelle
        </button>
        <button
          type="button"
          className="kart-detay-btn"
          style={{ marginTop: 0 }}
          onClick={onBack}
        >
          &larr; Listeye Dön
        </button>
      </div>
    </article>
  );
}