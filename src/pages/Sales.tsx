import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockOrders, Order } from "@/lib/mockData";
import { StatusBadge, OrderStatus } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Package, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Sales() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { toast } = useToast();

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const approvedToday = orders.filter(
    (o) => o.status === "sales_approved" && o.createdAt === new Date().toISOString().split("T")[0]
  );
  const inTransitToday = orders.filter((o) => o.status === "traveling");

  const handleApprove = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, status: "sales_approved" as OrderStatus } : o
      )
    );
    toast({
      title: "Order Approved",
      description: "Order has been approved and sent to ASM for review.",
    });
  };

  const handleReject = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "rejected" as OrderStatus,
              rejectedBy: "Sales Team",
              rejectionReason: "Does not meet criteria",
            }
          : o
      )
    );
    toast({
      title: "Order Rejected",
      description: "Order has been rejected.",
      variant: "destructive",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sales Portal</h1>
        <p className="text-muted-foreground mt-1">
          Review and approve customer orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedToday.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Transit Today</CardTitle>
            <Truck className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inTransitToday.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingOrders.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No pending orders to review
            </p>
          ) : (
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-4 p-4 border rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{order.orderNumber}</p>
                        <StatusBadge status={order.status} />
                        <Badge variant="outline">
                          {order.clientType === "dealer" ? "Dealer" : "Direct Client"}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-foreground">
                          <span className="font-medium">Client:</span> {order.clientName}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Product:</span> {order.product}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Quantity:</span>{" "}
                          {order.quantity.toLocaleString()} {order.unit}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Delivery:</span> {order.deliveryAddress}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Requested: {order.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(order.id)}
                        className="flex-1 sm:flex-none"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleReject(order.id)}
                        className="flex-1 sm:flex-none"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approved Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Approved Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders
              .filter((o) => o.status !== "pending" && o.status !== "rejected")
              .slice(0, 5)
              .map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium">{order.orderNumber}</p>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.clientName} • {order.quantity.toLocaleString()} {order.unit}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {order.createdAt}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
