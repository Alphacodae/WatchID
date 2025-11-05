import { useState } from "react";
import MovieCard from "./MovieCard";
import FacialRecognitionOverlay from "./FacialRecognitionOverlay";
import type { Movie } from "@shared/schema";

interface MovieGridProps {
  title: string;
  movies: Movie[];
}

export default function MovieGrid({ title, movies }: MovieGridProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  const handleVerifyAge = (movie: Movie) => {
    console.log("Opening verification for:", movie.title);
    setSelectedMovie(movie);
    setIsVerificationOpen(true);
  };

  const handleCloseVerification = () => {
    setIsVerificationOpen(false);
    setSelectedMovie(null);
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6" data-testid={`text-section-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onVerifyAge={handleVerifyAge}
            />
          ))}
        </div>
      </div>

      <FacialRecognitionOverlay
        isOpen={isVerificationOpen}
        onClose={handleCloseVerification}
        title="Age Verification Required"
        subtitle={`${selectedMovie?.title} • ${selectedMovie?.ageLimit}+ Rating Required`}
        minAgeRequired={selectedMovie?.ageLimit || 18}
        onVerificationSuccess={(detectedAge) => {
          console.log(`Access granted: Age ${detectedAge} verified for ${selectedMovie?.title}`);
          // Handle successful verification - could redirect to movie player
          handleCloseVerification();
        }}
        onVerificationDenied={(detectedAge, requiredAge) => {
          console.log(`Access denied: Age ${detectedAge} insufficient for ${selectedMovie?.title} (requires ${requiredAge}+)`);
          // Handle denied verification - could show alternative content suggestions
        }}
        showSimulationControls={true}
      />
    </section>
  );
}