export function ActionBtn({ icon: Icon, title }: { icon: any, title?: string }) {
  return (
    <button 
      title={title}
      className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md border border-transparent hover:border-border transition-all duration-250 hover:-translate-y-[1px]"
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}
