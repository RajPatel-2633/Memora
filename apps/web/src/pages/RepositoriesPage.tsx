import { EmptyState } from "../components/dashboard/EmptyState"

export function RepositoriesPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Repositories</h1>
          <p className="text-muted-foreground mt-1">Manage your connected codebases.</p>
        </div>
      </div>
      
      {/* For demonstration, we show the EmptyState here */}
      <div className="flex-1">
        <EmptyState />
      </div>
    </div>
  )
}
