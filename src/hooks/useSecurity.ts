
import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  SecurityAlert, 
  ScanResult, 
  scanFileForSensitiveData, 
  fetchSecurityAlerts,
  updateAlertStatus,
  checkUrlSafety,
  createSecurityAlert
} from "@/services/securityService";
import { useAuth } from "@/context/AuthContext";

export function useSecurity() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult | null>(null);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch alerts on mount and when user changes
  useEffect(() => {
    if (user) {
      loadAlerts();
    }
  }, [user]);

  const loadAlerts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { success, alerts, error } = await fetchSecurityAlerts();
      if (success && alerts) {
        setAlerts(alerts);
      } else if (error) {
        toast({
          title: "Error loading alerts",
          description: error,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load security alerts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const scanFile = useCallback(async (file: File): Promise<ScanResult> => {
    setIsScanning(true);
    setScanResults(null);
    
    try {
      const result = await scanFileForSensitiveData(file);
      setScanResults(result);
      
      // Create an alert if sensitive data is found
      if (result.hasSensitiveData) {
        await createSecurityAlert(
          "data_leak",
          "Sensitive Data Detected",
          `Found ${result.detectedItems.reduce((sum, item) => sum + item.count, 0)} sensitive items in file ${file.name}`,
          "medium",
          { fileName: file.name, fileType: file.type, detectedItems: result.detectedItems }
        );
        
        await loadAlerts(); // Reload alerts
        
        toast({
          title: "Security Alert",
          description: "Sensitive information detected in file",
          variant: "destructive",
        });
      }
      
      return result;
    } catch (error) {
      toast({
        title: "Scan Failed",
        description: error.message || "Failed to scan file for sensitive data",
        variant: "destructive",
      });
      
      return {
        hasSensitiveData: false,
        detectedItems: [],
        originalSize: file.size,
        success: false,
        message: error.message,
      };
    } finally {
      setIsScanning(false);
    }
  }, [toast, loadAlerts]);

  const verifyUrlSafety = useCallback(async (url: string) => {
    try {
      const result = await checkUrlSafety(url);
      
      if (!result.safe) {
        // Create security alert
        await createSecurityAlert(
          "suspicious_web",
          "Suspicious Website Detected",
          `Potential security threat detected from ${url}`,
          result.score < 30 ? "critical" : "high",
          { url, threats: result.threats, score: result.score }
        );
        
        await loadAlerts(); // Reload alerts
        
        toast({
          title: "Security Warning",
          description: `This website may be unsafe. Threats: ${result.threats.join(", ")}`,
          variant: "destructive",
        });
      }
      
      return result;
    } catch (error) {
      toast({
        title: "URL Check Failed",
        description: error.message || "Failed to verify URL safety",
        variant: "destructive",
      });
      
      return { safe: false, threats: ["verification_error"], score: 0 };
    }
  }, [toast, loadAlerts]);

  const acknowledgeAlert = useCallback(async (alertId: string) => {
    try {
      const { success, error } = await updateAlertStatus(alertId, "acknowledged");
      
      if (success) {
        setAlerts(alerts.map(alert => 
          alert.id === alertId 
            ? { ...alert, status: "acknowledged" } 
            : alert
        ));
        
        toast({
          title: "Alert Acknowledged",
          description: "The security alert has been marked as acknowledged",
        });
      } else if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update alert status",
        variant: "destructive",
      });
    }
  }, [alerts, toast]);

  const resolveAlert = useCallback(async (alertId: string) => {
    try {
      const { success, error } = await updateAlertStatus(alertId, "resolved");
      
      if (success) {
        setAlerts(alerts.map(alert => 
          alert.id === alertId 
            ? { ...alert, status: "resolved" } 
            : alert
        ));
        
        toast({
          title: "Alert Resolved",
          description: "The security alert has been marked as resolved",
        });
      } else if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update alert status",
        variant: "destructive",
      });
    }
  }, [alerts, toast]);

  return {
    isScanning,
    scanResults,
    alerts,
    isLoading,
    scanFile,
    verifyUrlSafety,
    acknowledgeAlert,
    resolveAlert,
    refreshAlerts: loadAlerts,
  };
}
