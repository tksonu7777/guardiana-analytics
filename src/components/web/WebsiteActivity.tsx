
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle, ExternalLink, X, Ban, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface WebsiteItem {
  id: string;
  url: string;
  title: string;
  timestamp: string;
  status: "secure" | "warning" | "blocked";
  riskLevel?: "low" | "medium" | "high";
  riskDetails?: string[];
}

const mockWebsites: WebsiteItem[] = [
  {
    id: "1",
    url: "https://secure-bank.com",
    title: "Secure Bank - Online Banking",
    timestamp: "11:42 AM",
    status: "secure"
  },
  {
    id: "2",
    url: "https://shopping-secure.com",
    title: "Shopping Platform",
    timestamp: "11:35 AM",
    status: "secure"
  },
  {
    id: "3",
    url: "https://suspicious-login.net",
    title: "Login Portal",
    timestamp: "11:22 AM",
    status: "warning",
    riskLevel: "medium",
    riskDetails: [
      "Suspicious domain registration (2 days ago)",
      "Login form submits to different domain",
      "Similar to legitimate banking site"
    ]
  },
  {
    id: "4",
    url: "https://email-service.com",
    title: "Email Service",
    timestamp: "11:15 AM",
    status: "secure"
  },
  {
    id: "5",
    url: "https://malware-distribution.site",
    title: "Free Downloads",
    timestamp: "10:56 AM",
    status: "blocked",
    riskLevel: "high",
    riskDetails: [
      "Known malware distribution site",
      "Attempts to download executable files",
      "Domain blacklisted by security services"
    ]
  },
  {
    id: "6",
    url: "https://news-site.com",
    title: "Daily News",
    timestamp: "10:42 AM",
    status: "secure"
  },
  {
    id: "7",
    url: "https://phishing-attempt.net",
    title: "Account Verification Required",
    timestamp: "10:30 AM",
    status: "warning",
    riskLevel: "high",
    riskDetails: [
      "Phishing attempt detected",
      "Attempts to collect credentials",
      "Domain registered 4 hours ago"
    ]
  }
];

interface WebsiteActivityProps {
  isMonitoring: boolean;
}

export function WebsiteActivity({ isMonitoring }: WebsiteActivityProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpandItem = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const getStatusIcon = (status: WebsiteItem["status"]) => {
    switch (status) {
      case "secure":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "blocked":
        return <Ban className="h-4 w-4 text-red-500" />;
    }
  };

  const getBadgeStyles = (status: WebsiteItem["status"]) => {
    switch (status) {
      case "secure":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "warning":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "blocked":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  const getRiskLevelBadge = (level?: WebsiteItem["riskLevel"]) => {
    if (!level) return null;
    
    const styles = {
      low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
      high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    };
    
    return (
      <Badge variant="outline" className={cn(styles[level])}>
        {level.charAt(0).toUpperCase() + level.slice(1)} Risk
      </Badge>
    );
  };

  return (
    <Card>
      <CardContent className="p-0">
        {!isMonitoring && (
          <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
            <Shield className="h-12 w-12 mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-2">Web Monitoring Disabled</h3>
            <p className="max-w-md mb-4">
              Enable web monitoring to track browser activity and protect against malicious websites.
            </p>
          </div>
        )}
        
        {isMonitoring && (
          <div className="divide-y">
            {mockWebsites.map((website) => (
              <div key={website.id} className="divide-y">
                <div 
                  className={cn(
                    "flex items-center justify-between p-4 hover:bg-muted/40 transition-colors cursor-pointer",
                    website.status === "warning" && "bg-amber-50 dark:bg-amber-950/10",
                    website.status === "blocked" && "bg-red-50 dark:bg-red-950/10",
                  )}
                  onClick={() => toggleExpandItem(website.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {getStatusIcon(website.status)}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{website.title}</h3>
                      <p className="text-xs text-muted-foreground truncate max-w-[300px] sm:max-w-[500px]">
                        {website.url}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs", getBadgeStyles(website.status))}
                    >
                      {website.status === "secure" && "Secure"}
                      {website.status === "warning" && "Warning"}
                      {website.status === "blocked" && "Blocked"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{website.timestamp}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className={cn(
                        "h-4 w-4 transition-transform",
                        expandedItem === website.id && "rotate-90"
                      )} />
                    </Button>
                  </div>
                </div>
                
                {expandedItem === website.id && website.riskDetails && (
                  <div className={cn(
                    "p-4 bg-muted/30",
                    website.status === "warning" && "bg-amber-50 dark:bg-amber-950/10",
                    website.status === "blocked" && "bg-red-50 dark:bg-red-950/10",
                  )}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <h4 className="font-medium">Security Analysis</h4>
                      </div>
                      {getRiskLevelBadge(website.riskLevel)}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <h5 className="text-sm font-medium">Risk Details:</h5>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {website.riskDetails.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm" className="flex gap-1">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Visit Anyway
                      </Button>
                      <Button variant="destructive" size="sm" className="flex gap-1">
                        <Ban className="h-3.5 w-3.5" />
                        Block Site
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
