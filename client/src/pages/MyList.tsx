import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Heart, Plus } from "lucide-react";
import { useLocation } from "wouter";

export default function MyList() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">My List</h1>
            <p className="text-muted-foreground text-lg">
              Your saved movies and TV shows
            </p>
          </div>
          
          {/* Empty state */}
          <Card className="max-w-md mx-auto text-center py-12">
            <CardContent className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Your list is empty</h3>
                <p className="text-muted-foreground">
                  Add movies and shows to your list to watch them later
                </p>
              </div>
              <Button className="mt-4" onClick={() => setLocation("/")}>
                <Plus className="h-4 w-4 mr-2" />
                Browse Content
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}