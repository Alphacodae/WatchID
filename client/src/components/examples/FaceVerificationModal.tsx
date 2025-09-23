import { useState } from "react"
import FaceVerificationModal from '../FaceVerificationModal'
import { Button } from "@/components/ui/button"
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

export default function FaceVerificationModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-8">
      <Button onClick={() => setIsOpen(true)}>Open Face Verification</Button>
      <FaceVerificationModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        movie={mockMovie}
      />
    </div>
  )
}