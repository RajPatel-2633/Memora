export function BugFilterItem({ icon: Icon, label, count, color }: { icon: any, label: string, count: string, color: string }) {
  return (
    <button className="w-full flex items-center justify-between p-2 rounded-lg text-sm transition-all duration-250 text-muted-foreground hover:bg-white/5 hover:text-foreground hover:-translate-y-[1px]">
      <div className="flex items-center gap-2.5">
        <Icon className={`w-4 h-4 ${color}`} />
        {label}
      </div>
      <span className="text-[11px] font-mono opacity-60">{count}</span>
    </button>
  )
}
