import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockOrders } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Package, Clock, CheckCircle2, TrendingUp } from "lucide-react";

export default function DealerAccount() {
  // Simulate dealer view - showing orders from dealer clients
  const dealerOrders = mockOrders.filter((o) => o.clientType === "dealer");
  const totalOrders = dealerOrders.length;
  const pendingOrders = dealerOrders.filter(
    (o) =>
      o.status === "pending" ||
      o.status === "sales_approved" ||
      o.status === "asm_approved" ||
      o.status === "gm_approved" ||
      o.status === "ceo_approved"
  ).length;
  const inProgress = dealerOrders.filter(
    (o) =>
      o.status === "manufacturing" || o.status === "loading" || o.status === "traveling"
  ).length;
  const completed = dealerOrders.filter((o) => o.status === "delivered").length;

  // Group by dealer for better organization
  const ordersByDealer = dealerOrders.reduce((acc, order) => {
    if (!acc[order.clientName]) {
      acc[order.clientName] = [];
    }
    acc[order.clientName].push(order);
    return acc;
  }, {} as Record<string, typeof dealerOrders>);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dealer Account</h1>
        <p className="text-muted-foreground mt-1">
          Track your orders and delivery status
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgress}</div>
            <p className="text-xs text-muted-foreground mt-1">Manufacturing/Transit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completed}</div>
            <p className="text-xs text-muted-foreground mt-1">Delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders by Dealer */}
      {Object.entries(ordersByDealer).map(([dealerName, orders]) => (
        <Card key={dealerName}>
          <CardHeader>
            <CardTitle>{dealerName}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {orders.length} order{orders.length !== 1 ? "s" : ""}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{order.orderNumber}</p>
                        <StatusBadge status={order.status} />
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="text-foreground">
                          <span className="font-medium">Product:</span> {order.product}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Quantity:</span>{" "}
                          {order.quantity.toLocaleString()} {order.unit}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Delivery Address:</span>{" "}
                          {order.deliveryAddress}
                        </p>
                        {order.estimatedDelivery && (
                          <p className="text-muted-foreground">
                            <span className="font-medium">Est. Delivery:</span>{" "}
                            {order.estimatedDelivery}
                          </p>
                        )}
                        <p className="text-muted-foreground text-xs">
                          Order Date: {order.createdAt}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Progress */}
                  {(order.status === "sales_approved" ||
                    order.status === "asm_approved" ||
                    order.status === "gm_approved" ||
                    order.status === "ceo_approved" ||
                    order.status === "manufacturing" ||
                    order.status === "loading" ||
                    order.status === "traveling" ||
                    order.status === "delivered") && (
                    <div className="border-t pt-3">
                      <p className="text-sm font-medium mb-2">Order Progress</p>
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <div className="px-2 py-1 rounded bg-success/20 text-success">
                          ✓ Approved
                        </div>
                        <div className="h-px w-2 bg-border" />
                        <div
                          className={`px-2 py-1 rounded ${
                            order.status === "manufacturing" ||
                            order.status === "loading" ||
                            order.status === "traveling" ||
                            order.status === "delivered"
                              ? "bg-success/20 text-success"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {order.status === "manufacturing" ||
                          order.status === "loading" ||
                          order.status === "traveling" ||
                          order.status === "delivered"
                            ? "✓"
                            : "○"}{" "}
                          Manufacturing
                        </div>
                        <div className="h-px w-2 bg-border" />
                        <div
                          className={`px-2 py-1 rounded ${
                            order.status === "traveling" || order.status === "delivered"
                              ? "bg-success/20 text-success"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {order.status === "traveling" || order.status === "delivered"
                            ? "✓"
                            : "○"}{" "}
                          In Transit
                        </div>
                        <div className="h-px w-2 bg-border" />
                        <div
                          className={`px-2 py-1 rounded ${
                            order.status === "delivered"
                              ? "bg-success/20 text-success"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {order.status === "delivered" ? "✓" : "○"} Delivered
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rejection Info */}
                  {order.status === "rejected" && order.rejectedBy && (
                    <div className="border-t pt-3">
                      <div className="text-sm p-3 bg-destructive/10 rounded border border-destructive/20">
                        <p className="font-medium text-destructive">Order Rejected</p>
                        <p className="text-muted-foreground mt-1">
                          Rejected by: {order.rejectedBy}
                        </p>
                        {order.rejectionReason && (
                          <p className="text-muted-foreground">Reason: {order.rejectionReason}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
