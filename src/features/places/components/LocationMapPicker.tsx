
"use client";

import { useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface LocationMapPickerProps {
  latitude: number | null;
  longitude: number | null;
  onChange: (latitude: number, longitude: number) => void;
}

// Ikon pin lokasi khusus.
const locationIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 34px;
      height: 34px;
      background: #718255;
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 9px;
        height: 9px;
        background: white;
        border-radius: 50%;
      "></div>
    </div>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

// Mengatur posisi peta saat koordinat berubah.
function MapController({
  latitude,
  longitude,
}: {
  latitude: number | null;
  longitude: number | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      map.setView([latitude, longitude], 17);
    }
  }, [latitude, longitude, map]);

  return null;
}

// Menangkap klik pada peta.
function MapClickHandler({
  onChange,
}: {
  onChange: (latitude: number, longitude: number) => void;
}) {
  useMapEvents({
    click(event) {
      onChange(
        Number(event.latlng.lat.toFixed(7)),
        Number(event.latlng.lng.toFixed(7))
      );
    },
  });

  return null;
}

export default function LocationMapPicker({
  latitude,
  longitude,
  onChange,
}: LocationMapPickerProps) {
  // Titik awal peta berada di sekitar kawasan Kayutangan, Malang.
  // Titik ini hanya posisi awal tampilan peta, bukan koordinat tempat.
  const defaultCenter: [number, number] = [-7.977, 112.630];

  const hasCoordinates =
    latitude !== null &&
    longitude !== null &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude);

  const center: [number, number] = hasCoordinates
    ? [latitude, longitude]
    : defaultCenter;

  return (
    <div className="w-full h-[230px] rounded-2xl overflow-hidden border border-neutral-200 relative">
      <MapContainer
        center={center}
        zoom={hasCoordinates ? 17 : 14}
        scrollWheelZoom
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onChange={onChange} />

        <MapController
          latitude={latitude}
          longitude={longitude}
        />

        {hasCoordinates && (
          <Marker
            position={[latitude, longitude]}
            icon={locationIcon}
          />
        )}
      </MapContainer>

      <div className="absolute bottom-3 left-3 right-3 z-[400] pointer-events-none">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
          <p className="text-[10px] text-neutral-600 text-center">
            Klik peta untuk menentukan titik lokasi tempat wisata.
          </p>
        </div>
      </div>
    </div>
  );
}
