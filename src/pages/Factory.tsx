import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { mockOrders, Order } from "@/lib/mockData";
import { StatusBadge, OrderStatus } from "@/components/StatusBadge";
import { Factory as FactoryIcon, PackageCheck, Truck, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Factory() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { toast } = useToast();

  const ceoApproved = orders.filter((o) => o.status === "ceo_approved");
  const manufacturing = orders.filter((o) => o.status === "manufacturing");
  const loading = orders.filter((o) => o.status === "loading");
  const traveling = orders.filter((o) => o.status === "traveling");
  const delivered = orders.filter((o) => o.status === "delivered");

  const handleManufactureComplete = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, status: "manufacturing" as OrderStatus } : o
      )
    );
    toast({
      title: "Manufacturing Started",
      description: "Order has been moved to manufacturing.",
    });
  };

  const handleLoadingComplete = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, status: "loading" as OrderStatus } : o
      )
    );
    toast({
      title: "Loading Complete",
      description: "Order has been loaded for dispatch.",
    });
  };

  const handleDispatch = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, status: "traveling" as OrderStatus } : o
      )
    );
    toast({
      title: "Order Dispatched",
      description: "Order is now in transit to delivery location.",
    });
  };

  const handleDelivered = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, status: "delivered" as OrderStatus } : o
      )
    );
    toast({
      title: "Delivery Confirmed",
      description: "Order has been successfully delivered.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Factory Loading</h1>
        <p className="text-muted-foreground mt-1">
          Manage production, loading, and dispatch
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ceoApproved.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Manufacturing</CardTitle>
            <FactoryIcon className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{manufacturing.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Loading</CardTitle>
            <PackageCheck className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{traveling.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{delivered.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* CEO Approved - Ready for Manufacturing */}
      {ceoApproved.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Ready for Manufacturing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ceoApproved.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-4 p-4 border rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{order.orderNumber}</p>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.product} • {order.quantity.toLocaleString()} {order.unit}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Client: {order.clientName}
                      </p>
                    </div>
                    <Button onClick={() => handleManufactureComplete(order.id)}>
                      <FactoryIcon className="mr-2 h-4 w-4" />
                      Start Manufacturing
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manufacturing */}
      {manufacturing.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>In Manufacturing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {manufacturing.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-4 p-4 border rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{order.orderNumber}</p>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.product} • {order.quantity.toLocaleString()} {order.unit}
                      </p>
                    </div>
                    <Button onClick={() => handleLoadingComplete(order.id)}>
                      <PackageCheck className="mr-2 h-4 w-4" />
                      Complete & Load
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading */}
      {loading.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Loading for Dispatch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-4 p-4 border rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{order.orderNumber}</p>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.product} • {order.quantity.toLocaleString()} {order.unit}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Delivery: {order.deliveryAddress}
                      </p>
                    </div>
                    <Button onClick={() => handleDispatch(order.id)}>
                      <Truck className="mr-2 h-4 w-4" />
                      Dispatch
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* In Transit */}
      {traveling.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>In Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {traveling.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-4 p-4 border rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{order.orderNumber}</p>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.product} • {order.quantity.toLocaleString()} {order.unit}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Destination: {order.deliveryAddress}
                      </p>
                      {order.estimatedDelivery && (
                        <p className="text-sm text-muted-foreground">
                          Est. Delivery: {order.estimatedDelivery}
                        </p>
                      )}
                    </div>
                    <Button onClick={() => handleDelivered(order.id)} variant="outline">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Mark Delivered
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
