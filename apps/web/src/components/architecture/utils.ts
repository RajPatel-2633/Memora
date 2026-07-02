export function getColorStyles(color: string) {
  switch(color) {
    case 'purple': return { bgOpacity: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20', rawColor: 'purple-500' }
    case 'green': return { bgOpacity: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20', rawColor: 'green-500' }
    case 'blue': return { bgOpacity: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20', rawColor: 'blue-500' }
    case 'orange': return { bgOpacity: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/20', rawColor: 'orange-500' }
    case 'yellow': return { bgOpacity: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20', rawColor: 'yellow-500' }
    default: return { bgOpacity: 'bg-border', text: 'text-foreground', border: 'border-border', rawColor: 'border' }
  }
}

export function getStatusColor(status: string) {
  switch(status.toLowerCase()) {
    case 'accepted': return { bgOpacity: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20' }
    case 'proposed': return { bgOpacity: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' }
    case 'deprecated': return { bgOpacity: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20' }
    default: return { bgOpacity: 'bg-border/50', text: 'text-muted-foreground', border: 'border-border' }
  }
}
