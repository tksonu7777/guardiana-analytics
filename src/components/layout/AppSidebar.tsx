
import { useNavigate, useLocation } from "react-router-dom";
import {
  Shield,
  Wifi,
  Activity,
  Copy,
  Bell,
  AppWindow,
  Settings,
  Database,
  Power,
  Package,
  Home,
  Globe
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Navigation menu items
const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    title: "Permissions",
    path: "/permissions",
    icon: Shield,
  },
  {
    title: "Network Traffic",
    path: "/network",
    icon: Wifi,
  },
  {
    title: "App Activity",
    path: "/activity",
    icon: Activity,
  },
  {
    title: "Clone Detection",
    path: "/clone-detection",
    icon: Copy,
  },
  {
    title: "Web Monitoring",
    path: "/web",
    icon: Globe,
  },
  {
    title: "Alerts",
    path: "/alerts",
    icon: Bell,
  },
  {
    title: "Applications",
    path: "/applications",
    icon: AppWindow,
  },
  {
    title: "Data Access",
    path: "/data-access",
    icon: Database,
  },
  {
    title: "Termination Control",
    path: "/termination",
    icon: Power,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center h-14 px-6 border-b">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl">Guardiana</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors duration-200",
                      location.pathname === item.path
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-6 border-t">
        <div className="flex flex-col space-y-4">
          <Button className="btn-premium w-full" variant="outline">
            <Package className="mr-2 h-4 w-4" />
            <span>Add New Feature</span>
          </Button>
          <div className="text-xs text-center text-muted-foreground">
            Guardiana Analytics v1.0
          </div>
        </div>
      </SidebarFooter>
      
      <SidebarTrigger className="absolute top-3 -right-10 p-2 bg-background border rounded-md shadow-md">
        <span className="sr-only">Toggle Sidebar</span>
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </SidebarTrigger>
    </Sidebar>
  );
}
