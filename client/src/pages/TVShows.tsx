import Header from "../components/Header";
import MovieGrid from "../components/MovieGrid";
import type { Movie } from "@shared/schema";

const mockTVShows: Movie[] = [
  {
    id: "tv1",
    title: "Crime Detective",
    description: "A gripping detective series with complex mysteries.",
    posterUrl: "/attached_assets/generated_images/Action_movie_poster_fe80df0b.png",
    ageLimit: 16,
    genre: "Crime",
    duration: "45min episodes"
  },
  {
    id: "tv2",
    title: "Supernatural Tales",
    description: "Explore the world of supernatural mysteries and horror.",
    posterUrl: "/attached_assets/generated_images/Horror_movie_poster_430f4250.png",
    ageLimit: 18,
    genre: "Supernatural",
    duration: "1h episodes"
  },
  {
    id: "tv3",
    title: "Love Chronicles",
    description: "A romantic drama series about modern relationships.",
    posterUrl: "/attached_assets/generated_images/Romance_movie_poster_36e5950a.png",
    ageLimit: 14,
    genre: "Romance",
    duration: "50min episodes"
  },
  {
    id: "tv4",
    title: "Space Station Alpha",
    description: "A sci-fi series set in a distant space station.",
    posterUrl: "/attached_assets/generated_images/Sci-fi_movie_poster_42502e89.png",
    ageLimit: 13,
    genre: "Sci-Fi",
    duration: "1h episodes"
  },
  {
    id: "tv5",
    title: "Family Sitcom",
    description: "A hilarious family comedy everyone will love.",
    posterUrl: "/attached_assets/generated_images/Family_movie_poster_6a8d412a.png",
    ageLimit: 8,
    genre: "Comedy",
    duration: "30min episodes"
  }
];

export default function TVShows() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">TV Shows</h1>
            <p className="text-muted-foreground text-lg">
              Binge-watch your favorite series and discover new ones
            </p>
          </div>
          <MovieGrid title="All TV Shows" movies={mockTVShows} />
        </div>
      </main>
    </div>
  );
}