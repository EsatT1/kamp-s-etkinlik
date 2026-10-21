import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string;
}

export default function EventList({
  events,
  onShowDetail,
  emptyText = "Eşleşen etkinlik bulunamadı."
}: EventListProps) {
  if (events.length === 0) {
    return <p id="sonuc">{emptyText}</p>;
  }

  return (
    <section className="etkinlik-listesi">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onShowDetail={onShowDetail}
        />
      ))}
    </section>
  );
}