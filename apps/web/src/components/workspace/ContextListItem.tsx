export function ContextListItem({ icon: Icon, title, meta, color }: { icon: any, title: string, meta: string, color: string }) {
  return (
    <li className="flex items-center gap-3 p-2 rounded-md hover:bg-card border border-transparent hover:border-border transition-colors cursor-pointer group">
      <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 bg-background border border-border group-hover:border-border/80`}>
        <Icon className={`w-3.5 h-3.5 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground/90 truncate group-hover:text-foreground">{title}</div>
        <div className="text-[10px] text-muted-foreground truncate">{meta}</div>
      </div>
    </li>
  )
}
