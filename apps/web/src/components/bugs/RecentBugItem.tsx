import { Bug } from "lucide-react"

export function RecentBugItem({ id, severity, title, time, iconColor }: { id: string, severity: string, title: string, time: string, iconColor: string }) {
  return (
    <button className="w-full flex flex-col p-2.5 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all duration-250 group text-left hover:-translate-y-[1px]">
      <div className="flex items-center justify-between w-full mb-1">
        <div className="flex items-center gap-2">
          <Bug className={`w-3.5 h-3.5 ${iconColor}`} />
          <span className="text-[11px] font-mono font-medium">{id}</span>
          <span className={`text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded border ${iconColor.replace('text-', 'bg-').replace('500', '500/10')} ${iconColor} ${iconColor.replace('text-', 'border-').replace('500', '500/20')}`}>
            {severity}
          </span>
        </div>
        <span className="text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">{time}</span>
      </div>
      <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground truncate w-full pl-5.5">
        {title}
      </span>
    </button>
  )
}
