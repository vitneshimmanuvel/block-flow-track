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
import logo from "@/assets/logo.webp";

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
        <Link to="/" className="flex items-center gap-3 h-16 px-6 border-b border-sidebar-border hover:bg-sidebar-accent/50 transition-colors">
          <img src={logo} alt="Renaatus Procon" className="h-10 w-10" />
          <h1 className="text-sm font-bold text-sidebar-foreground">Renaatus Procon Private Limited</h1>
        </Link>
        <nav className="flex-1 p-4 space-y-1">
          <NavigationLinks />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between h-16 px-4 bg-card border-b">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Renaatus Procon" className="h-8 w-8" />
            <h1 className="text-sm font-bold">Renaatus Procon</h1>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-sidebar">
              <Link to="/" className="flex items-center gap-3 h-16 px-6 border-b border-sidebar-border">
                <img src={logo} alt="Renaatus Procon" className="h-10 w-10" />
                <h1 className="text-sm font-bold text-sidebar-foreground">Renaatus Procon</h1>
              </Link>
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
