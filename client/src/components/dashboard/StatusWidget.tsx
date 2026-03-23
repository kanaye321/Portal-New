import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { time: "00:00", value: 98 },
  { time: "04:00", value: 99 },
  { time: "08:00", value: 97 },
  { time: "12:00", value: 98 },
  { time: "16:00", value: 99 },
  { time: "20:00", value: 100 },
  { time: "24:00", value: 99 },
];

export function StatusWidget() {
  return (
    <Card className="col-span-1 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">System Health</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-display">99.8%</div>
        <p className="text-xs text-muted-foreground">
          +0.1% uptime from last week
        </p>
        <div className="h-[80px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              <span className="text-muted-foreground">Core Services</span>
            </div>
            <span className="font-medium text-emerald-600">Operational</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-3 w-3 text-amber-500" />
              <span className="text-muted-foreground">VPN Access</span>
            </div>
            <span className="font-medium text-amber-600">Degraded</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
