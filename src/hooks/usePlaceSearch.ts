import { useMemo, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { usePlaces } from "@/contexts/PlacesContext";
import type { CategoryId } from "@/types";
import { sortByProfilePriority } from "@/utils/accessibility";
import { filterByCategory, searchPlaces } from "@/utils/search";

/** Search + category filter + profile-based prioritisation. */
export function usePlaceSearch() {
  const { places } = usePlaces();
  const { user } = useAuth();
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState<CategoryId | "todos">("todos");

  const results = useMemo(() => {
    const filtered = filterByCategory(searchPlaces(places, term), category);
    return sortByProfilePriority(filtered, user?.deficiencia);
  }, [places, term, category, user?.deficiencia]);

  return {
    term,
    setTerm,
    category,
    setCategory,
    results,
    clear: () => setTerm(""),
  };
}
