import type { CampusEvent, Category } from "../types/campus-event";

// Başlık veya açıklamada metin ara
export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");
  if (!q) return list;
  return list.filter((e) => {
    const titleMatch = e.title.toLocaleLowerCase("tr-TR").includes(q);
    const descMatch = e.description ? e.description.toLocaleLowerCase("tr-TR").includes(q) : false;
    return titleMatch || descMatch;
  });
}

// Kategoriye göre filtrele ("" ise hepsi)
export function filterByCategory(
  list: CampusEvent[],
  category: Category | ""
): CampusEvent[] {
  if (category === "") return list;
  return list.filter((e) => e.category === category);
}

// id ile tek etkinlik bul
export function findEventById(
  list: CampusEvent[],
  id: string
): CampusEvent | undefined {
  return list.find((e) => e.id === id);
}