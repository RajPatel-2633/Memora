export function IconButton({ icon: Icon }: { icon: any }) {
  return (
    <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors">
      <Icon className="w-4 h-4" />
    </button>
  )
}
