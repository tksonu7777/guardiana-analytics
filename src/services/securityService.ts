
import { supabase } from "@/integrations/supabase/client";

export interface SecurityAlert {
  id: string;
  type: "data_leak" | "clone_app" | "suspicious_web" | "permission_abuse";
  title: string;
  description: string;
  timestamp: Date;
  severity: "low" | "medium" | "high" | "critical";
  metadata?: any;
  status: "new" | "acknowledged" | "resolved";
}

export interface ScanResult {
  hasSensitiveData: boolean;
  detectedItems: {
    type: string;
    count: number;
    preview?: string;
    confidence: number;
  }[];
  originalSize: number;
  redactedSize?: number;
  success: boolean;
  message?: string;
}

// Helper to create a new security alert
export const createSecurityAlert = async (
  type: SecurityAlert["type"],
  title: string,
  description: string,
  severity: SecurityAlert["severity"],
  metadata?: any
): Promise<{ success: boolean; error?: string; alert?: SecurityAlert }> => {
  try {
    const { data, error } = await supabase
      .from("security_alerts")
      .insert({
        type,
        title,
        description,
        severity,
        metadata,
        status: "new",
      })
      .select()
      .single();

    if (error) throw error;
    
    return { success: true, alert: data as unknown as SecurityAlert };
  } catch (error) {
    console.error("Error creating security alert:", error);
    return { success: false, error: error.message };
  }
};

// Scan file for sensitive information
export const scanFileForSensitiveData = async (
  file: File
): Promise<ScanResult> => {
  try {
    // For demonstration purposes, we'll simulate finding sensitive data
    // In a real implementation, this would call an edge function that does AI-based content analysis
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random detection
    const hasSensitiveData = Math.random() > 0.3;
    
    const detectedItems = hasSensitiveData
      ? [
          {
            type: "credit_card",
            count: Math.floor(Math.random() * 3) + 1,
            preview: "4*** **** **** **89",
            confidence: 0.95,
          },
          {
            type: "email",
            count: Math.floor(Math.random() * 5) + 1,
            preview: "u***@example.com",
            confidence: 0.98,
          },
          {
            type: "phone",
            count: Math.floor(Math.random() * 2) + 1,
            preview: "555-***-**21",
            confidence: 0.92,
          },
        ]
      : [];
    
    return {
      hasSensitiveData,
      detectedItems,
      originalSize: file.size,
      success: true,
    };
  } catch (error) {
    console.error("Error scanning file:", error);
    return {
      hasSensitiveData: false,
      detectedItems: [],
      originalSize: file.size,
      success: false,
      message: error.message,
    };
  }
};

// Check if a URL is safe to visit
export const checkUrlSafety = async (
  url: string
): Promise<{ safe: boolean; threats: string[]; score: number }> => {
  try {
    // In a real implementation, this would call an edge function that checks against
    // reputation databases, malware lists, and phishing databases
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if URL looks suspicious (just a demo)
    const isSuspiciousDomain = url.includes("scam") || 
      url.includes("free-prize") || 
      url.includes("phish") ||
      Math.random() < 0.1; // 10% chance of being flagged for demo
    
    const threats = isSuspiciousDomain
      ? [
          Math.random() > 0.5 ? "phishing" : "malware",
          Math.random() > 0.7 ? "data_harvesting" : null,
        ].filter(Boolean)
      : [];
    
    const score = isSuspiciousDomain
      ? Math.floor(Math.random() * 40) + 10 // 10-50 for suspicious
      : Math.floor(Math.random() * 20) + 80; // 80-100 for safe
    
    return {
      safe: !isSuspiciousDomain,
      threats: threats as string[],
      score,
    };
  } catch (error) {
    console.error("Error checking URL safety:", error);
    return {
      safe: false,
      threats: ["verification_error"],
      score: 0,
    };
  }
};

// Fetch all security alerts for the current user
export const fetchSecurityAlerts = async (): Promise<{
  success: boolean;
  alerts?: SecurityAlert[];
  error?: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("security_alerts")
      .select("*")
      .order("timestamp", { ascending: false });
    
    if (error) throw error;
    
    return { success: true, alerts: data as unknown as SecurityAlert[] };
  } catch (error) {
    console.error("Error fetching security alerts:", error);
    return { success: false, error: error.message };
  }
};

// Mark alert as acknowledged or resolved
export const updateAlertStatus = async (
  alertId: string,
  status: "acknowledged" | "resolved"
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from("security_alerts")
      .update({ status })
      .eq("id", alertId);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Error updating alert status:", error);
    return { success: false, error: error.message };
  }
};
