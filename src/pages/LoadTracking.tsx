import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockOrders } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { MapPin, Truck, Clock } from "lucide-react";
import { VehicleMap } from "@/components/VehicleMap";

export default function LoadTracking() {
  const activeOrders = mockOrders.filter(
    (o) =>
      o.status === "manufacturing" ||
      o.status === "loading" ||
      o.status === "traveling"
  );

  const deliveredOrders = mockOrders.filter((o) => o.status === "delivered");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Load Tracking</h1>
        <p className="text-muted-foreground mt-1">
          Track all orders from manufacturing to delivery
        </p>
      </div>

      {/* Live Map */}
      <VehicleMap />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Truck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeOrders.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently tracking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <MapPin className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockOrders.filter((o) => o.status === "traveling").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">On the road</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Delivered Today</CardTitle>
            <Clock className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveredOrders.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Active Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          {activeOrders.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No active shipments to track
            </p>
          ) : (
            <div className="space-y-6">
              {activeOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-lg">{order.orderNumber}</p>
                        <StatusBadge status={order.status} />
                        <Badge variant="outline">
                          {order.clientType === "dealer" ? "Dealer" : "Direct"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Client:</span>{" "}
                            {order.clientName}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Product:</span>{" "}
                            {order.product}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Quantity:</span>{" "}
                            {order.quantity.toLocaleString()} {order.unit}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Delivery Address:</span>
                          </p>
                          <p className="text-muted-foreground">{order.deliveryAddress}</p>
                          {order.estimatedDelivery && (
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">Est. Delivery:</span>{" "}
                              {order.estimatedDelivery}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="border-t pt-4">
                    <p className="font-medium text-sm mb-3">Tracking Timeline</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                          order.status === "manufacturing" ||
                          order.status === "loading" ||
                          order.status === "traveling"
                            ? "bg-success/20 text-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <div className="h-2 w-2 rounded-full bg-current" />
                        Manufacturing
                      </div>
                      <div className="h-px w-4 bg-border" />
                      <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                          order.status === "loading" || order.status === "traveling"
                            ? "bg-success/20 text-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <div className="h-2 w-2 rounded-full bg-current" />
                        Loading
                      </div>
                      <div className="h-px w-4 bg-border" />
                      <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                          order.status === "traveling"
                            ? "bg-success/20 text-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <div className="h-2 w-2 rounded-full bg-current" />
                        In Transit
                      </div>
                      <div className="h-px w-4 bg-border" />
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-muted text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-current" />
                        Delivered
                      </div>
                    </div>
                  </div>

                  {/* Approval Chain */}
                  <div className="border-t pt-4">
                    <p className="font-medium text-sm mb-2">Approval Chain</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Sales: {order.salesPerson}</p>
                      {order.asm && <p>ASM: {order.asm}</p>}
                      {order.gm && <p>GM: {order.gm}</p>}
                      {order.ceo && <p>CEO: {order.ceo}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delivered Orders */}
      {deliveredOrders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recently Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveredOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg bg-success/5"
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
                      Delivered to: {order.deliveryAddress}
                    </p>
                  </div>
                  {order.estimatedDelivery && (
                    <div className="text-sm text-muted-foreground">
                      {order.estimatedDelivery}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
