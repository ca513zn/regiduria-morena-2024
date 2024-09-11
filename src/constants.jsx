export const latest_proposals = [
  {
    id: "123",
    name: "Renovación del Malecón",
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
    request_type: "Infraestructura",
  },
  {
    id: "124",
    name: "Mejora de Infraestructura Vial",
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
    request_type: "Transporte",
  },
  {
    id: "125",
    name: "Parque Ecológico El Veladero",
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
    request_type: "Medio Ambiente",
  },
];

export const statuses = {
  pending: "Pendiente",
  approved: "Aprobada",
  rejected: "Rechazada",
};

export const status_colors = {
  pending: "info",
  approved: "success",
  rejected: "error",
};
