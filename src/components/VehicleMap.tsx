import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Vehicle {
  id: string;
  orderNumber: string;
  position: [number, number];
  destination: [number, number];
  clientName: string;
}

export function VehicleMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [mapboxToken, setMapboxToken] = useState("");
  const [isMapReady, setIsMapReady] = useState(false);

  // Simulated vehicle data with Indian coordinates
  const vehicles: Vehicle[] = [
    {
      id: "ORD-004",
      orderNumber: "BLK-2025-004",
      position: [77.5946, 12.9716], // Bangalore
      destination: [77.6033, 13.0358], // Destination in Bangalore
      clientName: "Quick Build Supplies",
    },
    {
      id: "ORD-010",
      orderNumber: "BLK-2025-010",
      position: [72.8777, 19.076], // Mumbai
      destination: [72.9781, 19.1872], // Destination in Mumbai
      clientName: "BuildFast Dealers",
    },
  ];

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || isMapReady) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [77.5946, 12.9716], // Center on Bangalore
        zoom: 11,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      map.current.on("load", () => {
        setIsMapReady(true);

        // Add markers for each vehicle
        vehicles.forEach((vehicle) => {
          const el = document.createElement("div");
          el.className = "vehicle-marker";
          el.style.cssText = `
            width: 30px;
            height: 30px;
            background-color: hsl(var(--primary));
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
          `;

          const marker = new mapboxgl.Marker(el)
            .setLngLat(vehicle.position)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `
                <div style="padding: 8px;">
                  <h3 style="font-weight: bold; margin-bottom: 4px;">${vehicle.orderNumber}</h3>
                  <p style="font-size: 14px; color: #666;">${vehicle.clientName}</p>
                  <p style="font-size: 12px; color: #999; margin-top: 4px;">In Transit</p>
                </div>
                `
              )
            )
            .addTo(map.current!);

          markers.current[vehicle.id] = marker;

          // Add destination marker
          const destEl = document.createElement("div");
          destEl.style.cssText = `
            width: 20px;
            height: 20px;
            background-color: hsl(var(--success));
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          `;

          new mapboxgl.Marker(destEl)
            .setLngLat(vehicle.destination)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `
                <div style="padding: 8px;">
                  <h3 style="font-weight: bold; margin-bottom: 4px;">Destination</h3>
                  <p style="font-size: 14px; color: #666;">${vehicle.clientName}</p>
                </div>
                `
              )
            )
            .addTo(map.current!);

          // Draw route line
          if (map.current?.getSource(`route-${vehicle.id}`)) return;

          map.current?.addSource(`route-${vehicle.id}`, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [vehicle.position, vehicle.destination],
              },
            },
          });

          map.current?.addLayer({
            id: `route-${vehicle.id}`,
            type: "line",
            source: `route-${vehicle.id}`,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "hsl(var(--primary))",
              "line-width": 3,
              "line-dasharray": [2, 2],
            },
          });
        });
      });

      // Simulate vehicle movement
      const interval = setInterval(() => {
        vehicles.forEach((vehicle) => {
          const marker = markers.current[vehicle.id];
          if (!marker) return;

          const currentPos = marker.getLngLat();
          const destPos = vehicle.destination;

          // Move slightly towards destination
          const newLng = currentPos.lng + (destPos[0] - currentPos.lng) * 0.01;
          const newLat = currentPos.lat + (destPos[1] - currentPos.lat) * 0.01;

          marker.setLngLat([newLng, newLat]);
        });
      }, 2000);

      return () => {
        clearInterval(interval);
        map.current?.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [mapboxToken, isMapReady]);

  if (!mapboxToken) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Map Configuration Required</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please enter your Mapbox public token to view live vehicle tracking. Get your token from{" "}
              <a
                href="https://mapbox.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.eyJ1..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-card p-3 rounded-lg shadow-lg border">
        <p className="text-sm font-medium mb-1">Live Tracking</p>
        <p className="text-xs text-muted-foreground">{vehicles.length} vehicles in transit</p>
      </div>
    </div>
  );
}
