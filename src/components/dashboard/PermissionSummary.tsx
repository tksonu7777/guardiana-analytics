
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PermissionItemProps {
  name: string;
  count: number;
  total: number;
  color?: string;
}

function PermissionItem({ name, count, total, color = "bg-primary" }: PermissionItemProps) {
  const percentage = Math.round((count / total) * 100);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">
          {count}/{total} ({percentage}%)
        </span>
      </div>
      <Progress value={percentage} className={cn("h-2", color)} />
    </div>
  );
}

interface PermissionSummaryProps {
  title: string;
  className?: string;
}

export function PermissionSummary({ title, className }: PermissionSummaryProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <PermissionItem 
          name="Camera Access" 
          count={8} 
          total={32} 
          color="bg-primary" 
        />
        <PermissionItem 
          name="Location Data" 
          count={15} 
          total={32} 
          color="bg-blue-400" 
        />
        <PermissionItem 
          name="Microphone" 
          count={7} 
          total={32} 
          color="bg-indigo-400" 
        />
        <PermissionItem 
          name="Storage" 
          count={24} 
          total={32} 
          color="bg-purple-400" 
        />
        <PermissionItem 
          name="Contacts" 
          count={12} 
          total={32} 
          color="bg-pink-400" 
        />
      </CardContent>
    </Card>
  );
}
