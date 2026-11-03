import { useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import EventDetail from "../components/events/EventDetail";
import NotFoundPage from "./NotFoundPage";

export default function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();

  const event = findEventById(events, id ?? "");

  if (!event) return <NotFoundPage />;

  return (
    <div className="event-detail-page">
      <EventDetail event={event} />
    </div>
  );
}