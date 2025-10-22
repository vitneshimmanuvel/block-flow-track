import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type OrderStatus = 
  | "pending" 
  | "sales_approved" 
  | "asm_approved" 
  | "gm_approved" 
  | "ceo_approved" 
  | "manufacturing" 
  | "loading" 
  | "traveling" 
  | "delivered" 
  | "rejected";

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { 
    label: "Pending", 
    className: "bg-muted text-muted-foreground" 
  },
  sales_approved: { 
    label: "Sales Approved", 
    className: "bg-primary/10 text-primary border-primary/20" 
  },
  asm_approved: { 
    label: "ASM Approved", 
    className: "bg-primary/20 text-primary border-primary/30" 
  },
  gm_approved: { 
    label: "GM Approved", 
    className: "bg-primary/30 text-primary border-primary/40" 
  },
  ceo_approved: { 
    label: "CEO Approved", 
    className: "bg-primary text-primary-foreground" 
  },
  manufacturing: { 
    label: "Manufacturing", 
    className: "bg-warning/20 text-warning border-warning/30" 
  },
  loading: { 
    label: "Loading", 
    className: "bg-warning/30 text-warning border-warning/40" 
  },
  traveling: { 
    label: "In Transit", 
    className: "bg-accent/20 text-accent border-accent/30" 
  },
  delivered: { 
    label: "Delivered", 
    className: "bg-success text-success-foreground" 
  },
  rejected: { 
    label: "Rejected", 
    className: "bg-destructive text-destructive-foreground" 
  },
};

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
