import { motion } from "framer-motion"
import { Github } from "../ui/Icons"
import { Code2, Database, BrainCircuit, Sparkles, MessageSquare } from "lucide-react"

const pipelineSteps = [
  { id: "github", label: "GitHub", icon: Github },
  { id: "parser", label: "Parser", icon: Code2 },
  { id: "embeddings", label: "Embeddings", icon: Database },
  { id: "cognee", label: "Cognee", icon: BrainCircuit },
  { id: "ai", label: "LLM", icon: Sparkles },
  { id: "answer", label: "Answer", icon: MessageSquare },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 border-y border-border bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The Engine</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A production-grade pipeline designed for massive codebases.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Main Pipeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 hidden md:block" />
          
          {/* Animated Flow Line */}
          <motion.div 
            className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 hidden md:block z-0 shadow-[0_0_10px_#2EA043]"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
            {pipelineSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center group relative cursor-default">
                
                {/* Connecting line for mobile */}
                {index !== 0 && (
                  <div className="w-0.5 h-8 bg-border md:hidden mb-2" />
                )}

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.3 }}
                  className="w-16 h-16 rounded-xl bg-card border border-border flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(46,160,67,0.2)] relative"
                >
                  <step.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  
                  {/* Glowing dot that travels through */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 1, 0] }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                  />
                </motion.div>
                
                <span className="text-sm font-semibold mt-5 text-muted-foreground group-hover:text-foreground transition-colors hidden md:block tracking-tight">
                  {step.label}
                </span>
                
                <span className="text-sm font-semibold ml-4 text-muted-foreground group-hover:text-foreground transition-colors md:hidden tracking-tight">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

