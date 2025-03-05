
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Shield,
  Wifi,
  Database,
  Copy,
} from "lucide-react";

interface Alert {
  id: string;
  type: "permission" | "network" | "data" | "clone";
  title: string;
  app: string;
  time: string;
  severity: "low" | "medium" | "high" | "critical";
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "permission",
    title: "Camera access requested",
    app: "UnknownApp",
    time: "5 min ago",
    severity: "high",
  },
  {
    id: "2",
    type: "network",
    title: "Suspicious network traffic",
    app: "Social Media Pro",
    time: "10 min ago",
    severity: "critical",
  },
  {
    id: "3",
    type: "data",
    title: "Contacts data accessed",
    app: "Messaging App",
    time: "15 min ago",
    severity: "medium",
  },
  {
    id: "4",
    type: "clone",
    title: "Potential clone app detected",
    app: "Banking Helper",
    time: "20 min ago",
    severity: "high",
  },
  {
    id: "5",
    type: "permission",
    title: "Location access in background",
    app: "Weather App",
    time: "25 min ago",
    severity: "low",
  },
];

const severityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const typeIcons = {
  permission: Shield,
  network: Wifi,
  data: Database,
  clone: Copy,
};

interface RecentAlertsProps {
  className?: string;
}

export function RecentAlerts({ className }: RecentAlertsProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = typeIcons[alert.type];
            
            return (
              <div
                key={alert.id}
                className="flex items-start justify-between py-2 group cursor-pointer hover:bg-muted/50 -mx-6 px-6 transition-colors duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className={cn(
                    "mt-0.5 p-1.5 rounded-full",
                    "bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-200"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "uppercase text-[10px] font-semibold",
                          severityColors[alert.severity]
                        )}
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {alert.app}
                      </span>
                      <span className="text-xs text-muted-foreground/60">•</span>
                      <span className="text-xs text-muted-foreground/60">
                        {alert.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
