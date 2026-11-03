import { createContext, useContext, useState, type ReactNode } from "react";
import type { CampusEvent, Category, EventFormData } from "../types/campus-event";
import { initialEvents } from "../data/events";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

function toEvent(id: string, data: EventFormData): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    date: data.date,
    location: data.location.trim(),
    capacity: Number(data.capacity) || 0,
    description: data.description.trim(),
    imageUrl: data.imageUrl.trim() || undefined,
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  const addEvent = (data: EventFormData) => {
    const newEvent = toEvent(`event-${Date.now()}`, data);
    setEvents((prev) => [newEvent, ...prev]);
  };

  const updateEvent = (id: string, data: EventFormData) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? toEvent(id, data) : e))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const value = useContext(EventsContext);
  if (value === null) {
    throw new Error("useEvents Hook'u EventsProvider içinde kullanılmalıdır.");
  }
  return value;
}