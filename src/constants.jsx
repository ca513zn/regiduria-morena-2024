export const latest_proposals = [
  {
    name: "Renovación del Malecón",
    description:
      "Propuesta para la renovación y modernización del Malecón de Acapulco para mejorar la experiencia turística.",
    images: ["/images/malecon_1.jpg"], // You can replace this with actual image URLs later.
    date_registered: new Date(),
    status: "pending",
    author: "Luis Walton Aburto",
    address: {
      street: "Avenida Costera Miguel Alemán",
      number: "500",
      neighborhood: "Centro",
    },
  },
  {
    name: "Mejora de Infraestructura Vial",
    description:
      "Propuesta para mejorar la infraestructura vial en la Zona Diamante, enfocándose en la construcción de nuevos puentes y carreteras.",
    images: ["https://via.placeholder.com/150"], // You can replace this with actual image URLs later.
    date_registered: new Date(),
    status: "approved",
    author: "Adela Román Ocampo",
    address: {
      street: "Boulevard de Las Naciones",
      number: "1000",
      neighborhood: "Zona Diamante",
    },
  },
  {
    name: "Parque Ecológico El Veladero",
    description:
      "Proyecto para la preservación y creación de un área ecológica protegida en El Veladero, promoviendo actividades turísticas y ambientales.",
    images: ["https://via.placeholder.com/150"], // You can replace this with actual image URLs later.
    date_registered: new Date(),
    status: "rejected",
    author: "Manuel Añorve Baños",
    address: {
      street: "Avenida Ejido",
      number: "750",
      neighborhood: "El Progreso",
    },
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
