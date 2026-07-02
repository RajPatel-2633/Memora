export function MemoryFilterOption({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-white/5 rounded-md transition-colors text-left">
      <Icon className="w-4 h-4 text-muted-foreground" />
      {label}
    </button>
  )
}
