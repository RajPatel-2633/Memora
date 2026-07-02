export const userProfile = {
  name: "Arjun Gupta",
  email: "arjun@acme.com",
  role: "Owner",
  company: "Acme Engineering",
  timezone: "(UTC+05:30) Asia/Kolkata",
  bio: "Engineering lead passionate about building intelligent developer tools.",
  avatar: "A"
};

export const workspaceData = {
  name: "Acme Engineering",
  defaultRepo: "acme/platform",
  dateFormat: "DD MMM YYYY",
  defaultModel: "GPT-4o",
  indexFrequency: "Real-time",
  memoryRetention: "Unlimited",
  visibility: "Private"
};

export const integrations = [
  {
    id: "github",
    name: "GitHub",
    status: "Connected",
    lastSync: "2 mins ago",
    version: "v2.1",
    logoColor: "#ffffff"
  },
  {
    id: "cognee",
    name: "Cognee",
    status: "Connected",
    lastSync: "1 hr ago",
    version: "v1.0",
    logoColor: "#3B82F6"
  },
  {
    id: "groq",
    name: "Groq",
    status: "Disconnected",
    lastSync: "-",
    version: "-",
    logoColor: "#F97316"
  },
  {
    id: "openai",
    name: "OpenAI",
    status: "Connected",
    lastSync: "Just now",
    version: "v4",
    logoColor: "#10A37F"
  },
  {
    id: "anthropic",
    name: "Anthropic",
    status: "Disconnected",
    lastSync: "-",
    version: "-",
    logoColor: "#CC9B7A"
  },
  {
    id: "slack",
    name: "Slack",
    status: "Connected",
    lastSync: "5 mins ago",
    version: "v2.0",
    logoColor: "#E01E5A"
  },
  {
    id: "discord",
    name: "Discord",
    status: "Disconnected",
    lastSync: "-",
    version: "-",
    logoColor: "#5865F2"
  },
  {
    id: "linear",
    name: "Linear",
    status: "Connected",
    lastSync: "10 mins ago",
    version: "v1.5",
    logoColor: "#5E6AD2"
  },
  {
    id: "jira",
    name: "Jira",
    status: "Disconnected",
    lastSync: "-",
    version: "-",
    logoColor: "#0052CC"
  }
];

export const billingData = {
  plan: "Enterprise Plan",
  status: "Active",
  usagePercentage: 78,
  repositoriesIndexed: 42,
  aiTokensUsed: "2.4M",
  storageUsed: "14.2 GB",
  invoices: [
    { id: "INV-2026-07", date: "Jul 01, 2026", amount: "$499.00", status: "Paid" },
    { id: "INV-2026-06", date: "Jun 01, 2026", amount: "$499.00", status: "Paid" },
    { id: "INV-2026-05", date: "May 01, 2026", amount: "$499.00", status: "Paid" }
  ]
};
