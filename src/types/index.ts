export interface University {
  id: string;
  name: string;
  nameRu: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  programs: string[];
  fields: string[];
  languages: ("English" | "Russian" | "Both")[];
  levels: ("Bachelor" | "Master" | "PhD")[];
  tuitionUSD: { min: number; max: number };
  studentCount: number;
  internationalStudents: number;
  website: string;
  ranking?: number;
}

export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  officialLink?: string;
  dueDays?: string;
  category: "pre-arrival" | "post-arrival";
  order: number;
}

export interface ChecklistState {
  [itemId: string]: boolean;
}

export interface CurrencyData {
  rate: number;
  lastUpdated: string;
  change24h: number;
}

export interface StudentLocation {
  id: string;
  universityId: string;
  createdAt: string;
}
