import { Hexagon } from "lucide-react"
import { Github } from "../ui/Icons"
import { Button } from "../ui/Button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-8 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Hexagon className="h-6 w-6 text-primary fill-primary" />
          <span className="text-xl font-bold tracking-tight">Memora</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#docs" className="hover:text-foreground transition-colors">Docs</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden md:block">
            Sign In
          </a>
          <Button className="gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(46,160,67,0.4)]">
            <Github className="h-4 w-4" />
            <span>Connect GitHub</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
