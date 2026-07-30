import { ACCESSIBILITY_FEATURES, PRIORITY_FEATURES } from "@/constants";
import type { DisabilityType, Place } from "@/types";

/** Percentage of accessibility resources available at a place. */
export const accessibilityScore = (place: Place): number => {
  const total = ACCESSIBILITY_FEATURES.length;
  const available = ACCESSIBILITY_FEATURES.filter(
    (feature) => place.acessibilidade[feature.id],
  ).length;
  return Math.round((available / total) * 100);
};

/** How well a place matches the priority resources of a disability profile. */
export const profileMatchScore = (
  place: Place,
  disability: DisabilityType | undefined,
): number => {
  if (!disability) return 0;
  const priorities = PRIORITY_FEATURES[disability];
  if (!priorities?.length) return 0;
  const matches = priorities.filter((feature) => place.acessibilidade[feature]).length;
  return Math.round((matches / priorities.length) * 100);
};

/** Sorts places putting the ones matching the user profile first. */
export const sortByProfilePriority = (
  places: Place[],
  disability: DisabilityType | undefined,
): Place[] =>
  [...places].sort((a, b) => {
    const match = profileMatchScore(b, disability) - profileMatchScore(a, disability);
    if (match !== 0) return match;
    const score = accessibilityScore(b) - accessibilityScore(a);
    if (score !== 0) return score;
    return b.nota - a.nota;
  });

export const accessibilityTone = (score: number): "success" | "warning" | "danger" =>
  score >= 70 ? "success" : score >= 40 ? "warning" : "danger";
