import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/dashboard/Sidebar"
import { TopNavbar } from "../components/dashboard/TopNavbar"

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Sidebar - fixed width */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopNavbar />
        
        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto bg-background/50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
