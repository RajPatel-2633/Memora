export function InputToolBtn({ icon: Icon }: { icon: any }) {
  return (
    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors border border-transparent hover:border-border">
      <Icon className="w-4 h-4" />
    </button>
  )
}
