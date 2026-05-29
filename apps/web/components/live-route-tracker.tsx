"use client";

import { useEffect, useMemo, useState } from "react";

type RoutePoint = {
  label: string;
  latitude: number;
  longitude: number;
};

type LiveRouteTrackerProps = {
  title: string;
  roleLabel: string;
  movingLabel: string;
  origin: RoutePoint;
  destination: RoutePoint;
  active: boolean;
};

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function getDistanceKm(from: RoutePoint, to: RoutePoint) {
  const earthRadiusKm = 6371;
  const deltaLatitude = toRadians(to.latitude - from.latitude);
  const deltaLongitude = toRadians(to.longitude - from.longitude);
  const originLatitude = toRadians(from.latitude);
  const destinationLatitude = toRadians(to.latitude);

  const haversine =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(originLatitude) * Math.cos(destinationLatitude) * Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function interpolatePoint(from: RoutePoint, to: RoutePoint, progress: number): RoutePoint {
  return {
    label: from.label,
    latitude: from.latitude + (to.latitude - from.latitude) * progress,
    longitude: from.longitude + (to.longitude - from.longitude) * progress
  };
}

function getMapUrl(point: RoutePoint) {
  const padding = 0.011;
  const west = point.longitude - padding;
  const south = point.latitude - padding;
  const east = point.longitude + padding;
  const north = point.latitude + padding;

  return `https://www.openstreetmap.org/export/embed.html?bbox=${west}%2C${south}%2C${east}%2C${north}&layer=mapnik&marker=${point.latitude}%2C${point.longitude}`;
}

function getExternalMapUrl(point: RoutePoint) {
  return `https://www.openstreetmap.org/?mlat=${point.latitude}&mlon=${point.longitude}#map=17/${point.latitude}/${point.longitude}`;
}

export function LiveRouteTracker({ title, roleLabel, movingLabel, origin, destination, active }: LiveRouteTrackerProps) {
  const [progress, setProgress] = useState(active ? 0.28 : 0.08);
  const currentPoint = useMemo(() => interpolatePoint(origin, destination, progress), [destination, origin, progress]);
  const totalDistance = useMemo(() => getDistanceKm(origin, destination), [destination, origin]);
  const remainingDistance = getDistanceKm(currentPoint, destination);
  const etaMinutes = Math.max(1, Math.round((remainingDistance / 18) * 60));
  const mapUrl = useMemo(() => getMapUrl(currentPoint), [currentPoint]);
  const currentMapLink = useMemo(() => getExternalMapUrl(currentPoint), [currentPoint]);
  const destinationMapLink = useMemo(() => getExternalMapUrl(destination), [destination]);

  useEffect(() => {
    if (!active || progress >= 0.96) {
      return;
    }

    const timer = window.setInterval(() => {
      setProgress((current) => Math.min(current + 0.08, 0.96));
    }, 5000);

    return () => window.clearInterval(timer);
  }, [active, progress]);

  useEffect(() => {
    setProgress(active ? 0.28 : 0.08);
  }, [active, destination.latitude, destination.longitude, origin.latitude, origin.longitude]);

  return (
    <section className="overflow-hidden rounded-[1.25rem] border border-lakbay-green/20 bg-white shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lakbay-green/10 bg-lakbay-cream px-5 py-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-lakbay-green">{roleLabel}</p>
          <h3 className="mt-1 text-lg font-black text-lakbay-deep">{title}</h3>
        </div>
        <p className="rounded-full bg-white px-3 py-1 text-xs font-black text-lakbay-blue shadow-sm">
          {active ? "Live demo active" : "Preview mode"}
        </p>
      </div>

      <div className="relative min-h-[320px] bg-slate-100">
        <iframe
          title={`${title} map`}
          src={mapUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-[1rem] border border-white/70 bg-white/94 p-4 shadow-soft backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black text-slate-950">{movingLabel}</p>
              <p className="mt-1 text-xs font-bold text-lakbay-blue">
                {currentPoint.latitude.toFixed(4)}, {currentPoint.longitude.toFixed(4)}
              </p>
            </div>
            <p className="rounded-full bg-lakbay-green px-3 py-1 text-xs font-black text-white">{Math.round(progress * 100)}%</p>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-lakbay-gold" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>

          <div className="mt-3 grid gap-2 text-xs font-bold text-slate-600 sm:grid-cols-3">
            <p>Remaining: {remainingDistance.toFixed(1)} km</p>
            <p>ETA: {etaMinutes} min</p>
            <p>Total route: {totalDistance.toFixed(1)} km</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 p-5 text-sm text-lakbay-deep/70 sm:grid-cols-2">
        <div className="route-ticket rounded-xl p-4">
          <p className="font-black text-lakbay-deep">Pickup or meeting point</p>
          <p className="mt-1">{origin.label}</p>
        </div>
        <div className="route-ticket rounded-xl p-4">
          <p className="font-black text-lakbay-deep">Destination</p>
          <p className="mt-1">{destination.label}</p>
        </div>
        <a href={currentMapLink} target="_blank" rel="noreferrer" className="font-black text-lakbay-green hover:text-lakbay-deep">
          Open current location
        </a>
        <a href={destinationMapLink} target="_blank" rel="noreferrer" className="font-black text-lakbay-blue hover:text-lakbay-deep">
          Open destination
        </a>
      </div>
    </section>
  );
}
