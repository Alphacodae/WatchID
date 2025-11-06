export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  description?: string;
  duration?: string;
  genre?: string;
  ageLimit?: number;
}
