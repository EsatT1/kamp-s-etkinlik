import type { CampusEvent } from "../types/campus-event";

export const initialEvents: CampusEvent[] = [
  {
    id: "event-1",
    title: "Yapay Zeka ve Gelecek Semineri",
    category: "Seminer",
    date: "2026-11-15",
    location: "Amfi-1",
    capacity: 150,
    description: "Yapay zeka teknolojilerinin geleceği ve kariyer fırsatları üzerine seminer.",
    imageUrl: "https://picsum.photos/400/200?random=1"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "2026-11-20",
    location: "Mühendislik Lab-2",
    capacity: 30,
    description: "Temel robotik ve mikrodenetleyici programlama uygulamalı atölye çalışması.",
    imageUrl: "https://picsum.photos/400/200?random=2"
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "2026-11-25",
    location: "Lütfü Çakmakçı Kültür Merkezi",
    capacity: 200,
    description: "Siber güvenlikte güncel tehditler ve korunma yöntemleri üzerine uzman söyleşisi.",
    imageUrl: "https://picsum.photos/400/200?random=3"
  },
  {
    id: "event-4",
    title: "Kampüs Akustik Konseri",
    category: "Konser",
    date: "2026-12-01",
    location: "Öğrenci Meydanı",
    capacity: 500,
    description: "Müzik kulübü öğrencilerinin hazırladığı akustik canlı müzik dinletisi.",
    imageUrl: "https://picsum.photos/400/200?random=4"
  },
  {
    id: "event-5",
    title: "Fakülteler Arası Turnuva",
    category: "Spor",
    date: "2026-12-05",
    location: "Kapalı Spor Salonu",
    capacity: 100,
    description: "Geleneksel kampüs içi voleybol ve basketbol turnuva karşılaşmaları.",
    imageUrl: "https://picsum.photos/400/200?random=5"
  },
  {
    id: "event-6",
    title: "Yazılım Kulübü Tanışma Toplantısı",
    category: "Kulüp",
    date: "2026-12-10",
    location: "CBT Salonu",
    capacity: 80,
    description: "Yeni dönem projeleri, çalışma grupları ve etkinlik planlamaları tanışma toplantısı.",
    imageUrl: "https://picsum.photos/400/200?random=6"
  }
];