import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { Github } from "../ui/Icons"
import { Button } from "../ui/Button"

export function Hero() {
  return (
    <section className="pt-24 pb-24 border-b border-border overflow-hidden relative">
      {/* Subtle background radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-50" />
      
      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-mono text-muted-foreground mb-10">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Memora v2.0 is now available
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
            The AI Memory Layer for <br className="hidden md:block" />
            <span className="text-primary">Engineering Teams</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto font-medium">
            Give your AI tools complete context of your codebase. Memora indexes your repositories, architecture decisions, and bugs to provide instantly accurate answers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto gap-2 font-semibold transition-all hover:shadow-[0_0_15px_rgba(46,160,67,0.4)]">
              <Github className="h-5 w-5" />
              <span>Connect GitHub</span>
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2 font-semibold">
              <Play className="h-4 w-4" />
              <span>Watch Demo</span>
            </Button>
          </div>
        </motion.div>
        
      </div>
    </section>
  )
}

