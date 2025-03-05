
import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Shield, Upload, AlertTriangle, File, CheckCircle, X, Trash } from "lucide-react";
import { useSecurity } from "@/hooks/useSecurity";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export function EnhancedFileScanner() {
  const [files, setFiles] = useState<File[]>([]);
  const [processedFiles, setProcessedFiles] = useState<{ file: File; result: any }[]>([]);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const { scanFile, isScanning, scanResults } = useSecurity();
  const { toast } = useToast();

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files);
      setFiles(prev => [...prev, ...fileList]);
      
      // Reset input value so the same file can be selected again
      e.target.value = "";
    }
  }, []);
  
  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleScan = useCallback(async () => {
    if (files.length === 0 || isScanning) return;
    
    const results = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setCurrentFile(file);
      setProgress(((i) / files.length) * 100);
      
      try {
        const result = await scanFile(file);
        results.push({ file, result });
      } catch (error) {
        toast({
          title: "Scan Error",
          description: `Failed to scan ${file.name}: ${error.message}`,
          variant: "destructive",
        });
        results.push({ 
          file, 
          result: { 
            success: false, 
            message: error.message, 
            hasSensitiveData: false, 
            detectedItems: [] 
          } 
        });
      }
    }
    
    setProcessedFiles(results);
    setProgress(100);
    setCurrentFile(null);
    setFiles([]);
    
    toast({
      title: "Scan Complete",
      description: `Scanned ${results.length} files. ${
        results.filter(r => r.result.hasSensitiveData).length
      } files contain sensitive data.`,
    });
  }, [files, isScanning, scanFile, toast]);

  const clearResults = useCallback(() => {
    setProcessedFiles([]);
    setProgress(0);
  }, []);

  const renderResultsSummary = () => {
    if (processedFiles.length === 0) return null;
    
    const totalSensitive = processedFiles.filter(f => f.result.hasSensitiveData).length;
    
    return (
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Scan Results</h3>
          <Button variant="ghost" size="sm" onClick={clearResults}>
            <Trash className="mr-2 h-4 w-4" />
            Clear Results
          </Button>
        </div>
        
        <div className="grid gap-2">
          {totalSensitive > 0 ? (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 rounded-md">
              <div className="flex gap-2 items-center text-amber-800 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5" />
                <p className="font-medium">
                  {`${totalSensitive} of ${processedFiles.length} files contain sensitive information`}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded-md">
              <div className="flex gap-2 items-center text-green-800 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
                <p className="font-medium">No sensitive information detected</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {processedFiles.map((item, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-md border ${
                item.result.hasSensitiveData 
                  ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20" 
                  : "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/20"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <File className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{item.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(item.file.size / 1024).toFixed(1)} KB • {item.file.type || "Unknown type"}
                    </p>
                  </div>
                </div>
                
                {item.result.hasSensitiveData ? (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Sensitive Data
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Clean
                  </Badge>
                )}
              </div>
              
              {item.result.hasSensitiveData && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-400">Detected:</p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    {item.result.detectedItems.map((detected, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <span>• {detected.count}× {detected.type.replace("_", " ")}</span>
                        {detected.preview && (
                          <span className="text-xs opacity-70"> (e.g., {detected.preview})</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Enhanced File Scanner
        </CardTitle>
        <CardDescription>
          Scan files for sensitive information before sharing or storing them
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="font-medium text-lg mb-1">Upload Files to Scan</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Drag and drop files here or click to browse
            </p>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
            <Button size="sm" variant="secondary" onClick={(e) => {
              e.stopPropagation();
              document.getElementById("file-upload")?.click();
            }}>
              Select Files
            </Button>
          </div>
          
          {files.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Selected Files ({files.length})</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setFiles([])}
                  disabled={isScanning}
                >
                  Clear All
                </Button>
              </div>
              
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm truncate max-w-[240px]">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full"
                    onClick={() => removeFile(index)}
                    disabled={isScanning}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button 
                className="w-full mt-2" 
                onClick={handleScan}
                disabled={isScanning || files.length === 0}
              >
                {isScanning ? "Scanning..." : "Scan Files"}
              </Button>
            </div>
          )}
          
          {isScanning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scanning: {currentFile?.name}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
          
          {renderResultsSummary()}
        </div>
      </CardContent>
    </Card>
  );
}
