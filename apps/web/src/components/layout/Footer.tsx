import { Hexagon } from "lucide-react"
import { Github, Twitter } from "../ui/Icons"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Hexagon className="h-6 w-6 text-primary fill-primary" />
              <span className="text-xl font-bold tracking-tight">Memora</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Your AI Engineering Memory. Build better, faster with context that never fades.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.539 2H22.7L15.772 10.155L23.916 22H17.534L12.535 15.344L6.837 22H3.666L11.085 13.238L3.256 2H9.81L14.331 8.082L19.539 2ZM18.406 19.923H20.156L8.601 3.971H6.721L18.406 19.923Z" />
                </svg>
                <span className="sr-only">X</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Docs</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Guides</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border text-sm text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} Memora. All rights reserved.</p>
          <p className="flex items-center gap-1 text-xs">
            Powered by <span className="font-medium text-foreground">LangGraph</span> • <span className="font-medium text-foreground">Cognee</span> • <span className="font-medium text-foreground">Qdrant</span> • <span className="font-medium text-foreground">Groq</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
