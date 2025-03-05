
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Copy, X, Info } from "lucide-react";

interface CloneAppAlertProps {
  appName: string;
  developerName: string;
  installSource: string;
  riskLevel: "critical" | "high" | "medium" | "low";
  originalAppName?: string;
  reasons: string[];
  onDismiss?: () => void;
  onBlock?: () => void;
}

export function CloneAppAlert({
  appName,
  developerName,
  installSource,
  riskLevel,
  originalAppName,
  reasons,
  onDismiss,
  onBlock
}: CloneAppAlertProps) {
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) onDismiss();
  };

  const handleBlock = () => {
    setDismissed(true);
    if (onBlock) onBlock();
  };

  if (dismissed) {
    return null;
  }

  const getRiskBadgeColor = () => {
    switch (riskLevel) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            <span>Suspicious App Installation Blocked</span>
          </CardTitle>
          <CardDescription className="text-red-700/90 dark:text-red-300/90">
            Guardiana detected a potentially fake or malicious app
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={handleDismiss} className="text-gray-500">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-red-900 dark:text-red-300">App Name</p>
              <p className="text-sm">{appName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-red-900 dark:text-red-300">Developer</p>
              <p className="text-sm">{developerName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-red-900 dark:text-red-300">Install Source</p>
              <p className="text-sm">{installSource}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-red-900 dark:text-red-300">Risk Level</p>
              <p className="text-sm">
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getRiskBadgeColor()}`}>
                  {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
                </span>
              </p>
            </div>
          </div>

          {originalAppName && (
            <div className="bg-white/40 dark:bg-black/20 p-3 rounded-md flex items-center gap-3">
              <Copy className="h-5 w-5 text-amber-500" />
              <div>
                <h4 className="text-sm font-medium">Clone of Legitimate App</h4>
                <p className="text-sm text-red-800/80 dark:text-red-300/80">
                  This appears to be a clone of "{originalAppName}"
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-1.5">
              <Info className="h-4 w-4" />
              <span>Why was this blocked?</span>
            </h4>
            <ul className="space-y-1 pl-6 list-disc text-sm text-red-800/90 dark:text-red-300/90">
              {reasons.map((reason, idx) => (
                <li key={idx}>{reason}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <Button variant="outline" onClick={handleDismiss}>
              Dismiss
            </Button>
            <Button variant="destructive" onClick={handleBlock} className="gap-1.5">
              <Shield className="h-4 w-4" />
              Block Installation
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
