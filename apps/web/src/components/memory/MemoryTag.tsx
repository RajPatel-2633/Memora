import { 
  FileCode, BookOpen, Bug, FileText, Database, Code, FileJson
} from "lucide-react"

export function MemoryTag({ type }: { type: string }) {
  const getTagStyle = (t: string) => {
    switch(t) {
      case 'File': return { icon: FileCode, colors: 'bg-blue-500/10 text-blue-500 border-blue-500/20' }
      case 'Concept': return { icon: BookOpen, colors: 'bg-green-500/10 text-green-500 border-green-500/20' }
      case 'Bug': return { icon: Bug, colors: 'bg-red-500/10 text-red-500 border-red-500/20' }
      case 'ADR': return { icon: FileText, colors: 'bg-purple-500/10 text-purple-500 border-purple-500/20' }
      case 'Database': return { icon: Database, colors: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' }
      case 'API': return { icon: Code, colors: 'bg-blue-400/10 text-blue-400 border-blue-400/20' }
      default: return { icon: FileJson, colors: 'bg-border text-foreground border-border/50' }
    }
  }

  const style = getTagStyle(type)
  const Icon = style.icon

  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border flex items-center gap-1.5 transition-colors ${style.colors}`}>
      <Icon className="w-3 h-3" />
      {type}
    </span>
  )
}
