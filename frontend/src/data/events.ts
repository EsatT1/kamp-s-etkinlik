import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    capacity: 100,
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket stantları.",
    image: "/afis.svg"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    capacity: 20,
    date: "20-10-2026",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    image: "/afis.svg"
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Dünyası",
    category: "Söyleşi",
    capacity: 50,
    date: "27-10-2026",
    time: "15:30",
    location: "B Blok Amfi 1",
    description: "Etik hackerlık ve web güvenliği temelleri üzerine söyleşi.",
    image: "/afis.svg"
  },
  {
    id: "event-4",
    title: "Yapay Zeka ve Gelecek",
    category: "Seminer",
    capacity: 80,
    date: "29-10-2026",
    time: "13:00",
    location: "Merkezi Kütüphane Salonu",
    description: "Büyük dil modelleri ve yapay zekanın iş dünyasına etkileri.",
    image: "/afis.svg"
  },
  {
    id: "event-5",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "03-11-2026",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML ve CSS ile ilk kişisel sayfam yapımı.",
    image: "/afis.svg"
  },
  {
    id: "event-6",
    title: "Kodlama Maratonu (Hackathon)",
    category: "Yarışma",
    capacity: 40,
    date: "10-11-2026",
    time: "09:00",
    location: "Öğrenci Merkezi",
    description: "24 saatlik yenilikçi yazılım geliştirme maratonu.",
    image: "/afis.svg"
  }
];