import type { CampusEvent, Category } from "../types/campus-event";

export function searchEvents(events: CampusEvent[], searchText: string): CampusEvent[] {
  if (!searchText.trim()) return events;
  const lower = searchText.toLowerCase();
  return events.filter(
    (e) =>
      e.title.toLowerCase().includes(lower) ||
      e.location.toLowerCase().includes(lower)
  );
}

export function filterByCategory(events: CampusEvent[], category: Category | ""): CampusEvent[] {
  if (!category) return events;
  return events.filter((e) => e.category === category);
}

export function findEventById(events: CampusEvent[], id: string): CampusEvent | undefined {
  return events.find((e) => e.id === id);
}