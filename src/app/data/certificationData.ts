export interface Certification {
  id: string;
  name: string;
  desc: string;
  yearFrom: number;
  yearTo: number | null; // null means it's still valid
}

export const certificationData: Certification[] = [
  {
    id: "cert-001",
    name: "ISO 45001 : 2018",
    desc: "Sistem Manajemen Keselamatan dan Kesehatan Kerja",
    yearFrom: 2020,
    yearTo: 2023,
  },
  {
    id: "cert-002",
    name: "ISO 14001 : 2015",
    desc: "Sistem Manajemen Lingkungan",
    yearFrom: 2021,
    yearTo: 2024, // Still valid
  },
  {
    id: "cert-003",
    name: "ISO 9001 : 2015",
    desc: "Sistem Manajemen Mutu",
    yearFrom: 2019,
    yearTo: 2022,
  },
  //   {
  //     id: "cert-004",
  //     name: "Certified Information Systems Security Professional (CISSP)",
  //     desc: "Globally recognized certification in information security",
  //     yearFrom: 2018,
  //     yearTo: null, // Still valid
  //   },
  //   {
  //     id: "cert-005",
  //     name: "Project Management Professional (PMP)",
  //     desc: "World's leading project management certification",
  //     yearFrom: 2017,
  //     yearTo: 2020,
  //   },
  //   {
  //     id: "cert-006",
  //     name: "Certified Kubernetes Administrator (CKA)",
  //     desc: "Demonstrates competency in Kubernetes administration",
  //     yearFrom: 2022,
  //     yearTo: null, // Still valid
  //   },
];
