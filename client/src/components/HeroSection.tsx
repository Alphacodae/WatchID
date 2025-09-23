import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@assets/generated_images/Hero_banner_background_a73467cd.png";

export default function HeroSection() {
  const handleWatchTrailer = () => {
    console.log("Watch trailer clicked");
  };

  const handleMoreInfo = () => {
    console.log("More info clicked");
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Featured Movie"
          className="w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-2xl">
        <div className="space-y-6 text-white">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2">
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
              FEATURED
            </span>
            <span className="text-sm text-gray-300">18+ • Action • 2024</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight" data-testid="text-hero-title">
            Shadow Strike
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 max-w-lg leading-relaxed" data-testid="text-hero-description">
            An elite operative must infiltrate a terrorist network to prevent a global catastrophe in this heart-pounding action thriller.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-3"
              onClick={handleWatchTrailer}
              data-testid="button-watch-trailer"
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Trailer
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm font-semibold px-8 py-3"
              onClick={handleMoreInfo}
              data-testid="button-more-info"
            >
              <Info className="h-5 w-5 mr-2" />
              More Info
            </Button>
          </div>

          {/* Additional Info */}
          <div className="flex items-center space-x-6 pt-6 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>HD Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>Face ID Verification</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fade to content indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}