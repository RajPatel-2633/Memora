export function MemoryFilterItem({ icon: Icon, label, count, active }: { icon: any, label: string, count: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
      active 
        ? 'bg-white/10 text-foreground font-medium' 
        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
    }`}>
      <div className="flex items-center gap-2.5">
        <Icon className={`w-4 h-4 ${active ? 'text-foreground' : 'opacity-70'}`} />
        {label}
      </div>
      <span className={`text-[11px] font-mono ${active ? 'text-foreground/70' : 'opacity-50'}`}>{count}</span>
    </button>
  )
}
