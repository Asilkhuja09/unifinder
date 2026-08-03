export type CampusMedia = {
  photos: { url: string; caption: string }[];
  alumni: string[];
  stats: { label: string; value: string }[];
};

const w = (file: string, width = 900) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

/** Real, freely licensed Wikimedia Commons campus imagery keyed by university id. */
export const CAMPUS_MEDIA: Record<string, CampusMedia> = {
  harvard: {
    photos: [
      { url: w("Harvard_Yard.jpg"), caption: "Harvard Yard" },
      { url: w("Widener_Library,_Harvard_University.jpg"), caption: "Widener Library" },
    ],
    alumni: ["Barack Obama", "Natalie Portman", "John F. Kennedy"],
    stats: [
      { label: "Students", value: "21,600" },
      { label: "Endowment", value: "$50.7B" },
      { label: "Nobel laureates", value: "160+" },
    ],
  },
  mit: {
    photos: [
      { url: w("MIT_Main_Campus_Aerial.jpg"), caption: "Main campus, Cambridge" },
      { url: w("MIT_Building_10_and_the_Great_Dome,_Cambridge_MA.jpg"), caption: "The Great Dome" },
    ],
    alumni: ["Kofi Annan", "Buzz Aldrin", "Richard Feynman"],
    stats: [
      { label: "Students", value: "11,900" },
      { label: "Startups by alumni", value: "30,000+" },
      { label: "Nobel laureates", value: "100+" },
    ],
  },
  stanford: {
    photos: [
      { url: w("Stanford_University_Main_Quad_2020.jpg"), caption: "Main Quad" },
      { url: w("Hoover_Tower_Stanford_University.jpg"), caption: "Hoover Tower" },
    ],
    alumni: ["Sundar Pichai", "Elon Musk (attended)", "Sergey Brin"],
    stats: [
      { label: "Students", value: "17,500" },
      { label: "Campus size", value: "8,180 acres" },
      { label: "Nobel laureates", value: "80+" },
    ],
  },
  oxford: {
    photos: [
      { url: w("Radcliffe_Camera,_Oxford_-_Oct_2006.jpg"), caption: "Radcliffe Camera" },
      { url: w("Christ_Church_Oxford_2023.jpg"), caption: "Christ Church College" },
    ],
    alumni: ["Stephen Hawking", "Malala Yousafzai", "Indira Gandhi"],
    stats: [
      { label: "Students", value: "26,000" },
      { label: "Colleges", value: "43" },
      { label: "Founded", value: "c. 1096" },
    ],
  },
  tum: {
    photos: [
      { url: w("Technische_Universität_München_Hauptgebäude.jpg"), caption: "Main building, Munich" },
    ],
    alumni: ["Rudolf Diesel", "Carl von Linde", "Klaus von Klitzing"],
    stats: [
      { label: "Students", value: "52,000" },
      { label: "Tuition", value: "€0 (fees only)" },
      { label: "Nobel laureates", value: "18" },
    ],
  },
  tsinghua: {
    photos: [{ url: w("Tsinghua_University_Main_Building.jpg"), caption: "Main Building" }],
    alumni: ["Xi Jinping", "Zhu Rongji", "Yang Chen-Ning"],
    stats: [
      { label: "Students", value: "50,000" },
      { label: "CSC funded seats", value: "1,000+/yr" },
      { label: "Founded", value: "1911" },
    ],
  },
  tokyo: {
    photos: [{ url: w("Yasuda_Auditorium_-_Tokyo_University.jpg"), caption: "Yasuda Auditorium" }],
    alumni: ["Yasunari Kawabata", "Kiyoshi Itō", "Eisaku Satō"],
    stats: [
      { label: "Students", value: "28,000" },
      { label: "MEXT scholars", value: "3,000+" },
      { label: "Nobel laureates", value: "11" },
    ],
  },
};

export const FALLBACK_MEDIA: CampusMedia = {
  photos: [],
  alumni: [],
  stats: [],
};