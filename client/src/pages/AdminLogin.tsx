import { useState } from "react";
import { useLocation } from "wouter";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    console.log("Admin authenticated, redirecting to dashboard");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log("Admin logged out, redirecting to login");
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
}