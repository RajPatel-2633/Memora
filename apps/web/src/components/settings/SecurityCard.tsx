import { motion } from "framer-motion";
import { Shield, Key, Smartphone, Laptop } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";

export function SecurityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#2EA043]/10 flex items-center justify-center text-[#2EA043]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your passwords, 2FA, and active sessions.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold border-b border-border/50 pb-2">Change Password</h3>
              
              <div className="space-y-3 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow" />
                </div>
                <Button className="w-full mt-2 bg-[#2EA043]/10 text-[#2EA043] hover:bg-[#2EA043]/20 border border-[#2EA043]/20 transition-all">
                  Update Password
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold border-b border-border/50 pb-2">Two-Factor Authentication</h3>
              
              <div className="pt-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Add an additional layer of security to your account by requiring more than just a password to log in.
                </p>
                <div className="p-4 rounded-lg border border-border bg-background/50 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#2EA043]" />
                    <span className="text-sm font-medium">Authenticator App</span>
                    <span className="ml-auto text-xs font-medium text-[#2EA043] bg-[#2EA043]/10 px-2 py-0.5 rounded">Enabled</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Configured with Google Authenticator.</p>
                  <Button variant="outline" size="sm" className="w-fit mt-1">Manage 2FA</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <h3 className="text-sm font-semibold">Active Sessions</h3>
            
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-border bg-background/50">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <Laptop className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium flex items-center gap-2">
                      Windows • Chrome
                      <span className="text-[10px] font-medium text-[#2EA043] bg-[#2EA043]/10 px-1.5 py-0.5 rounded">Current Session</span>
                    </p>
                    <p className="text-xs text-muted-foreground">IP: 192.168.1.1 • Last active: Just now</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-border bg-background/50">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">iOS • Safari</p>
                    <p className="text-xs text-muted-foreground">IP: 10.0.0.45 • Last active: 2 hours ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-red-400 hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20">Revoke</Button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">API Keys & Tokens</h3>
              <Button size="sm" variant="outline" className="gap-2">
                <Key className="w-3.5 h-3.5" />
                Generate New Key
              </Button>
            </div>
            
            <div className="p-4 rounded-lg border border-border bg-background/50 text-center">
              <p className="text-sm text-muted-foreground">You don't have any active API keys.</p>
            </div>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}
