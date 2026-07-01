import { FolderGit2, Plus } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] border border-dashed border-border rounded-xl bg-background/50 text-center p-8">
      <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mb-6 shadow-sm border border-border">
        <FolderGit2 className="w-8 h-8 text-muted-foreground" />
      </div>
      
      <h2 className="text-xl font-semibold mb-2 tracking-tight">No repositories found</h2>
      <p className="text-muted-foreground text-sm max-w-md mb-8">
        Get started by connecting your first repository. Memora will automatically index your codebase and start building your engineering memory.
      </p>
      
      <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-md font-medium transition-colors shadow-sm">
        <Plus className="w-4 h-4" />
        Connect Repository
      </button>
    </div>
  )
}
