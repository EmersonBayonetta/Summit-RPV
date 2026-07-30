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
  { nome: "Restaurante Sabor Inclusivo", categoria: "restaurante", endereco: "Rua Major Vieira, 240 - Centro" },
  { nome: "Cantina da Vila Teresa", categoria: "restaurante", endereco: "Rua Coronel João Duarte, 118 - Vila Teresa" },
  { nome: "Bistrô Rio Pomba", categoria: "restaurante", endereco: "Av. Astolfo Dutra, 530 - Centro" },
  { nome: "Empório Verde Granjaria", categoria: "restaurante", endereco: "Rua Sebastião Patrus de Sousa, 75 - Granjaria" },
  { nome: "Mercado Central de Cataguases", categoria: "mercado", endereco: "Praça Santa Rita, 40 - Centro" },
  { nome: "Supermercado Bom Preço", categoria: "mercado", endereco: "Av. Vinte de Setembro, 810 - Taquara Preta" },
  { nome: "Mercadinho do Paraíso", categoria: "mercado", endereco: "Rua Sete de Setembro, 260 - Paraíso" },
  { nome: "Farmácia Vida Plena", categoria: "farmacia", endereco: "Rua Coronel Vieira, 305 - Centro" },
  { nome: "Drogaria Bem Estar", categoria: "farmacia", endereco: "Av. Astolfo Dutra, 1120 - Vila Domingos Lopes" },
  { nome: "Farmácia 24h Saúde", categoria: "farmacia", endereco: "Rua Barão de Camargos, 88 - Centro" },
  { nome: "Hospital Santa Clara", categoria: "hospital", endereco: "Rua Santa Clara, 210 - Centro" },
  { nome: "Clínica São Rafael", categoria: "hospital", endereco: "Rua Padre José Coelho, 460 - Vila Reis" },
  { nome: "Pronto Atendimento Municipal", categoria: "hospital", endereco: "Av. Governador Valadares, 900 - Aloísio Toledo" },
  { nome: "Banco Nacional - Agência Centro", categoria: "banco", endereco: "Praça Rui Barbosa, 55 - Centro" },
  { nome: "Banco Popular - Cataguases", categoria: "banco", endereco: "Rua Major Vieira, 610 - Centro" },
  { nome: "Cooperativa de Crédito Unida", categoria: "banco", endereco: "Rua Cel. Vieira, 720 - Centro" },
  { nome: "Praça Santa Rita", categoria: "praca", endereco: "Praça Santa Rita, s/n - Centro" },
  { nome: "Praça Rui Barbosa", categoria: "praca", endereco: "Praça Rui Barbosa, s/n - Centro" },
  { nome: "Parque Municipal Vila Minalda", categoria: "praca", endereco: "Rua das Palmeiras, 130 - Vila Minalda" },
  { nome: "Escola Municipal Horizonte", categoria: "escola", endereco: "Rua Sinhô Barcelos, 150 - Vila Teresa" },
  { nome: "Colégio Novo Saber", categoria: "escola", endereco: "Rua Dr. Rezende, 480 - Centro" },
  { nome: "Centro Educacional Aprender", categoria: "escola", endereco: "Av. Vinte de Setembro, 1450 - Taquara Preta" },
  { nome: "Shopping Estação Cataguases", categoria: "shopping", endereco: "Av. Astolfo Dutra, 1700 - Vila Resende" },
  { nome: "Galeria Comercial Centro", categoria: "shopping", endereco: "Rua Major Vieira, 390 - Centro" },
  { nome: "Centro de Compras Granjaria", categoria: "shopping", endereco: "Rua Ciro Villaça, 210 - Granjaria" },
  { nome: "Academia Corpo Livre", categoria: "academia", endereco: "Rua Antônio Baptista, 95 - Vila Reis" },
  { nome: "Studio Movimento Inclusivo", categoria: "academia", endereco: "Rua Anfilófio Coelho, 340 - Centro" },
  { nome: "Academia Força Total", categoria: "academia", endereco: "Av. Governador Valadares, 620 - Aloísio Toledo" },
  { nome: "Posto Estrela Combustíveis", categoria: "posto", endereco: "Av. Astolfo Dutra, 2100 - Vila Domingos Lopes" },
  { nome: "Posto Rota Segura", categoria: "posto", endereco: "Rod. BR-120, km 3 - Saída para Leopoldina" },
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
    telefone: `(32) 9${String(4000 + index * 137).slice(0, 4)}-${String(1000 + index * 311).slice(0, 4)}`,
    endereco: seed.endereco,
    latitude: Number((MAP_CENTER[0] + (random() - 0.5) * 0.032).toFixed(6)),
    longitude: Number((MAP_CENTER[1] + (random() - 0.5) * 0.038).toFixed(6)),
    horario: index % 3 === 0 ? "Todos os dias, 08h às 22h" : "Seg a Sáb, 09h às 19h",
    imagem: placeholderImage(seed.nome, seed.categoria),
    nota: Number((3.2 + random() * 1.8).toFixed(1)),
    quantidadeAvaliacoes: 8 + Math.floor(random() * 220),
    acessibilidade,
  };
};

export const MOCK_PLACES: Place[] = SEEDS.map(buildPlace);
