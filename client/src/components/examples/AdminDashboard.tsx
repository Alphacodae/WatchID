import { useState } from "react"
import AdminDashboard from '../AdminDashboard'
import { Button } from "@/components/ui/button"

export default function AdminDashboardExample() {
  const [showDemo, setShowDemo] = useState(false)

  if (!showDemo) {
    return (
      <div className="p-8 text-center">
        <Button onClick={() => setShowDemo(true)}>Show Admin Dashboard</Button>
      </div>
    )
  }

  return <AdminDashboard onLogout={() => setShowDemo(false)} />
}