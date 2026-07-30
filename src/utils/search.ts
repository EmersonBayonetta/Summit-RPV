import { CATEGORY_LABEL } from "@/constants";
import type { CategoryId, Place } from "@/types";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/** Real-time search across name, category, address and description. */
export const searchPlaces = (places: Place[], term: string): Place[] => {
  const query = normalize(term.trim());
  if (!query) return places;
  return places.filter((place) => {
    const haystack = normalize(
      [place.nome, CATEGORY_LABEL[place.categoria], place.endereco, place.descricao].join(" "),
    );
    return haystack.includes(query);
  });
};

export const filterByCategory = (places: Place[], category: CategoryId | "todos"): Place[] =>
  category === "todos" ? places : places.filter((place) => place.categoria === category);
