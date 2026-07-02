export function SuggestionCard({ text }: { text: string }) {
  return (
    <button className="bg-card hover:bg-white/5 border border-border rounded-lg p-3 text-sm text-left transition-colors text-foreground/80 hover:text-foreground shadow-sm">
      {text}
    </button>
  )
}
