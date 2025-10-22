import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockOrders, Order } from "@/lib/mockData";
import { StatusBadge, OrderStatus } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Crown, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CEOApproval() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { toast } = useToast();

  const pendingOrders = orders.filter((o) => o.status === "gm_approved");
  const myApprovals = orders.filter((o) => 
    o.status === "ceo_approved" ||
    o.status === "manufacturing" ||
    o.status === "loading" ||
    o.status === "traveling" ||
    o.status === "delivered"
  );
  const rejectedOrders = orders.filter((o) => o.status === "rejected");

  const handleApprove = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? { ...o, status: "ceo_approved" as OrderStatus, ceo: "David Wilson" }
          : o
      )
    );
    toast({
      title: "Order Approved",
      description: "Order has been approved and sent to factory for production.",
    });
  };

  const handleReject = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "rejected" as OrderStatus,
              rejectedBy: "David Wilson (CEO)",
              rejectionReason: "Strategic decision",
            }
          : o
      )
    );
    toast({
      title: "Order Rejected",
      description: "Order has been rejected. All approvers will be notified.",
      variant: "destructive",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">CEO Approval</h1>
        <p className="text-muted-foreground mt-1">
          Final approval for all orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending CEO Review</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved by CEO</CardTitle>
            <Crown className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myApprovals.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rejected Orders</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedOrders.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Pending CEO Approval</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingOrders.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No orders pending CEO approval
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
                        <div className="pt-2 border-t mt-2">
                          <p className="text-muted-foreground font-medium">Approval Chain:</p>
                          <p className="text-muted-foreground">Sales: {order.salesPerson}</p>
                          <p className="text-muted-foreground">ASM: {order.asm}</p>
                          <p className="text-muted-foreground">GM: {order.gm}</p>
                        </div>
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

      {/* Rejected Orders */}
      {rejectedOrders.length > 0 && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Rejected Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rejectedOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-4 p-4 border border-destructive/20 rounded-lg bg-destructive/5"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold">{order.orderNumber}</p>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-foreground">
                      {order.clientName} • {order.quantity.toLocaleString()} {order.unit}
                    </p>
                    {order.rejectedBy && (
                      <div className="text-sm p-3 bg-background rounded border">
                        <p className="font-medium text-destructive">
                          Rejected by: {order.rejectedBy}
                        </p>
                        {order.rejectionReason && (
                          <p className="text-muted-foreground mt-1">
                            Reason: {order.rejectionReason}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Approved Orders Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>CEO Approved Orders - Complete Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myApprovals.map((order) => (
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
                    Sales: {order.salesPerson} • ASM: {order.asm} • GM: {order.gm} • CEO: {order.ceo}
                  </p>
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
