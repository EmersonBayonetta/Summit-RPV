import { STORAGE_KEYS } from "@/constants";
import { storage } from "@/storage/storage";
import type { Review } from "@/types";
import { createId } from "@/utils/id";

const read = (): Review[] => storage.read<Review[]>(STORAGE_KEYS.reviews, []);
const write = (reviews: Review[]) => storage.write(STORAGE_KEYS.reviews, reviews);

export interface CreateReviewInput {
  placeId: string;
  userId: string;
  userName: string;
  nota: number;
  comentario: string;
}

export const reviewService = {
  list: (): Review[] => read(),

  listByPlace: (placeId: string): Review[] =>
    read()
      .filter((review) => review.placeId === placeId)
      .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm)),

  listByUser: (userId: string): Review[] => read().filter((review) => review.userId === userId),

  create: (input: CreateReviewInput): Review[] => {
    const review: Review = {
      id: createId("review"),
      ...input,
      comentario: input.comentario.trim(),
      criadoEm: new Date().toISOString(),
    };
    const next = [...read(), review];
    write(next);
    return next;
  },

  remove: (reviewId: string): Review[] => {
    const next = read().filter((review) => review.id !== reviewId);
    write(next);
    return next;
  },
};
