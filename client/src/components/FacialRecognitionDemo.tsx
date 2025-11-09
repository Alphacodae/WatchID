import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FacialRecognitionOverlay from "./FacialRecognitionOverlay";
import VideoPlayer from "./VideoPlayer";
import { Eye, Play } from "lucide-react";

export default function FacialRecognitionDemo() {
  const [overlayConfig, setOverlayConfig] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
    minAge: 18,
    scenario: ""
  });
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);

  const openOverlay = (scenario: string, title: string, subtitle: string, minAge = 18) => {
    setOverlayConfig({
      isOpen: true,
      title,
      subtitle,
      minAge,
      scenario
    });
  };

  const closeOverlay = () => {
    setOverlayConfig(prev => ({ ...prev, isOpen: false }));
  };

  const startVideo = () => {
    setOverlayConfig(prev => ({ ...prev, isOpen: false }));
    setIsVideoPlayerOpen(true);
  };

  const closeVideo = () => {
    setIsVideoPlayerOpen(false);
  };

  const handleSuccess = (detectedAge: number) => {
    console.log(`Verification successful for ${overlayConfig.scenario}: Age ${detectedAge}`);
    startVideo();
  };

  const handleDenied = (detectedAge: number, requiredAge: number) => {
    console.log(`Verification denied for ${overlayConfig.scenario}: Age ${detectedAge} < ${requiredAge}`);
    closeOverlay();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Facial Recognition Overlay Demo</h1>
          <p className="text-muted-foreground text-lg">
            Test the overlay component with different scenarios and age requirements
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-red-500" />
                R-Rated Movie
              </CardTitle>
              <CardDescription>
                Adult content requiring 18+ verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => openOverlay(
                  "R-Rated Movie",
                  "Adult Content Verification", 
                  "This movie contains mature themes • 18+ Required",
                  18
                )}
                className="w-full"
              >
                <Eye className="h-4 w-4 mr-2" />
                Verify Age (18+)
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-orange-500" />
                Teen Movie
              </CardTitle>
              <CardDescription>
                Content suitable for teens 13+
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => openOverlay(
                  "Teen Movie",
                  "Teen Content Verification", 
                  "Age-appropriate content • 13+ Required",
                  13
                )}
                className="w-full"
                variant="secondary"
              >
                <Eye className="h-4 w-4 mr-2" />
                Verify Age (13+)
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-500" />
                Account Access
              </CardTitle>
              <CardDescription>
                Identity verification for account access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => openOverlay(
                  "Account Access",
                  "Identity Verification", 
                  "Secure account access • Face verification required",
                  0
                )}
                className="w-full"
                variant="outline"
              >
                <Eye className="h-4 w-4 mr-2" />
                Verify Identity
              </Button>
            </CardContent>
          </Card>
        </div>

        <FacialRecognitionOverlay
          isOpen={overlayConfig.isOpen}
          onClose={closeOverlay}
          title={overlayConfig.title}
          subtitle={overlayConfig.subtitle}
          minAgeRequired={overlayConfig.minAge}
          onVerificationSuccess={handleSuccess}
          onVerificationDenied={handleDenied}
          showSimulationControls={true}
        />

        <VideoPlayer
          isOpen={isVideoPlayerOpen}
          onClose={closeVideo}
          title={`Demo: ${overlayConfig.scenario}`}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        />
      </div>
    </div>
  );
}