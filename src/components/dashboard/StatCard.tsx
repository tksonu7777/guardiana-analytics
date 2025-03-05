
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { cva, type VariantProps } from "class-variance-authority";

const statCardVariants = cva(
  "transition-all duration-300 hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-card",
        primary: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-border bg-background",
        glass: "glass",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({
  icon,
  title,
  value,
  trend,
  variant,
  className,
}: StatCardProps) {
  return (
    <Card className={cn(statCardVariants({ variant }), className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className={cn(
              "text-sm font-medium",
              variant === "primary" ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
              {trend && (
                <span
                  className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full flex items-center",
                    trend.isPositive
                      ? "text-green-800 bg-green-100 dark:text-green-400 dark:bg-green-900/30"
                      : "text-red-800 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
                  )}
                >
                  {trend.isPositive ? "+" : "-"}
                  {Math.abs(trend.value)}%
                </span>
              )}
            </div>
          </div>
          <div className={cn(
            "h-10 w-10 flex items-center justify-center rounded-full",
            variant === "primary" 
              ? "bg-primary-foreground/20 text-primary-foreground" 
              : "bg-primary/10 text-primary"
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
