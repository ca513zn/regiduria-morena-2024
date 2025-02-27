export const latest_proposals = [
  {
    id: "123",
    title: "Renovación del Malecón",
    description:
      "Propuesta para la renovación y modernización del Malecón de Acapulco para mejorar la experiencia turística.",
    images: [], // You can replace this with actual image URLs later.
    static_images: ["/images/malecon_1.jpg"],
    date_registered: new Date(),
    status: "pending",
    author: "Luis Walton Aburto",
    address: {
      street: "Avenida Costera Miguel Alemán",
      number: "500",
      neighborhood: "Centro",
    },
    district_section: "112",
    phone: "+52 1 744 123 4567",
    applicant_name: "Juan Pérez",
    request_type: "Obras Públicas",
    category: "Calles",
    documents: [],
  },
  {
    id: "124",
    title: "Obras Públicas",
    description:
      "Propuesta para mejorar la infraestructura vial en la Zona Diamante, enfocándose en la construcción de nuevos puentes y carreteras.",
    images: [],
    static_images: ["/images/malecon_1.jpg"],
    date_registered: new Date(),
    status: "approved",
    author: "Adela Román Ocampo",
    address: {
      street: "Boulevard de Las Naciones",
      number: "1000",
      neighborhood: "Zona Diamante",
    },
    district_section: "231",
    phone: "+52 1 744 987 6543",
    applicant_name: "Carlos Rodríguez",
    request_type: "Obras Públicas",
    category: "Calles",
    documents: [],
  },
  {
    id: "125",
    title: "Parque Ecológico El Veladero",
    description:
      "Proyecto para la preservación y creación de un área ecológica protegida en El Veladero, promoviendo actividades turísticas y ambientales.",
    images: [],
    static_images: ["/images/malecon_1.jpg"],
    date_registered: new Date(),
    status: "rejected",
    author: "Manuel Añorve Baños",
    address: {
      street: "Avenida Ejido",
      number: "750",
      neighborhood: "El Progreso",
    },
    district_section: "023",
    phone: "+52 1 744 456 7890",
    applicant_name: "María López",
    request_type: "S. Públicos",
    category: "Áreas Verdes",
    documents: [],
  },
];

export const statuses = {
  pending: "En Tramite",
  approved: "Aprobado",
  rejected: "Rechazado",
};

export const status_colors = {
  pending: "info",
  approved: "success",
  rejected: "error",
};
export const request_types = [
  {
    name: "Programas Sociales",
    categories: ["Madres Solteras", "Incapacidad", "Becas", "Seguros"],
  },
  {
    name: "Asesoría Legal y Financiera",
    categories: ["Catastro", "L.Construccion", "Licencias"],
  },
  {
    name: "Obras Públicas",
    categories: ["Andadores", "Electrificación", "Calles"],
  },
  {
    name: "S. Públicos",
    categories: [
      "Basura",
      "Áreas Verdes",
      "Imagen Urbana",
      "CAPAMA",
      "A. Público",
    ],
  },
];
