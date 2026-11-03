import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
}

export default function EventList({
  events,
  emptyText = "Henüz etkinlik bulunmuyor.",
}: EventListProps) {
  if (events.length === 0) {
    return <p className="empty-message">{emptyText}</p>;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}