import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockOrders, Order } from "@/lib/mockData";
import { StatusBadge, OrderStatus } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GMApproval() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { toast } = useToast();

  const pendingOrders = orders.filter((o) => o.status === "asm_approved");
  const myApprovals = orders.filter((o) => 
    o.status === "gm_approved" || 
    o.status === "ceo_approved" ||
    o.status === "manufacturing" ||
    o.status === "loading" ||
    o.status === "traveling" ||
    o.status === "delivered"
  );

  const handleApprove = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? { ...o, status: "gm_approved" as OrderStatus, gm: "Michael Brown" }
          : o
      )
    );
    toast({
      title: "Order Approved",
      description: "Order has been approved and sent to CEO for final review.",
    });
  };

  const handleReject = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "rejected" as OrderStatus,
              rejectedBy: "Michael Brown (GM)",
              rejectionReason: "Budget constraints",
            }
          : o
      )
    );
    toast({
      title: "Order Rejected",
      description: "Order has been rejected. All previous approvers will be notified.",
      variant: "destructive",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">GM Approval</h1>
        <p className="text-muted-foreground mt-1">
          Review ASM-approved orders and track approved orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending GM Review</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Approvals</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myApprovals.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Pending GM Approval</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingOrders.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No orders pending GM approval
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
                          <span className="font-medium">Sales Person:</span> {order.salesPerson}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">ASM:</span> {order.asm}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Delivery:</span> {order.deliveryAddress}
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

      {/* Approved Orders Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>My Approved Orders - Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myApprovals.slice(0, 8).map((order) => (
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
                  <p className="text-sm text-muted-foreground">
                    Sales: {order.salesPerson} • ASM: {order.asm} • GM: {order.gm}
                  </p>
                  {order.ceo && (
                    <p className="text-sm text-muted-foreground">
                      CEO: {order.ceo}
                    </p>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {order.estimatedDelivery && (
                    <p>Est. Delivery: {order.estimatedDelivery}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
