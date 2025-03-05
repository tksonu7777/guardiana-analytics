
import { Bell, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopBar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notifications, setNotifications] = useState<number>(3);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    // Check for user preference
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="h-14 border-b bg-background px-6 flex items-center justify-between">
      <div className="relative w-64">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-8 bg-secondary border-none h-9"
        />
      </div>
      
      <div className="flex items-center space-x-3">
        <Button
          onClick={toggleTheme}
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4 text-center">
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You have {notifications} unread alerts
              </p>
            </div>
            
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Permission Alert</span>
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
                <p className="text-sm mt-1">
                  Unknown app is requesting camera access
                </p>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Network Alert</span>
                  <span className="text-xs text-muted-foreground">10m ago</span>
                </div>
                <p className="text-sm mt-1">
                  Suspicious outbound connection detected
                </p>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Clone App Alert</span>
                  <span className="text-xs text-muted-foreground">1h ago</span>
                </div>
                <p className="text-sm mt-1">
                  Potential clone app detected: "Social Media Pro"
                </p>
              </div>
            </DropdownMenuItem>
            
            <div className="p-2 border-t">
              <Button variant="ghost" className="w-full text-primary text-sm">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
          G
        </div>
      </div>
    </div>
  );
}
