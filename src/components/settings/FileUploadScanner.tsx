
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, FileText, File, AlertTriangle, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FileWithPreview extends File {
  preview?: string;
  scanned?: boolean;
  sensitiveContent?: string[];
}

export function FileUploadScanner() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [redactionEnabled, setRedactionEnabled] = useState(true);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const newFiles = Array.from(e.target.files).map(file => {
      // Create preview for images
      const preview = file.type.startsWith('image/') 
        ? URL.createObjectURL(file) 
        : undefined;
      
      return {
        ...file,
        preview,
        scanned: false,
        sensitiveContent: [],
      } as FileWithPreview;
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Show file size information
    const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);
    toast({
      title: "Files added",
      description: `${newFiles.length} file(s) added, total size: ${formatFileSize(totalSize)}`,
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleScan = async () => {
    if (!files.length) return;
    
    setScanning(true);
    setProgress(0);
    
    // Simulate scan process for each file
    for (let i = 0; i < files.length; i++) {
      if (files[i].scanned) continue;
      
      // Update progress
      setProgress(Math.round(((i + 1) / files.length) * 100));
      
      // Simulate scanning delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate finding sensitive data based on file type
      const sensitiveContent: string[] = [];
      
      if (files[i].type.includes('image')) {
        sensitiveContent.push('Geolocation metadata');
        if (Math.random() > 0.5) sensitiveContent.push('Faces detected');
      } else if (files[i].type.includes('pdf') || files[i].type.includes('document')) {
        if (Math.random() > 0.3) sensitiveContent.push('Phone numbers');
        if (Math.random() > 0.5) sensitiveContent.push('Email addresses');
        if (Math.random() > 0.7) sensitiveContent.push('Credit card numbers');
      }
      
      // Update file with scan results
      const updatedFiles = [...files];
      updatedFiles[i] = {
        ...updatedFiles[i],
        scanned: true,
        sensitiveContent
      };
      setFiles(updatedFiles);
    }
    
    setScanning(false);
    
    // Show success toast
    toast({
      title: "Scan completed",
      description: "All files have been scanned for sensitive information",
      variant: "default",
    });
  };

  const handleRedact = async () => {
    if (!files.length) return;
    
    setScanning(true);
    setProgress(0);
    
    // Simulate redaction process
    for (let i = 0; i < files.length; i++) {
      // Update progress
      setProgress(Math.round(((i + 1) / files.length) * 100));
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setScanning(false);
    
    // Show success toast
    toast({
      title: "Redaction completed",
      description: "Sensitive information has been removed from all files",
      variant: "default",
    });
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    
    // Clean up any preview URLs
    if (newFiles[index].preview) {
      URL.revokeObjectURL(newFiles[index].preview);
    }
    
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <img src={files.find(f => f.type === fileType)?.preview} alt="Preview" className="h-8 w-8 rounded" />;
    if (fileType.includes('pdf')) return <FileText className="h-8 w-8 text-red-500" />;
    return <File className="h-8 w-8 text-blue-500" />;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Sensitive Information Scanner
        </CardTitle>
        <CardDescription>
          Upload files to detect and remove sensitive information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              multiple
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.mp4,.mov"
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            <p className="text-xs text-muted-foreground">
              Supported formats: Images, PDFs, Documents, Videos (max 50MB)
            </p>
          </div>

          {files.length > 0 && (
            <div className="border rounded-md p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Files to Process ({files.length})</h3>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleScan}
                    disabled={scanning || files.every(f => f.scanned)}
                  >
                    Scan Files
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={handleRedact}
                    disabled={scanning || !files.some(f => f.scanned && f.sensitiveContent?.length > 0)}
                  >
                    Redact Sensitive Data
                  </Button>
                </div>
              </div>

              {scanning && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/40 rounded-md">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {file.scanned && (
                        file.sensitiveContent?.length ? (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {file.sensitiveContent.length} issues
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-100/80">
                            <CheckCircle className="h-3 w-3" />
                            Secure
                          </Badge>
                        )
                      )}
                      <Button 
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFile(index)}
                        className="h-8 w-8"
                      >
                        <span className="sr-only">Remove file</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
