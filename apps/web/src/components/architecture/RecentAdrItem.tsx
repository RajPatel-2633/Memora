import { FileText } from "lucide-react"
import { getStatusColor } from "./utils"

export function RecentAdrItem({ id, title, status, date, iconColor }: { id: string, title: string, status: string, date: string, iconColor: string }) {
  const statusColors = getStatusColor(status)
  return (
    <button className="w-full flex flex-col p-2.5 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all duration-250 group text-left hover:-translate-y-[1px]">
      <div className="flex items-center gap-2 mb-1">
        <FileText className={`w-3.5 h-3.5 ${iconColor}`} />
        <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground truncate w-full">{id}: {title}</span>
      </div>
      <div className="flex items-center gap-2 text-[10px] pl-5.5">
        <span className={`${statusColors.text} font-medium`}>{status}</span>
        <span className="text-muted-foreground/60">•</span>
        <span className="opacity-60">{date}</span>
      </div>
    </button>
  )
}
