import { useState } from "react";
import { LogOut, Edit3, Save, X, Settings, Film, Users, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Movie } from "@shared/schema";
import actionPoster from "@assets/generated_images/Action_movie_poster_fe80df0b.png"
import romancePoster from "@assets/generated_images/Romance_movie_poster_36e5950a.png"
import scifiPoster from "@assets/generated_images/Sci-fi_movie_poster_42502e89.png"
import horrorPoster from "@assets/generated_images/Horror_movie_poster_430f4250.png"
import familyPoster from "@assets/generated_images/Family_movie_poster_6a8d412a.png"

interface AdminDashboardProps {
  onLogout: () => void;
}

//todo: remove mock functionality
const initialMovies: Movie[] = [
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
  }
];

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingAge, setEditingAge] = useState<number>(0);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const handleEditClick = (movie: Movie) => {
    console.log("Editing movie:", movie.title);
    setEditingId(movie.id);
    setEditingAge(movie.ageLimit);
  };

  const handleSaveEdit = (movieId: string) => {
    console.log("Saving age limit:", editingAge, "for movie:", movieId);
    
    setMovies(movies.map(movie => 
      movie.id === movieId 
        ? { ...movie, ageLimit: editingAge }
        : movie
    ));
    
    setEditingId(null);
    setSaveSuccess(movieId);
    
    // Clear success message after 3 seconds
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingAge(0);
  };

  const handleLogout = () => {
    console.log("Admin logging out");
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">WatchID Admin</h1>
              <p className="text-sm text-muted-foreground">Content Management System</p>
            </div>
            <Button onClick={handleLogout} variant="outline" data-testid="button-admin-logout">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Success Alert */}
        {saveSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-900/20" data-testid="alert-save-success">
            <AlertDescription className="text-green-800 dark:text-green-200">
              Movie age restriction updated successfully!
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="movies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="movies" data-testid="tab-movies">
              <Film className="h-4 w-4 mr-2" />
              Movies
            </TabsTrigger>
            <TabsTrigger value="users" data-testid="tab-users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" data-testid="tab-analytics">
              <BarChart className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Movies Tab */}
          <TabsContent value="movies" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Movie Age Restrictions</h2>
              <Button variant="outline" data-testid="button-add-movie">
                <Film className="h-4 w-4 mr-2" />
                Add Movie
              </Button>
            </div>

            <div className="grid gap-4">
              {movies.map((movie) => (
                <Card key={movie.id} className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Movie Poster */}
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded-md flex-shrink-0"
                        data-testid={`img-admin-poster-${movie.id}`}
                      />
                      
                      {/* Movie Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg" data-testid={`text-admin-title-${movie.id}`}>
                              {movie.title}
                            </h3>
                            <p className="text-sm text-muted-foreground" data-testid={`text-admin-genre-${movie.id}`}>
                              {movie.genre} • {movie.duration}
                            </p>
                          </div>
                          
                          {/* Age Limit Controls */}
                          <div className="flex items-center space-x-2">
                            {editingId === movie.id ? (
                              <div className="flex items-center space-x-2">
                                <Input
                                  type="number"
                                  min="0"
                                  max="21"
                                  value={editingAge}
                                  onChange={(e) => setEditingAge(parseInt(e.target.value) || 0)}
                                  className="w-20"
                                  data-testid={`input-age-edit-${movie.id}`}
                                />
                                <span className="text-sm text-muted-foreground">+</span>
                                <Button
                                  size="icon"
                                  onClick={() => handleSaveEdit(movie.id)}
                                  data-testid={`button-save-${movie.id}`}
                                >
                                  <Save className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={handleCancelEdit}
                                  data-testid={`button-cancel-${movie.id}`}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary" data-testid={`badge-admin-age-${movie.id}`}>
                                  {movie.ageLimit}+
                                </Badge>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => handleEditClick(movie)}
                                  data-testid={`button-edit-${movie.id}`}
                                >
                                  <Edit3 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-admin-description-${movie.id}`}>
                          {movie.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage platform users and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">User management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{movies.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Age Verifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">247</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,429</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}