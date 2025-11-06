import Header from "../components/Header";
import MovieGrid from "../components/MovieGrid";
import type { Movie } from "@shared/schema";

const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Action Hero",
    description: "An explosive action thriller with non-stop adventure.",
    posterUrl: "/attached_assets/generated_images/Action_Hero-Movies.png",
    ageLimit: 16,
    genre: "Action",
    duration: "2h 15m"
  },
  {
    id: "2",
    title: "Horror Night",
    description: "A spine-chilling horror experience that will keep you on edge.",
    posterUrl: "/attached_assets/generated_images/Horror_Night- Movies.png",
    ageLimit: 18,
    genre: "Horror",
    duration: "1h 45m"
  },
  {
    id: "3",
    title: "Love Story",
    description: "A heartwarming romantic tale of love conquering all.",
    posterUrl: "/attached_assets/generated_images/Love_Story-Movies.png",
    ageLimit: 13,
    genre: "Romance",
    duration: "2h 5m"
  },
  {
    id: "4",
    title: "Space Odyssey",
    description: "An epic sci-fi journey through the cosmos.",
    posterUrl: "/attached_assets/generated_images/Space_Odyssey-Movies.png",
    ageLimit: 12,
    genre: "Sci-Fi",
    duration: "2h 30m"
  },
  {
    id: "5",
    title: "Family Adventure",
    description: "A fun-filled adventure the whole family can enjoy.",
    posterUrl: "/attached_assets/generated_images/Family-Adventure-Movies.png",
    ageLimit: 8,
    genre: "Family",
    duration: "1h 55m"
  }
];

export default function Movies() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Movies</h1>
            <p className="text-muted-foreground text-lg">
              Discover thousands of movies across all genres
            </p>
          </div>
          <MovieGrid title="All Movies" movies={mockMovies} />
        </div>
      </main>
    </div>
  );
}