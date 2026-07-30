import {
  Utensils,
  ShoppingCart,
  Pill,
  Stethoscope,
  Landmark,
  Trees,
  GraduationCap,
  Store,
  Dumbbell,
  Fuel,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

import type {
  AccessibilityFeatureId,
  CategoryId,
  DisabilityType,
} from "@/types";

export const APP_NAME = "AccessMap";
export const APP_SLOGAN = "Acessibilidade começa pela informação.";

export interface CategoryOption {
  id: CategoryId | "todos";
  label: string;
  icon: LucideIcon;
}

export const CATEGORIES: CategoryOption[] = [
  { id: "todos", label: "Todos", icon: LayoutGrid },
  { id: "restaurante", label: "Restaurantes", icon: Utensils },
  { id: "mercado", label: "Mercados", icon: ShoppingCart },
  { id: "farmacia", label: "Farmácias", icon: Pill },
  { id: "hospital", label: "Hospitais", icon: Stethoscope },
  { id: "banco", label: "Bancos", icon: Landmark },
  { id: "praca", label: "Praças", icon: Trees },
  { id: "escola", label: "Escolas", icon: GraduationCap },
  { id: "shopping", label: "Shoppings", icon: Store },
  { id: "academia", label: "Academias", icon: Dumbbell },
  { id: "posto", label: "Postos", icon: Fuel },
];

export const CATEGORY_LABEL: Record<CategoryId, string> = {
  restaurante: "Restaurante",
  mercado: "Mercado",
  farmacia: "Farmácia",
  hospital: "Hospital",
  banco: "Banco",
  praca: "Praça",
  escola: "Escola",
  shopping: "Shopping",
  academia: "Academia",
  posto: "Posto",
};

export const ACCESSIBILITY_FEATURES: {
  id: AccessibilityFeatureId;
  label: string;
}[] = [
  { id: "rampa", label: "Rampa de acesso" },
  { id: "elevador", label: "Elevador" },
  { id: "banheiroAdaptado", label: "Banheiro adaptado" },
  { id: "pisoTatil", label: "Piso tátil" },
  { id: "braille", label: "Sinalização em braille" },
  { id: "libras", label: "Atendimento em Libras" },
  { id: "portaLarga", label: "Porta larga" },
  { id: "corrimao", label: "Corrimão" },
  { id: "vagaEspecial", label: "Vaga especial" },
  { id: "entradaSemDegraus", label: "Entrada sem degraus" },
];

export const ACCESSIBILITY_LABEL = ACCESSIBILITY_FEATURES.reduce(
  (acc, feature) => ({ ...acc, [feature.id]: feature.label }),
  {} as Record<AccessibilityFeatureId, string>,
);

export const DISABILITY_OPTIONS: { id: DisabilityType; label: string }[] = [
  { id: "cadeirante", label: "Cadeirante" },
  { id: "baixa-mobilidade", label: "Baixa mobilidade" },
  { id: "deficiencia-visual", label: "Deficiência visual" },
  { id: "cego", label: "Pessoa cega" },
  { id: "surdo", label: "Pessoa surda" },
  { id: "tea", label: "Pessoa com TEA" },
  { id: "idoso", label: "Pessoa idosa" },
];

export const DISABILITY_LABEL = DISABILITY_OPTIONS.reduce(
  (acc, option) => ({ ...acc, [option.id]: option.label }),
  {} as Record<DisabilityType, string>,
);

/** Features prioritised in the list for each disability profile. */
export const PRIORITY_FEATURES: Record<DisabilityType, AccessibilityFeatureId[]> = {
  cadeirante: ["rampa", "banheiroAdaptado", "portaLarga", "entradaSemDegraus"],
  "baixa-mobilidade": ["rampa", "elevador", "corrimao", "entradaSemDegraus"],
  "deficiencia-visual": ["pisoTatil", "braille", "corrimao"],
  cego: ["pisoTatil", "braille"],
  surdo: ["libras"],
  tea: ["libras", "entradaSemDegraus"],
  idoso: ["corrimao", "elevador", "banheiroAdaptado", "vagaEspecial"],
};

/** Centro de Cataguases - MG (Praça Santa Rita). */
export const MAP_CENTER: [number, number] = [-21.3892, -42.6969];
export const MAP_CITY = "Cataguases - MG";

export const STORAGE_KEYS = {
  users: "accessmap:users",
  session: "accessmap:session",
  favorites: "accessmap:favorites",
  reviews: "accessmap:reviews",
  settings: "accessmap:settings",
  places: "accessmap:places:cataguases",
} as const;
