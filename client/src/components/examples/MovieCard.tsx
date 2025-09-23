import MovieCard from '../MovieCard'
import actionPoster from "@assets/generated_images/Action_movie_poster_fe80df0b.png"

//todo: remove mock functionality
const mockMovie = {
  id: "1",
  title: "Shadow Strike",
  description: "An elite operative must infiltrate a terrorist network to prevent a global catastrophe in this heart-pounding action thriller.",
  posterUrl: actionPoster,
  ageLimit: 18,
  genre: "Action",
  duration: "2h 15m"
}

export default function MovieCardExample() {
  const handleVerifyAge = (movie: any) => {
    console.log("Verify age for:", movie.title)
  }

  return (
    <div className="w-64">
      <MovieCard movie={mockMovie} onVerifyAge={handleVerifyAge} />
    </div>
  )
}