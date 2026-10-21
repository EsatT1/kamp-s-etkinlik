kamp-s-etkinlik-kv0zwa97z-esat7.vercel.app
# Kampüs Etkinlikleri - Sprint 4 (React + TypeScript + Vite)

Bu proje, önceki sprintlerde geliştirilen Kampüs Etkinlikleri uygulamasının React, TypeScript ve Vite altyapısına taşınmış SPA (Single Page Application) sürümüdür.

## Özellikler
- **State Tabanlı Sayfa Geçişi:** Router olmadan `page` state'i ile 5 sayfa (Ana Sayfa, Etkinlikler, Ekle, Detay, Güncelle) yönetimi.
- **Dinamik Listeleme & Filtreleme:** Anlık arama ve kategori filtreleme.
- **Tip Güvenliği:** TypeScript ile tanımlanmış veri modelleri (`CampusEvent`, `Category`).
- **Saf Fonksiyonlar:** DOM'dan bağımsız `searchEvents`, `filterByCategory`, `findEventById` yardımcı fonksiyonları.