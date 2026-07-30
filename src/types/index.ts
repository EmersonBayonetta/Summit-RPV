export type DisabilityType =
  | "cadeirante"
  | "baixa-mobilidade"
  | "deficiencia-visual"
  | "cego"
  | "surdo"
  | "tea"
  | "idoso";

export type CategoryId =
  | "restaurante"
  | "mercado"
  | "farmacia"
  | "hospital"
  | "banco"
  | "praca"
  | "escola"
  | "shopping"
  | "academia"
  | "posto";

export type AccessibilityFeatureId =
  | "rampa"
  | "elevador"
  | "banheiroAdaptado"
  | "pisoTatil"
  | "braille"
  | "libras"
  | "portaLarga"
  | "corrimao"
  | "vagaEspecial"
  | "entradaSemDegraus";

export type AccessibilityFeatures = Record<AccessibilityFeatureId, boolean>;

export interface Place {
  id: string;
  nome: string;
  categoria: CategoryId;
  descricao: string;
  telefone: string;
  endereco: string;
  latitude: number;
  longitude: number;
  horario: string;
  imagem: string;
  nota: number;
  quantidadeAvaliacoes: number;
  acessibilidade: AccessibilityFeatures;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
  deficiencia: DisabilityType;
  criadoEm: string;
}

export type PublicUser = Omit<User, "senha">;

export interface Review {
  id: string;
  placeId: string;
  userId: string;
  userName: string;
  nota: number;
  comentario: string;
  criadoEm: string;
}

export interface AppSettings {
  altoContraste: boolean;
  fonteGrande: boolean;
  leituraPorVoz: boolean;
  vibracao: boolean;
}

export interface Session {
  userId: string;
  criadoEm: string;
}
