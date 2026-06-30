import { motion } from "framer-motion"
import { 
  MessageSquare, 
  BrainCircuit, 
  GitMerge, 
  Bug, 
  BarChart3 
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/Card"

const features = [
  {
    title: "AI Repository Chat",
    description: "Ask anything about your codebase. Get accurate, context-aware answers.",
    icon: MessageSquare,
  },
  {
    title: "Long-term Memory",
    description: "Memora stores and connects knowledge across commits, PRs, and projects.",
    icon: BrainCircuit,
  },
  {
    title: "Architecture Decisions",
    description: "Capture and revisit important decisions with full context and reasoning.",
    icon: GitMerge,
  },
  {
    title: "Bug Memory",
    description: "Never fix the same bug twice. Memora remembers what happened and why.",
    icon: Bug,
  },
  {
    title: "AI Analytics",
    description: "Track token usage, costs, memory hits, and team productivity.",
    icon: BarChart3,
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 border-y border-border bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Everything your team builds, <br className="hidden md:block" />
            <span className="text-primary">Memora remembers.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A system of record for your engineering knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card hover:bg-card/80 transition-all duration-300 border-border/80 hover:border-primary hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 cursor-default group">
                <CardHeader className="p-10">
                  <div className="w-14 h-14 rounded-lg bg-background border border-border flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors">
                    <feature.icon className="h-7 w-7 text-foreground group-hover:text-primary transition-all duration-300 group-hover:rotate-3" />
                  </div>
                  <CardTitle className="text-xl mb-3 tracking-tight">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

