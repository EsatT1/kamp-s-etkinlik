export function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    const dateObj = new Date(`${year}-${month}-${day}`);
    return dateObj.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }
  return dateStr;
}

export const parseCustomDate = (d: string): number => {
  const [day, month, year] = d.split("-");
  return new Date(`${year}-${month}-${day}`).getTime();
};