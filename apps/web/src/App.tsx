import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage"
import { DashboardLayout } from "./layouts/DashboardLayout"
import { DashboardOverview } from "./pages/DashboardOverview"
import { RepositoriesPage } from "./pages/RepositoriesPage"
import { AIWorkspacePage } from "./pages/AIWorkspacePage"
import { MemoryPage } from "./pages/MemoryPage"
import { BugMemoryPage } from "./pages/BugMemoryPage"
import { ArchitectureDecisionsPage } from "./pages/ArchitectureDecisionsPage"
import { AnalyticsPage } from "./pages/AnalyticsPage"
import { SettingsPage } from "./pages/SettingsPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="repositories" element={<RepositoriesPage />} />
          <Route path="chat" element={<AIWorkspacePage />} />
          <Route path="memory" element={<MemoryPage />} />
          <Route path="bugs" element={<BugMemoryPage />} />
          <Route path="architecture" element={<ArchitectureDecisionsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

