import { NavLink } from "react-router-dom"
import { 
  Home, 
  FolderGit2, 
  MessageSquare, 
  BrainCircuit, 
  Bug, 
  FileText, 
  BarChart3, 
  Settings,
  Hexagon
} from "lucide-react"
import { clsx } from "clsx"

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home, exact: true },
  { name: 'Repositories', href: '/dashboard/repositories', icon: FolderGit2 },
  { name: 'AI Chat', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Memory', href: '/dashboard/memory', icon: BrainCircuit },
  { name: 'Bug Memory', href: '/dashboard/bugs', icon: Bug },
  { name: 'Architecture Decisions', href: '/dashboard/architecture', icon: FileText },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  return (
    <div className="w-64 border-r border-border bg-card flex flex-col h-full shrink-0">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-border/50">
        <Hexagon className="w-6 h-6 text-primary mr-2 fill-primary/20" />
        <span className="font-semibold text-lg tracking-tight">Memora</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.exact}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )
            }
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="text-sm font-medium text-primary">RP</span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium truncate">Raj Patel</span>
            <span className="text-xs text-muted-foreground truncate">Free Plan</span>
          </div>
        </div>
      </div>
    </div>
  )
}
