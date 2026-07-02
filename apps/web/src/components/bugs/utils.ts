import { AlertOctagon, AlertTriangle, Activity, Bug, CheckCircle2, Clock } from "lucide-react"

export function getSeverityStyles(severity: string) {
  switch(severity.toLowerCase()) {
    case 'critical': return { bg: 'bg-red-500', text: 'text-red-500', bgOpacity: 'bg-red-500/10', border: 'border-red-500/20', rawColor: 'red-500', icon: AlertOctagon }
    case 'high': return { bg: 'bg-orange-500', text: 'text-orange-500', bgOpacity: 'bg-orange-500/10', border: 'border-orange-500/20', rawColor: 'orange-500', icon: AlertTriangle }
    case 'medium': return { bg: 'bg-yellow-500', text: 'text-yellow-500', bgOpacity: 'bg-yellow-500/10', border: 'border-yellow-500/20', rawColor: 'yellow-500', icon: AlertTriangle }
    case 'low': return { bg: 'bg-green-500', text: 'text-green-500', bgOpacity: 'bg-green-500/10', border: 'border-green-500/20', rawColor: 'green-500', icon: Activity }
    default: return { bg: 'bg-border', text: 'text-foreground', bgOpacity: 'bg-background', border: 'border-border', rawColor: 'border', icon: Bug }
  }
}

export function getStatusStyles(status: string) {
  switch(status.toLowerCase()) {
    case 'resolved': return { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20', icon: CheckCircle2 }
    case 'open': return { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20', icon: AlertOctagon }
    case 'in progress': return { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20', icon: Clock }
    default: return { bg: 'bg-border/50', text: 'text-foreground', border: 'border-border', icon: Bug }
  }
}
