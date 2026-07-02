export function SuggestedPromptCard({ text, onClick }: { text: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-4 bg-card border border-border rounded-xl text-sm font-medium text-left text-foreground/80 hover:text-foreground hover:-translate-y-[2px] hover:border-primary/50 transition-all duration-250 shadow-sm hover:shadow-md cursor-pointer"
    >
      {text}
    </button>
  )
}
