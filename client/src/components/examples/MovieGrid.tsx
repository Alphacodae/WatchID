import MovieGrid from '../MovieGrid'
import actionPoster from "@assets/generated_images/Action_movie_poster_fe80df0b.png"
import romancePoster from "@assets/generated_images/Romance_movie_poster_36e5950a.png"
import scifiPoster from "@assets/generated_images/Sci-fi_movie_poster_42502e89.png"
import horrorPoster from "@assets/generated_images/Horror_movie_poster_430f4250.png"
import familyPoster from "@assets/generated_images/Family_movie_poster_6a8d412a.png"

//todo: remove mock functionality
const mockMovies = [
  {
    id: "1",
    title: "Shadow Strike",
    description: "An elite operative must infiltrate a terrorist network to prevent a global catastrophe.",
    posterUrl: actionPoster,
    ageLimit: 18,
    genre: "Action",
    duration: "2h 15m"
  },
  {
    id: "2", 
    title: "Eternal Hearts",
    description: "A timeless love story that spans decades and continents.",
    posterUrl: romancePoster,
    ageLimit: 13,
    genre: "Romance",
    duration: "1h 52m"
  },
  {
    id: "3",
    title: "Neo Matrix",
    description: "In a dystopian future, reality isn't what it seems.",
    posterUrl: scifiPoster,
    ageLimit: 16,
    genre: "Sci-Fi",
    duration: "2h 28m"
  },
  {
    id: "4",
    title: "Dark Whispers",
    description: "A haunting tale of supernatural terror in a small town.",
    posterUrl: horrorPoster,
    ageLimit: 18,
    genre: "Horror",
    duration: "1h 38m"
  },
  {
    id: "5",
    title: "Magic Kingdom",
    description: "A magical adventure for the whole family to enjoy.",
    posterUrl: familyPoster,
    ageLimit: 0,
    genre: "Family",
    duration: "1h 45m"
  },
  {
    id: "6",
    title: "Shadow Strike 2",
    description: "The sequel to the blockbuster action thriller.",
    posterUrl: actionPoster,
    ageLimit: 18,
    genre: "Action", 
    duration: "2h 32m"
  }
]

export default function MovieGridExample() {
  return (
    <div className="bg-background min-h-screen">
      <MovieGrid title="Trending Now" movies={mockMovies} />
    </div>
  )
}