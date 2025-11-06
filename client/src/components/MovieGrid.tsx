import MovieCard from "./MovieCard";
import type { Movie } from "@shared/schema";

interface MovieGridProps {
  title: string;
  movies: Movie[];
  onVerifyAge: (movie: Movie) => void; // Required prop from parent (Home.tsx)
}

export default function MovieGrid({ title, movies, onVerifyAge }: MovieGridProps) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2
          className="text-2xl font-semibold mb-6"
          data-testid={`text-section-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {title}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onVerifyAge={onVerifyAge} // Pass parent's handler directly
            />
          ))}
        </div>
      </div>
    </section>
  );
}