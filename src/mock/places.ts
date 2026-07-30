import type { AccessibilityFeatures, CategoryId, Place } from "@/types";
import { CATEGORY_LABEL, MAP_CENTER } from "@/constants";

/** Deterministic pseudo-random generator so the mock dataset is stable. */
const seeded = (seed: number) => {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
};

const FEATURE_KEYS: (keyof AccessibilityFeatures)[] = [
  "rampa",
  "elevador",
  "banheiroAdaptado",
  "pisoTatil",
  "braille",
  "libras",
  "portaLarga",
  "corrimao",
  "vagaEspecial",
  "entradaSemDegraus",
];

const CATEGORY_TINT: Record<CategoryId, string> = {
  restaurante: "#f97316",
  mercado: "#16a34a",
  farmacia: "#0ea5e9",
  hospital: "#ef4444",
  banco: "#6366f1",
  praca: "#22c55e",
  escola: "#eab308",
  shopping: "#8b5cf6",
  academia: "#14b8a6",
  posto: "#f59e0b",
};

/** Offline-safe placeholder image encoded as an inline SVG data URI. */
const placeholderImage = (nome: string, categoria: CategoryId) => {
  const tint = CATEGORY_TINT[categoria];
  const initials = nome
    .split(" ")
    .filter((word) => word.length > 2)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="${tint}"/><stop offset="100%" stop-color="#2563EB"/>
</linearGradient></defs>
<rect width="640" height="360" fill="url(#g)"/>
<text x="50%" y="47%" text-anchor="middle" font-family="sans-serif" font-size="120" font-weight="700" fill="#ffffff" fill-opacity="0.92">${initials}</text>
<text x="50%" y="70%" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#ffffff" fill-opacity="0.85">${CATEGORY_LABEL[categoria]}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

interface Seed {
  nome: string;
  categoria: CategoryId;
  endereco: string;
}

const SEEDS: Seed[] = [
  { nome: "Restaurante Sabor Inclusivo", categoria: "restaurante", endereco: "Rua Augusta, 1200 - Consolação" },
  { nome: "Cantina da Vila", categoria: "restaurante", endereco: "Rua Harmonia, 340 - Vila Madalena" },
  { nome: "Bistrô Aurora", categoria: "restaurante", endereco: "Alameda Santos, 900 - Jardins" },
  { nome: "Empório Verde", categoria: "restaurante", endereco: "Rua Aspicuelta, 210 - Pinheiros" },
  { nome: "Mercado Central Paulista", categoria: "mercado", endereco: "Av. Paulista, 1500 - Bela Vista" },
  { nome: "Supermercado Bom Preço", categoria: "mercado", endereco: "Rua da Consolação, 2300 - Consolação" },
  { nome: "Mercadinho do Bairro", categoria: "mercado", endereco: "Rua Cardeal Arcoverde, 780 - Pinheiros" },
  { nome: "Farmácia Vida Plena", categoria: "farmacia", endereco: "Rua Oscar Freire, 500 - Jardins" },
  { nome: "Drogaria Bem Estar", categoria: "farmacia", endereco: "Av. Rebouças, 1100 - Pinheiros" },
  { nome: "Farmácia 24h Saúde", categoria: "farmacia", endereco: "Rua Teodoro Sampaio, 1600 - Pinheiros" },
  { nome: "Hospital Santa Clara", categoria: "hospital", endereco: "Rua Maestro Cardim, 700 - Bela Vista" },
  { nome: "Clínica São Rafael", categoria: "hospital", endereco: "Av. Angélica, 1800 - Higienópolis" },
  { nome: "Pronto Atendimento Central", categoria: "hospital", endereco: "Rua Frei Caneca, 400 - Consolação" },
  { nome: "Banco Nacional - Agência Paulista", categoria: "banco", endereco: "Av. Paulista, 2100 - Cerqueira César" },
  { nome: "Banco Popular - Centro", categoria: "banco", endereco: "Rua Barão de Itapetininga, 90 - República" },
  { nome: "Cooperativa de Crédito Unida", categoria: "banco", endereco: "Rua Haddock Lobo, 300 - Jardins" },
  { nome: "Praça das Acácias", categoria: "praca", endereco: "Rua Peixoto Gomide, 1500 - Jardins" },
  { nome: "Praça do Ipê Amarelo", categoria: "praca", endereco: "Rua Fradique Coutinho, 900 - Pinheiros" },
  { nome: "Parque Vila Nova", categoria: "praca", endereco: "Rua Domingos de Morais, 250 - Vila Mariana" },
  { nome: "Escola Municipal Horizonte", categoria: "escola", endereco: "Rua Bela Cintra, 1450 - Consolação" },
  { nome: "Colégio Novo Saber", categoria: "escola", endereco: "Rua Cristiano Viana, 600 - Pinheiros" },
  { nome: "Centro Educacional Aprender", categoria: "escola", endereco: "Av. Brigadeiro Luís Antônio, 2000 - Bela Vista" },
  { nome: "Shopping Estação Sul", categoria: "shopping", endereco: "Av. Santo Amaro, 1200 - Itaim Bibi" },
  { nome: "Shopping Vila Aurora", categoria: "shopping", endereco: "Rua Turiassu, 1400 - Perdizes" },
  { nome: "Galeria Comercial Centro", categoria: "shopping", endereco: "Rua 24 de Maio, 62 - República" },
  { nome: "Academia Corpo Livre", categoria: "academia", endereco: "Rua Pamplona, 1000 - Jardim Paulista" },
  { nome: "Studio Movimento Inclusivo", categoria: "academia", endereco: "Rua Girassol, 500 - Vila Madalena" },
  { nome: "Academia Força Total", categoria: "academia", endereco: "Av. Ibirapuera, 2300 - Moema" },
  { nome: "Posto Estrela Combustíveis", categoria: "posto", endereco: "Av. 23 de Maio, 900 - Paraíso" },
  { nome: "Posto Rota Segura", categoria: "posto", endereco: "Av. Nove de Julho, 3100 - Jardim Paulista" },
];

const DESCRIPTIONS: Record<CategoryId, string> = {
  restaurante: "Ambiente amplo, cardápio variado e equipe treinada para atender pessoas com deficiência.",
  mercado: "Corredores largos, sinalização clara e caixas preferenciais disponíveis.",
  farmacia: "Atendimento rápido com balcão rebaixado e apoio para pessoas com mobilidade reduzida.",
  hospital: "Unidade de saúde com atendimento prioritário e circulação adaptada.",
  banco: "Agência com atendimento preferencial e caixas eletrônicos acessíveis.",
  praca: "Área de lazer com caminhos planos e bancos com espaço para cadeira de rodas.",
  escola: "Instituição de ensino com salas adaptadas e apoio pedagógico inclusivo.",
  shopping: "Centro de compras com elevadores, banheiros familiares e vagas reservadas.",
  academia: "Espaço fitness com equipamentos adaptados e acompanhamento profissional.",
  posto: "Posto de combustível com atendimento no veículo e loja de conveniência acessível.",
};

const buildPlace = (seed: Seed, index: number): Place => {
  const random = seeded(index * 7919 + 13);
  const acessibilidade = FEATURE_KEYS.reduce((acc, key) => {
    acc[key] = random() > 0.38;
    return acc;
  }, {} as AccessibilityFeatures);

  return {
    id: `place-${String(index + 1).padStart(2, "0")}`,
    nome: seed.nome,
    categoria: seed.categoria,
    descricao: DESCRIPTIONS[seed.categoria],
    telefone: `(11) 9${String(4000 + index * 137).slice(0, 4)}-${String(1000 + index * 311).slice(0, 4)}`,
    endereco: seed.endereco,
    latitude: Number((MAP_CENTER[0] + (random() - 0.5) * 0.09).toFixed(6)),
    longitude: Number((MAP_CENTER[1] + (random() - 0.5) * 0.09).toFixed(6)),
    horario: index % 3 === 0 ? "Todos os dias, 08h às 22h" : "Seg a Sáb, 09h às 19h",
    imagem: placeholderImage(seed.nome, seed.categoria),
    nota: Number((3.2 + random() * 1.8).toFixed(1)),
    quantidadeAvaliacoes: 8 + Math.floor(random() * 220),
    acessibilidade,
  };
};

export const MOCK_PLACES: Place[] = SEEDS.map(buildPlace);
