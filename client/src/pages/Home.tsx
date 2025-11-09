import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MovieGrid from "@/components/MovieGrid";
import VideoPlayer from "@/components/VideoPlayer";
import type { Movie } from "@shared/schema";
import FacialRecognitionOverlay from "@/components/FacialRecognitionOverlay"; 
import actionPoster from "@assets/generated_images/Action_movie_poster_fe80df0b.png"
import romancePoster from "@assets/generated_images/Romance_movie_poster_36e5950a.png"
import scifiPoster from "@assets/generated_images/Sci-fi_movie_poster_42502e89.png"
import horrorPoster from "@assets/generated_images/Horror_movie_poster_430f4250.png"
import familyPoster from "@assets/generated_images/Family_movie_poster_6a8d412a.png"

//todo: remove mock functionality
const trendingMovies: Movie[] = [
  {
    id: "1",
    title: "Shadow Strike",
    description: "An elite operative must infiltrate a terrorist network to prevent a global catastrophe in this heart-pounding action thriller.",
    posterUrl: actionPoster,
    ageLimit: 18,
    genre: "Action",
    duration: "2h 15m"
  },
  {
    id: "2", 
    title: "Eternal Hearts",
    description: "A timeless love story that spans decades and continents, exploring the depths of human connection.",
    posterUrl: romancePoster,
    ageLimit: 13,
    genre: "Romance",
    duration: "1h 52m"
  },
  {
    id: "3",
    title: "Neo Matrix",
    description: "In a dystopian future where reality isn't what it seems, one person must choose between truth and illusion.",
    posterUrl: scifiPoster,
    ageLimit: 16,
    genre: "Sci-Fi",
    duration: "2h 28m"
  },
  {
    id: "4",
    title: "Dark Whispers",
    description: "A haunting tale of supernatural terror that grips a small town in an unbreakable nightmare.",
    posterUrl: horrorPoster,
    ageLimit: 18,
    genre: "Horror",
    duration: "1h 38m"
  },
  {
    id: "5",
    title: "Magic Kingdom",
    description: "Join a magical adventure filled with wonder, friendship, and enchanting creatures for the whole family.",
    posterUrl: familyPoster,
    ageLimit: 0,
    genre: "Family",
    duration: "1h 45m"
  },
  {
    id: "6",
    title: "Shadow Strike 2",
    description: "The explosive sequel to the blockbuster action thriller brings even more intense action and suspense.",
    posterUrl: actionPoster,
    ageLimit: 18,
    genre: "Action", 
    duration: "2h 32m"
  }
];

const newReleases: Movie[] = [
  {
    id: "7",
    title: "Quantum Realm",
    description: "Scientists discover a parallel dimension with consequences beyond imagination.",
    posterUrl: scifiPoster,
    ageLimit: 13,
    genre: "Sci-Fi",
    duration: "2h 5m"
  },
  {
    id: "8",
    title: "Forest Dreams", 
    description: "A heartwarming family adventure in the magical wilderness.",
    posterUrl: familyPoster,
    ageLimit: 0,
    genre: "Family",
    duration: "1h 35m"
  },
  {
    id: "9",
    title: "Midnight Romance",
    description: "Love blooms in the most unexpected places in this enchanting romantic drama.",
    posterUrl: romancePoster,
    ageLimit: 16,
    genre: "Romance",
    duration: "1h 47m"
  }
];

export default function Home() {
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);

  const handleVerifyAge = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsVerificationOpen(true);
  };

  const closeVerification = () => {
    setIsVerificationOpen(false);
    setSelectedMovie(null);
  };

  const startVideo = () => {
    setIsVerificationOpen(false);
    setIsVideoPlayerOpen(true);
  };

  const closeVideo = () => {
    setIsVideoPlayerOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Add top padding to account for fixed header */}
      <div className="pt-16">
        <HeroSection />
        
        <div className="space-y-12 pb-12">
          <MovieGrid 
          title="Trending Now" 
          movies={trendingMovies} 
          onVerifyAge={handleVerifyAge} 
          />
          <MovieGrid 
            title="New Releases" 
            movies={newReleases} 
            onVerifyAge={handleVerifyAge} 
          />
        </div>
      </div>

      {/* Add the FacialRecognitionOverlay here */}
      {selectedMovie && (
        <FacialRecognitionOverlay
          isOpen={isVerificationOpen}
          onClose={closeVerification}
          title={`Age Verification for ${selectedMovie.title}`}
          subtitle={`This content is rated ${selectedMovie.ageLimit}+. Position your face for verification.`}
          minAgeRequired={selectedMovie.ageLimit}
          onVerificationSuccess={(detectedAge) => {
            console.log(`Verification successful for ${selectedMovie.title}. Detected age: ${detectedAge}. Playing movie...`);
            startVideo();
          }}
          onVerificationDenied={(detectedAge, required) => {
            console.log(`Verification denied for ${selectedMovie.title}. Detected age: ${detectedAge} (required: ${required}).`);
            closeVerification();
          }}
          showSimulationControls={true} // Set to false for production; true for testing
        />
      )}

      {/* Video Player */}
      {selectedMovie && (
        <VideoPlayer
          isOpen={isVideoPlayerOpen}
          onClose={closeVideo}
          title={selectedMovie.title}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        />
      )}
    </div>
  );
}