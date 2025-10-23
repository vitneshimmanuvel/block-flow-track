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

  // Demo vehicle data with realistic routes in Bangalore
  const vehicles: Vehicle[] = [
    {
      id: "ORD-004",
      orderNumber: "BLK-2025-004",
      position: [77.5946, 12.9716], // Starting from central Bangalore
      destination: [77.7500, 13.0500], // Whitefield area
      clientName: "Quick Build Supplies - Whitefield",
    },
    {
      id: "ORD-010",
      orderNumber: "BLK-2025-010",
      position: [77.5500, 12.9000], // Starting from Jayanagar
      destination: [77.5946, 13.1500], // Hebbal area
      clientName: "BuildFast Dealers - Hebbal",
    },
    {
      id: "ORD-015",
      orderNumber: "BLK-2025-015",
      position: [77.6200, 12.9350], // Starting from Koramangala
      destination: [77.4900, 12.9200], // Rajajinagar area
      clientName: "MegaConstruct Ltd - Rajajinagar",
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
        zoom: 10.5,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      map.current.on("load", () => {
        setIsMapReady(true);

        // Add markers for each vehicle
        vehicles.forEach((vehicle) => {
          const el = document.createElement("div");
          el.className = "vehicle-marker";
          el.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" fill="hsl(var(--primary))" opacity="0.2"/>
              <circle cx="12" cy="12" r="8" fill="hsl(var(--primary))"/>
              <path d="M12 8L16 16H8L12 8Z" fill="white"/>
            </svg>
          `;
          el.style.cssText = `
            width: 32px;
            height: 32px;
            cursor: pointer;
            animation: pulse 2s ease-in-out infinite;
          `;

          const marker = new mapboxgl.Marker(el)
            .setLngLat(vehicle.position)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `
                <div style="padding: 12px; min-width: 200px;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <div style="width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: pulse 2s ease-in-out infinite;"></div>
                    <h3 style="font-weight: bold; font-size: 16px;">${vehicle.orderNumber}</h3>
                  </div>
                  <p style="font-size: 14px; color: #666; margin-bottom: 4px;">${vehicle.clientName}</p>
                  <p style="font-size: 12px; color: #22c55e; font-weight: 600;">🚛 In Transit - Live Tracking</p>
                  <p style="font-size: 11px; color: #999; margin-top: 4px;">Last updated: ${new Date().toLocaleTimeString()}</p>
                </div>
                `
              )
            )
            .addTo(map.current!);

          markers.current[vehicle.id] = marker;

          // Add destination marker
          const destEl = document.createElement("div");
          destEl.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="hsl(var(--success))"/>
            </svg>
          `;
          destEl.style.cssText = `
            width: 28px;
            height: 28px;
            cursor: pointer;
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
              "line-width": 4,
              "line-dasharray": [3, 3],
              "line-opacity": 0.7,
            },
          });
        });
      });

      // Simulate realistic vehicle movement with speed variation
      const interval = setInterval(() => {
        vehicles.forEach((vehicle) => {
          const marker = markers.current[vehicle.id];
          if (!marker) return;

          const currentPos = marker.getLngLat();
          const destPos = vehicle.destination;

          // Calculate distance to destination
          const distLng = destPos[0] - currentPos.lng;
          const distLat = destPos[1] - currentPos.lat;
          const distance = Math.sqrt(distLng * distLng + distLat * distLat);

          // If very close to destination, reset to start (loop demo)
          if (distance < 0.001) {
            marker.setLngLat(vehicle.position);
            return;
          }

          // Variable speed - faster when far, slower when close
          const speed = Math.max(0.002, Math.min(0.008, distance * 0.05));
          
          // Move towards destination with some randomness for realistic movement
          const newLng = currentPos.lng + distLng * speed + (Math.random() - 0.5) * 0.0001;
          const newLat = currentPos.lat + distLat * speed + (Math.random() - 0.5) * 0.0001;

          marker.setLngLat([newLng, newLat]);

          // Update route line
          if (map.current?.getSource(`route-${vehicle.id}`)) {
            const source = map.current.getSource(`route-${vehicle.id}`) as mapboxgl.GeoJSONSource;
            source.setData({
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [[newLng, newLat], vehicle.destination],
              },
            });
          }
        });
      }, 1000);

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
      <div className="absolute top-4 left-4 bg-card p-4 rounded-lg shadow-lg border">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <p className="text-sm font-semibold">Live Vehicle Tracking</p>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          {vehicles.length} vehicles in transit
        </p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <span className="text-muted-foreground">Active Vehicle</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="hsl(var(--success))"/>
            </svg>
            <span className="text-muted-foreground">Destination</span>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
