import { FileCode, Bug, FileText, GitCommit } from "lucide-react"

export function PremiumSourceCard({ source }: { source: any }) {
  const getColors = (type: string) => {
    switch (type) {
      case 'file': return { border: 'border-blue-500/50', bg: 'bg-blue-500', icon: FileCode }
      case 'bug': return { border: 'border-red-500/50', bg: 'bg-red-500', icon: Bug }
      case 'adr': return { border: 'border-purple-500/50', bg: 'bg-purple-500', icon: FileText }
      case 'commit': return { border: 'border-green-500/50', bg: 'bg-green-500', icon: GitCommit }
      default: return { border: 'border-border', bg: 'bg-border', icon: FileText }
    }
  }

  const styles = getColors(source.type)
  const Icon = styles.icon

  return (
    <div className={`group relative bg-background border border-border hover:${styles.border} rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-250 hover:-translate-y-[2px] hover:scale-[1.01] cursor-pointer overflow-hidden`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${styles.bg} opacity-50 group-hover:opacity-100 transition-opacity`} />
      <div className="pl-1">
        <div className="flex items-start gap-2 mb-1.5">
          <Icon className="w-3.5 h-3.5 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-foreground/90 truncate group-hover:text-foreground">{source.title}</div>
          </div>
        </div>
        <div className="text-[10px] text-muted-foreground leading-snug line-clamp-2 mb-1.5 h-7">
          {source.desc}
        </div>
        <div className="flex items-center justify-between text-[9px] text-muted-foreground/80">
          <span className="truncate max-w-[80%]">{source.path}</span>
          <span className="shrink-0">{source.meta}</span>
        </div>
      </div>
    </div>
  )
}
