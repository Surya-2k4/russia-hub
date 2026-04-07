import { ChecklistItem } from "@/types";

export const CHECKLIST: ChecklistItem[] = [
  // Pre-Arrival
  {
    id: "pre-1",
    label: "University Acceptance Letter",
    description: "Ensure your school has confirmed your enrolment.",
    category: "pre-arrival",
    order: 1
  },
  {
    id: "pre-2",
    label: "Invitation Letter (MVD/Minobrnauki)",
    description: "Apply for the official invitation letter to apply for your visa.",
    category: "pre-arrival",
    order: 2
  },
  {
    id: "pre-3",
    label: "Document Apostille",
    description: "Get all your academic records apostilled by the Ministry of Education & External Affairs.",
    category: "pre-arrival",
    order: 3
  },
  {
    id: "pre-4",
    label: "Medical Certificate & HIV Test",
    description: "Required for the visa application and university admission.",
    category: "pre-arrival",
    order: 4
  },
  {
    id: "pre-5",
    label: "Apply for Russian Visa",
    description: "Apply via the official VFS Global center or consulate.",
    officialLink: "http://www.vfs-ru.ru/",
    category: "pre-arrival",
    order: 5
  },
  // Post-Arrival
  {
    id: "post-1",
    label: "Migration Registration (72h)",
    description: "Submit your migration card to the university's international office within 3 days of arrival.",
    category: "post-arrival",
    order: 6
  },
  {
    id: "post-2",
    label: "MIR Bank Card",
    description: "Apply for a Sberbank or Tinkoff card for daily transactions.",
    category: "post-arrival",
    order: 7
  },
  {
    id: "post-3",
    label: "Fingerprinting & Medical Exam",
    description: "Mandatory for all students within 90 days of arrival.",
    category: "post-arrival",
    order: 8
  },
  {
    id: "post-4",
    label: "University Student ID Card",
    description: "Access your campus buildings and libraries.",
    category: "post-arrival",
    order: 9
  }
];
