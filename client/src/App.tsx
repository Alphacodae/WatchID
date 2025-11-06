import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Movies from "@/pages/Movies";
import TVShows from "@/pages/TVShows";
import MyList from "@/pages/MyList";
import AdminLogin from "@/pages/AdminLogin";
import NotFound from "@/pages/not-found";
import FacialRecognitionDemo from "@/components/FacialRecognitionDemo";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/movies" component={Movies} />
      <Route path="/tv-shows" component={TVShows} />
      <Route path="/my-list" component={MyList} />
      <Route path="/demo" component={FacialRecognitionDemo} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark min-h-screen">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
