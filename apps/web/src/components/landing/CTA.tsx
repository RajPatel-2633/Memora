import { motion } from "framer-motion"
import { Github } from "../ui/Icons"
import { Button } from "../ui/Button"

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto bg-card border border-border rounded-[2rem] p-16 md:p-24 text-center relative overflow-hidden"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground relative z-10">
            Ready to build with a memory <br className="hidden md:block" />
            that never forgets?
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto relative z-10">
            Join thousands of developers using Memora to understand their codebase instantly and ship faster.
          </p>
          
          <Button size="lg" className="h-14 px-8 text-lg gap-2 relative z-10 transition-all duration-300 shadow-[0_0_20px_rgba(46,160,67,0.2)] hover:shadow-[0_0_30px_rgba(46,160,67,0.5)]">
            <Github className="h-6 w-6" />
            <span>Connect GitHub</span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
