import { useState } from "react"
import AdminLogin from '../AdminLogin'
import AdminDashboard from '../AdminDashboard'

export default function AdminLoginExample() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (isLoggedIn) {
    return <AdminDashboard onLogout={() => setIsLoggedIn(false)} />
  }

  return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
}