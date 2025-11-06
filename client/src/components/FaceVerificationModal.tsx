import { useState, useRef, useEffect } from "react";
import { X, Camera, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import type { Movie } from "@shared/schema";

interface FaceVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
}

type VerificationStep = "camera" | "processing" | "result";
type VerificationResult = "success" | "denied" | null;

export default function FaceVerificationModal({
  isOpen,
  onClose,
  movie,
}: FaceVerificationModalProps) {
  const [step, setStep] = useState<VerificationStep>("camera");
  const [result, setResult] = useState<VerificationResult>(null);
  const [progress, setProgress] = useState(0);
  const [simulatedAge, setSimulatedAge] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Initialize camera when modal opens
  useEffect(() => {
    if (isOpen) {
      initializeCamera();
      setStep("camera");
      setResult(null);
      setProgress(0);
      setSimulatedAge(null);
    } else {
      cleanup();
    }

    return cleanup;
  }, [isOpen]);

  const initializeCamera = async () => {
    try {
      // Simulate camera access - in real app this would be actual getUserMedia
      console.log("Requesting camera access...");
      // const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      // setStream(mediaStream);
      // if (videoRef.current) {
      //   videoRef.current.srcObject = mediaStream;
      // }
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  };

  const cleanup = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startVerification = () => {
    console.log("Starting face verification...");
    setStep("processing");
    setProgress(0);

    // Simulate AI processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate age detection result
          const detectedAge = simulatedAge || Math.floor(Math.random() * 40) + 15;
          const isAccessGranted = detectedAge >= (movie?.ageLimit || 18);
          
          setResult(isAccessGranted ? "success" : "denied");
          setStep("result");
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
  };

  const simulateAge = (age: number) => {
    console.log("Simulating age:", age);
    setSimulatedAge(age);
    startVerification();
  };

  const resetVerification = () => {
    setStep("camera");
    setResult(null);
    setProgress(0);
    setSimulatedAge(null);
  };

  const handleClose = () => {
    cleanup();
    onClose();
    // Reset state after a brief delay to prevent flickering
    setTimeout(() => {
      setStep("camera");
      setResult(null);
      setProgress(0);
      setSimulatedAge(null);
    }, 300);
  };

  if (!movie) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden" data-testid="modal-face-verification">
        <div className="bg-gradient-to-br from-background via-background to-muted/20">
          {/* Header */}
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-semibold" data-testid="text-verification-title">
                  Age-Specific Face ID Verification
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {movie.title} • {movie.ageLimit}+ Rating Required
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleClose}
                data-testid="button-close-modal"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="px-6 pb-6">
            {step === "camera" && (
              <div className="space-y-6">
                {/* Camera Preview */}
                <div className="relative bg-muted/50 rounded-lg overflow-hidden aspect-video max-w-md mx-auto">
                  {/* Simulated camera feed */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">Camera Preview</p>
                      <p className="text-xs text-muted-foreground/70">Simulated for demo purposes</p>
                    </div>
                  </div>
                  
                  {/* Face Detection Oval */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-48 h-64 border-4 border-green-500 rounded-full opacity-80"
                      style={{
                        background: 'transparent',
                        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
                      }}
                    />
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-center space-y-4">
                  <h3 className="font-medium" data-testid="text-selfie-instruction">Take a selfie</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Adjust your position to place your face into oval frame and press Start capture
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <Button
                      onClick={startVerification}
                      className="min-w-32"
                      data-testid="button-start-capture"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Start Capture
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleClose}
                      data-testid="button-cancel-verification"
                    >
                      Cancel
                    </Button>
                  </div>

                  {/* Simulation Buttons */}
                  <div className="pt-4 border-t border-border/40">
                    <p className="text-xs text-muted-foreground mb-3">Quick Simulation (Demo Only)</p>
                    <div className="flex gap-2 justify-center flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => simulateAge(10)}
                        data-testid="button-simulate-child"
                      >
                        Child (10)
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => simulateAge(15)}
                        data-testid="button-simulate-teen"
                      >
                        Teen (15)
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => simulateAge(25)}
                        data-testid="button-simulate-adult"
                      >
                        Adult (25)
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === "processing" && (
              <div className="text-center space-y-6 py-8">
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium" data-testid="text-processing-title">Processing Face Recognition</h3>
                  <p className="text-sm text-muted-foreground">
                    Analyzing facial features and estimating age...
                  </p>
                  <Progress value={progress} className="w-64 mx-auto" />
                  <p className="text-xs text-muted-foreground">{Math.round(progress)}% complete</p>
                </div>
              </div>
            )}

            {step === "result" && (
              <div className="text-center space-y-6 py-8">
                {result === "success" ? (
                  <div className="space-y-4">
                    <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-green-600 dark:text-green-400" data-testid="text-access-granted">
                        Access Granted
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        You meet the age requirement for this content
                      </p>
                      {simulatedAge && (
                        <p className="text-xs text-muted-foreground">
                          Detected age: {simulatedAge} years (Required: {movie.ageLimit}+)
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button data-testid="button-watch-now">Watch Now</Button>
                      <Button variant="outline" onClick={handleClose} data-testid="button-close-success">
                        Close
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-24 h-24 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-red-600 dark:text-red-400" data-testid="text-access-denied">
                        Access Denied
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        You do not meet the age requirement for this content
                      </p>
                      {simulatedAge && (
                        <p className="text-xs text-muted-foreground">
                          Detected age: {simulatedAge} years (Required: {movie.ageLimit}+)
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={resetVerification} data-testid="button-try-again">
                        Try Again
                      </Button>
                      <Button variant="outline" onClick={handleClose} data-testid="button-close-denied">
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}