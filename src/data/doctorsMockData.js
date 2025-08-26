export const SPECIALTIES = [
  "Todas as especialidades",
  "Cardiologia",
  "Dermatologia",
  "Endocrinologia",
  "Gastroenterologia",
  "Geriatria",
  "Ginecologia",
  "Neurologia",
  "Oftalmologia",
  "Ortopedia",
  "Otorrinolaringologia",
  "Pediatria",
  "Pneumologia",
  "Psiquiatria",
  "Urologia",
];

export const LOCATIONS = [
  "Todas as regiões",
  "Centro",
  "Zona Norte",
  "Zona Sul",
  "Zona Leste",
  "Zona Oeste",
  "Região Metropolitana",
];

export const HOSPITALS = [
  "Hospital São Paulo",
  "Hospital das Clínicas",
  "Hospital Sírio-Libanês",
  "Hospital Albert Einstein",
  "Hospital Alemão Oswaldo Cruz",
  "Centro Ortopédico Especializado",
  "Instituto Neurológico Avançado",
  "Hospital Infantil Santa Catarina",
  "Clínica Cardiológica Premium",
  "Centro de Especialidades Médicas",
  "Hospital Regional Norte",
  "Clínica Dermatológica São Paulo",
];

export const DOCTORS = [
  {
    id: 1,
    name: "Dr. João Silva",
    specialty: "Cardiologia",
    rating: 4.8,
    reviews: 127,
    location: "Centro",
    hospital: "Hospital São Paulo",
    price: "R$ 200",
    nextAvailable: "Hoje às 14:00",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    crm: "CRM/SP 123456",
    email: "joao.silva@email.com",
    phone: "(11) 99999-1234",
    experience: "15 anos de experiência",
    education: "Formado pela USP - Residência em Cardiologia pelo InCor",
    description:
      "Especialista em cardiologia com ampla experiência em procedimentos cardíacos, ecocardiografia e cateterismo.",
    schedule: [
      "Segunda: 08:00-12:00",
      "Quarta: 14:00-18:00",
      "Sexta: 08:00-12:00",
    ],
  },
  {
    id: 2,
    name: "Dr. Carlos Oliveira",
    specialty: "Ortopedia",
    rating: 4.7,
    reviews: 156,
    location: "Zona Norte",
    hospital: "Centro Ortopédico Especializado",
    price: "R$ 250",
    nextAvailable: "Segunda às 08:00",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    crm: "CRM/SP 789012",
    email: "carlos.oliveira@email.com",
    phone: "(11) 88888-5678",
    experience: "12 anos de experiência",
    education: "Formado pela UNIFESP - Especialização em Cirurgia do Joelho",
    description:
      "Especialista em ortopedia e traumatologia, com foco em cirurgias articulares e medicina esportiva.",
    schedule: [
      "Terça: 14:00-18:00",
      "Quinta: 08:00-12:00",
      "Sábado: 08:00-12:00",
    ],
  },
  {
    id: 3,
    name: "Dra. Ana Santos",
    specialty: "Pediatria",
    rating: 4.9,
    reviews: 203,
    location: "Zona Sul",
    hospital: "Hospital Infantil Santa Catarina",
    price: "R$ 180",
    nextAvailable: "Amanhã às 10:00",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    crm: "CRM/SP 345678",
    email: "ana.santos@email.com",
    phone: "(11) 77777-9012",
    experience: "18 anos de experiência",
    education: "Formada pela UNICAMP - Residência em Pediatria pelo HC",
    description:
      "Pediatra especializada em desenvolvimento infantil, vacinação e cuidados neonatais.",
    schedule: [
      "Segunda: 14:00-18:00",
      "Quarta: 08:00-12:00",
      "Sexta: 14:00-18:00",
    ],
  },
];

export const FORM_SPECIALTIES = SPECIALTIES.filter(
  (specialty) => specialty !== "Todas as especialidades"
);

export const FORM_LOCATIONS = LOCATIONS.filter(
  (location) => location !== "Todas as regiões"
);

export const FORM_HOSPITALS = HOSPITALS;
