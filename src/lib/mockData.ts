import { OrderStatus } from "@/components/StatusBadge";

export interface Order {
  id: string;
  orderNumber: string;
  clientName: string;
  clientType: "dealer" | "direct";
  product: string;
  quantity: number;
  unit: string;
  status: OrderStatus;
  salesPerson: string;
  asm?: string;
  gm?: string;
  ceo?: string;
  createdAt: string;
  rejectedBy?: string;
  rejectionReason?: string;
  deliveryAddress: string;
  estimatedDelivery?: string;
}

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    orderNumber: "BLK-2025-001",
    clientName: "Metro Construction Ltd",
    clientType: "dealer",
    product: "Standard Building Blocks",
    quantity: 5000,
    unit: "blocks",
    status: "ceo_approved",
    salesPerson: "John Smith",
    asm: "Sarah Johnson",
    gm: "Michael Brown",
    ceo: "David Wilson",
    createdAt: "2025-01-15",
    deliveryAddress: "123 Construction Ave, Metro City",
    estimatedDelivery: "2025-01-25"
  },
  {
    id: "ORD-002",
    orderNumber: "BLK-2025-002",
    clientName: "BuildRight Dealers",
    clientType: "dealer",
    product: "Premium Concrete Blocks",
    quantity: 8000,
    unit: "blocks",
    status: "manufacturing",
    salesPerson: "Emily Davis",
    asm: "Sarah Johnson",
    gm: "Michael Brown",
    ceo: "David Wilson",
    createdAt: "2025-01-16",
    deliveryAddress: "456 Industrial Park, BuildCity",
    estimatedDelivery: "2025-01-28"
  },
  {
    id: "ORD-003",
    orderNumber: "BLK-2025-003",
    clientName: "ABC Housing Project",
    clientType: "direct",
    product: "Standard Building Blocks",
    quantity: 3000,
    unit: "blocks",
    status: "gm_approved",
    salesPerson: "John Smith",
    asm: "Sarah Johnson",
    gm: "Michael Brown",
    createdAt: "2025-01-17",
    deliveryAddress: "789 Project Site, NewTown",
    estimatedDelivery: "2025-01-26"
  },
  {
    id: "ORD-004",
    orderNumber: "BLK-2025-004",
    clientName: "Quick Build Supplies",
    clientType: "dealer",
    product: "Lightweight Blocks",
    quantity: 6000,
    unit: "blocks",
    status: "traveling",
    salesPerson: "Emily Davis",
    asm: "Sarah Johnson",
    gm: "Michael Brown",
    ceo: "David Wilson",
    createdAt: "2025-01-14",
    deliveryAddress: "321 Dealer St, Commerce City",
    estimatedDelivery: "2025-01-20"
  },
  {
    id: "ORD-005",
    orderNumber: "BLK-2025-005",
    clientName: "Skyline Developers",
    clientType: "direct",
    product: "Premium Concrete Blocks",
    quantity: 10000,
    unit: "blocks",
    status: "asm_approved",
    salesPerson: "John Smith",
    asm: "Sarah Johnson",
    createdAt: "2025-01-18",
    deliveryAddress: "555 Skyline Plaza, Metro City"
  },
  {
    id: "ORD-006",
    orderNumber: "BLK-2025-006",
    clientName: "City Builders Co",
    clientType: "dealer",
    product: "Standard Building Blocks",
    quantity: 4500,
    unit: "blocks",
    status: "sales_approved",
    salesPerson: "Emily Davis",
    createdAt: "2025-01-19",
    deliveryAddress: "888 Builder Blvd, Construction Zone"
  },
  {
    id: "ORD-007",
    orderNumber: "BLK-2025-007",
    clientName: "Green Earth Construction",
    clientType: "direct",
    product: "Eco-Friendly Blocks",
    quantity: 2000,
    unit: "blocks",
    status: "delivered",
    salesPerson: "John Smith",
    asm: "Sarah Johnson",
    gm: "Michael Brown",
    ceo: "David Wilson",
    createdAt: "2025-01-10",
    deliveryAddress: "999 Eco Park, Green City",
    estimatedDelivery: "2025-01-18"
  },
  {
    id: "ORD-008",
    orderNumber: "BLK-2025-008",
    clientName: "Rapid Construction Dealers",
    clientType: "dealer",
    product: "Standard Building Blocks",
    quantity: 7500,
    unit: "blocks",
    status: "pending",
    salesPerson: "Emily Davis",
    createdAt: "2025-01-20",
    deliveryAddress: "222 Rapid Road, Fast City"
  },
  {
    id: "ORD-009",
    orderNumber: "BLK-2025-009",
    clientName: "Elite Housing Ltd",
    clientType: "direct",
    product: "Premium Concrete Blocks",
    quantity: 5500,
    unit: "blocks",
    status: "rejected",
    salesPerson: "John Smith",
    asm: "Sarah Johnson",
    gm: "Michael Brown",
    rejectedBy: "Michael Brown (GM)",
    rejectionReason: "Insufficient inventory for premium blocks",
    createdAt: "2025-01-19",
    deliveryAddress: "777 Elite Street, Premium City"
  },
  {
    id: "ORD-010",
    orderNumber: "BLK-2025-010",
    clientName: "BuildFast Dealers",
    clientType: "dealer",
    product: "Lightweight Blocks",
    quantity: 9000,
    unit: "blocks",
    status: "loading",
    salesPerson: "Emily Davis",
    asm: "Sarah Johnson",
    gm: "Michael Brown",
    ceo: "David Wilson",
    createdAt: "2025-01-15",
    deliveryAddress: "444 FastTrack Ave, Speed City",
    estimatedDelivery: "2025-01-22"
  }
];
