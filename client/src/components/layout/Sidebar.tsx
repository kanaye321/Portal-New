import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Server, 
  Shield, 
  HelpCircle, 
  Settings, 
  LogOut,
  Ticket,
  BookOpen
} from "lucide-react";
import logo from "@assets/generated_images/abstract_blue_tech_hexagon_logo.png";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "IT Services", href: "/services", icon: Server },
  { name: "Security", href: "/security", icon: Shield },
  { name: "Knowledge Base", href: "/kb", icon: BookOpen },
  { name: "Support Tickets", href: "/tickets", icon: Ticket },
];

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border text-sidebar-foreground w-64 fixed left-0 top-0 bottom-0 z-30 transition-all duration-300">
      <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border/50">
        <img src={logo} alt="SRPH MIS" className="h-8 w-8 rounded-sm object-contain bg-white/10 p-1" />
        <span className="text-lg font-display font-bold tracking-tight text-white">
          SRPH <span className="text-sidebar-primary">MIS</span>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6 scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-transparent">
        <div>
          <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Main Menu
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <div
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                      isActive
                        ? "bg-sidebar-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-white" : "text-sidebar-foreground/50 group-hover:text-white"
                      )}
                    />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            System
          </div>
          <nav className="space-y-1">
            {secondaryNavigation.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <div
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                      isActive
                        ? "bg-sidebar-accent text-white"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-white" : "text-sidebar-foreground/50 group-hover:text-white"
                      )}
                    />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border/50">
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white transition-colors cursor-pointer">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
