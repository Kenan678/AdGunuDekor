// ---------------------------------------------------------------
// Dekor kateqoriyaları — tək mərkəzdən idarə olunur.
// key: backend-in gözlədiyi dəyər (enum adının kiçik hərfli forması).
// label: tam ad (xidmət kartları üçün).
// short: qısa ad (qalereya filtr düymələri üçün).
// img: nümunə şəkil (real şəkillər admin paneldən yüklənir).
//
// Yeni kateqoriya əlavə etmək üçün: bura bir sətir + backend
// GalleryCategory enum-una uyğun dəyər əlavə et.
// ---------------------------------------------------------------

export interface Category {
  key: string;
  label: string;
  short: string;
  img: string;
}

export const CATEGORIES: Category[] = [
  { key: "biryas", label: "1 Yaş Ad Günü Dekoru", short: "1 Yaş", img: "/assets/cat-biryas.jpg" },
  { key: "qiz", label: "Qız Ad Günü Dekoru", short: "Qız", img: "/assets/cat-qiz.jpg" },
  { key: "oglan", label: "Oğlan Ad Günü Dekoru", short: "Oğlan", img: "/assets/cat-oglan.jpg" },
  { key: "boyukler", label: "Böyüklər üçün Ad Günü Dekoru", short: "Böyüklər", img: "/assets/cat-boyukler.jpg" },
  { key: "mezuniyyet", label: "Məktəb Məzuniyyət Dekoru", short: "Məzuniyyət", img: "/assets/cat-mezuniyyet.jpg" },
  { key: "qirxgun", label: "40 Günlük Dekoru", short: "40 Günlük", img: "/assets/cat-qirxgun.jpg" },
  { key: "cizgifilm", label: "Cizgi Film Qəhrəmanı Dekoru", short: "Cizgi Film", img: "/assets/cat-cizgifilm.jpg" },
  { key: "futbol", label: "Futbol Temalı Dekor", short: "Futbol", img: "/assets/cat-futbol.jpg" },
  { key: "toy", label: "Kiçik Toy Dekoru", short: "Kiçik Toy", img: "/assets/cat-toy.jpg" },
];
