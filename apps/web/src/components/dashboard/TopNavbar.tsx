import { Search, Bell, ChevronDown, GitBranch } from "lucide-react"

export function TopNavbar() {
  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 flex items-center justify-between px-6 shrink-0">
      
      {/* Global Search */}
      <div className="flex-1 max-w-xl flex items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search anything in your engineering memory... (⌘K)" 
            className="w-full bg-card border border-border rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-4">
        
        {/* Repository Switcher */}
        <button className="flex items-center gap-2 px-3 py-1.5 border border-border bg-card hover:bg-white/5 rounded-md text-sm transition-colors">
          <GitBranch className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">memora-ai/memora</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
        </button>

        {/* Notifications */}
        <button className="p-2 text-muted-foreground hover:text-foreground relative rounded-full hover:bg-white/5 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-background"></span>
        </button>

      </div>
    </header>
  )
}
