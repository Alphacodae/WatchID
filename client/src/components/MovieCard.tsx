import { useState } from "react";
import { Eye, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Movie } from "@shared/schema";

interface MovieCardProps {
  movie: Movie;
  onVerifyAge: (movie: Movie) => void;
}

export default function MovieCard({ movie, onVerifyAge }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleVerifyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Eye button clicked for movie:", movie.title);
    onVerifyAge(movie);
  };

  const handleWatchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Watch button clicked for movie:", movie.title);
  };

  return (
    <Card
      className="group relative overflow-hidden bg-transparent border-0 cursor-pointer transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-movie-${movie.id}`}
    >
      {/* Movie Poster */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          data-testid={`img-poster-${movie.id}`}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Age Rating Badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 bg-black/60 text-white backdrop-blur-sm"
          data-testid={`badge-rating-${movie.id}`}
        >
          {movie.ageLimit}+
        </Badge>

        {/* Eye Button - Face Verification */}
        <Button
          size="icon"
          variant="outline"
          className="absolute top-2 right-2 bg-black/60 border-white/20 hover:bg-black/80 backdrop-blur-sm"
          onClick={handleVerifyClick}
          data-testid={`button-verify-${movie.id}`}
        >
          <Eye className="h-4 w-4 text-white" />
        </Button>

        {/* Hover Overlay Content */}
        {isHovered && (
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
            <h3 className="font-semibold text-lg mb-1" data-testid={`text-title-${movie.id}`}>
              {movie.title}
            </h3>
            <p className="text-sm text-gray-300 mb-2 line-clamp-2" data-testid={`text-description-${movie.id}`}>
              {movie.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span data-testid={`text-duration-${movie.id}`}>{movie.duration}</span>
                <span>•</span>
                <span data-testid={`text-genre-${movie.id}`}>{movie.genre}</span>
              </div>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90"
                onClick={handleWatchClick}
                data-testid={`button-watch-${movie.id}`}
              >
                <Play className="h-3 w-3 mr-1" />
                Watch
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}