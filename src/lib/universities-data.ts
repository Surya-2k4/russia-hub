import { University } from "@/types";

export const UNIVERSITIES: University[] = [
  {
    id: "1",
    name: "Lomonosov Moscow State University",
    nameRu: "МГУ им. М.В. Ломоносова",
    city: "Moscow",
    region: "Moscow",
    lat: 55.7029,
    lng: 37.5303,
    programs: ["Physics", "History", "Math", "Biology"],
    fields: ["Science", "Humanities"],
    languages: ["Both"],
    levels: ["Bachelor", "Master", "PhD"],
    tuitionUSD: { min: 4500, max: 7000 },
    studentCount: 38000,
    internationalStudents: 4000,
    website: "https://www.msu.ru/en/",
    ranking: 1
  },
  {
    id: "2",
    name: "Saint Petersburg State University",
    nameRu: "СПбГУ",
    city: "Saint Petersburg",
    region: "Northwest",
    lat: 59.9419,
    lng: 30.2985,
    programs: ["Management", "Social Sciences", "Art"],
    fields: ["Medicine", "Engineering"],
    languages: ["Both"],
    levels: ["Master", "PhD"],
    tuitionUSD: { min: 3500, max: 6000 },
    studentCount: 30000,
    internationalStudents: 3500,
    website: "https://english.spbu.ru/",
    ranking: 2
  },
  {
    id: "3",
    name: "RUDN University",
    nameRu: "РУДН",
    city: "Moscow",
    region: "Moscow",
    lat: 55.6508,
    lng: 37.5056,
    programs: ["Medicine", "General Practice", "Law"],
    fields: ["Medicine", "Social Sciences"],
    languages: ["English"],
    levels: ["Bachelor", "Master"],
    tuitionUSD: { min: 5000, max: 9500 },
    studentCount: 32000,
    internationalStudents: 9500,
    website: "http://www.rudn.ru/en/",
    ranking: 10
  }
  // Add more universities as needed...
];
