export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Spor" | "Konser" | "Kulüp";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string;
  location: string;
  capacity: number;
  description: string;
  imageUrl?: string;
}

export interface EventFormData {
  title: string;
  category: Category | "";
  date: string;
  location: string;
  capacity: string;
  description: string;
  imageUrl: string;
}