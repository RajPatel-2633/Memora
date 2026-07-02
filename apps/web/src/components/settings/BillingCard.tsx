import { motion } from "framer-motion";
import { CreditCard, Download, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { billingData } from "./settingsData";

export function BillingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#2EA043]/10 flex items-center justify-center text-[#2EA043]">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <CardTitle>Billing & Usage</CardTitle>
              <CardDescription>Manage your subscription plan and monitor usage.</CardDescription>
            </div>
          </div>
          <Button className="bg-[#2EA043] hover:bg-[#2EA043]/90 text-white font-semibold transition-transform hover:scale-[1.02]">
            Upgrade Plan
          </Button>
        </CardHeader>

        <CardContent className="space-y-8">
          
          {/* Current Plan Overview */}
          <div className="p-5 rounded-xl border border-border bg-background/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-bold">{billingData.plan}</h3>
                <span className="text-xs font-medium text-[#2EA043] bg-[#2EA043]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {billingData.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">$499 / month • Renews on Aug 01, 2026</p>
            </div>
            <Button variant="outline" className="gap-2 shrink-0">
              Manage Subscription <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Usage Stats */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold border-b border-border/50 pb-2">Monthly Usage</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Repositories</span>
                  <span className="text-sm font-medium">{billingData.repositoriesIndexed} / 50</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: `${(billingData.repositoriesIndexed / 50) * 100}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI Tokens</span>
                  <span className="text-sm font-medium">{billingData.aiTokensUsed} / 5M</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: "48%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Storage</span>
                  <span className="text-sm font-medium">{billingData.storageUsed} / 50 GB</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: "28%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="space-y-4 pt-4 border-t border-border/50">
            <h3 className="text-sm font-semibold">Billing History</h3>
            
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-4 py-3 font-medium">Invoice ID</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {billingData.invoices.map((invoice) => (
                    <tr key={invoice.id} className="bg-background/30 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">{invoice.id}</td>
                      <td className="px-4 py-3">{invoice.date}</td>
                      <td className="px-4 py-3 font-medium">{invoice.amount}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-medium text-[#2EA043]">{invoice.status}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}
