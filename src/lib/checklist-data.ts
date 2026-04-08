import { ChecklistItem } from "@/types";

export const CHECKLIST: ChecklistItem[] = [
  // Pre-Arrival
  {
    id: "pre-0",
    label: "Passport (Original + 3 Xerox Sets)",
    description: "Validity must be at least 18 months from the date of visa issuance.",
    category: "pre-arrival",
    order: 0
  },
  {
    id: "pre-1",
    label: "Official Invitation (MVD Document)",
    description: "The official letter from Ministry of Internal Affairs. Keep the Original safe.",
    category: "pre-arrival",
    order: 1
  },
  {
    id: "pre-2",
    label: "Apostille Certificates (Originals)",
    description: "Secondary (10th) and Senior Secondary (12th) marksheet & certificates with MEA Apostille.",
    category: "pre-arrival",
    order: 2
  },
  {
    id: "pre-3",
    label: "Notarized Russian Translations",
    description: "Translate your degree and passport into Russian. Need 2 certified sets.",
    category: "pre-arrival",
    order: 3
  },
  {
    id: "pre-4",
    label: "Medical Health Pack",
    description: "HIV Test (Original), General health certificate, and Chest X-ray reports.",
    category: "pre-arrival",
    order: 4
  },
  {
    id: "pre-5",
    label: "Visa Stamping (Passport)",
    description: "Single-entry student visa obtained from VFS or Consulate.",
    officialLink: "http://www.vfs-ru.ru/",
    category: "pre-arrival",
    order: 5
  },
  {
    id: "pre-6",
    label: "Passport Photos (10 Pieces)",
    description: "Size 3.5x4.5 cm, matte finish, white background. Hand carry 2 extra sets.",
    category: "pre-arrival",
    order: 6
  },
  // Post-Arrival
  {
    id: "post-1",
    label: "Migration Card (Original)",
    description: "Obtained at the border. Essential for registration and police checks.",
    category: "post-arrival",
    order: 7
  },
  {
    id: "post-2",
    label: "Migration Registration (72 hours)",
    description: "3 sets of passport xerox (all pages) and migration card for the uni office.",
    category: "post-arrival",
    order: 8,
    dueDays: "Within 3 days of arrival"
  },
  {
    id: "post-3",
    label: "Green Card (Dactyloscopy)",
    description: "Mandatory fingerprinting and photo session at the migration center.",
    category: "post-arrival",
    order: 9,
    dueDays: "Within 90 days"
  },
  {
    id: "post-4",
    label: "Medical Exam (Post-Arrival)",
    description: "Local medical check including narcotics and infectious diseases.",
    category: "post-arrival",
    order: 10,
    dueDays: "Mandatory for all"
  },
  {
    id: "post-5",
    label: "Insurance Policy (DMS)",
    description: "Russian medical insurance valid for 1 year. Required for extension.",
    category: "post-arrival",
    order: 11
  }
];
