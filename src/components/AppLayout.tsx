import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  UserCheck,
  Crown,
  Factory,
  Truck,
  Store,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Sales", href: "/sales", icon: Users },
  { name: "ASM Approval", href: "/asm", icon: ClipboardCheck },
  { name: "GM Approval", href: "/gm", icon: UserCheck },
  { name: "CEO Approval", href: "/ceo", icon: Crown },
  { name: "Factory Loading", href: "/factory", icon: Factory },
  { name: "Load Tracking", href: "/tracking", icon: Truck },
  { name: "Dealer Account", href: "/dealer", icon: Store },
];

interface AppLayoutProps {
  children: ReactNode;
}

function NavigationLinks({ onClick }: { onClick?: () => void }) {
  const location = useLocation();

  return (
    <>
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={onClick}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  );
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex w-full">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-sidebar border-r border-sidebar-border">
        <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground">BuildTrack Pro</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavigationLinks />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between h-16 px-4 bg-card border-b">
          <h1 className="text-lg font-bold">BuildTrack Pro</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-sidebar">
              <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
                <h1 className="text-xl font-bold text-sidebar-foreground">BuildTrack Pro</h1>
              </div>
              <nav className="p-4 space-y-1">
                <NavigationLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
