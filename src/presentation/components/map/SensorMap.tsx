'use client'

import { MapContainer, TileLayer, Marker, Popup, GeoJSON, CircleMarker } from 'react-leaflet'
import L from 'leaflet'
import type { Sensor } from '@/domain/entities/Sensor'
import type { GeoJsonObject } from 'geojson'
import type { EarthquakeFeature } from '@/infrastructure/api/earthquakeService'
import type { BaseMapType } from '@/presentation/components/map/BaseMapSwitcher'
import { formatFixed, toFiniteNumber } from '@/presentation/utils/number'
import 'leaflet/dist/leaflet.css'

interface SensorMapProps {
  sensors: Sensor[]
  onSensorClick: (id: string) => void
  selectedId: string | null
  geoJsonData?: Record<string, unknown> | null
  earthquakes?: EarthquakeFeature[]
  showEarthquakes?: boolean
  baseMap?: BaseMapType
}

const baseLayers: Record<BaseMapType, { url: string; attribution: string }> = {
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri',
  },
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap',
  },
  dark: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri',
  },
}

const labelLayers: Record<BaseMapType, { url: string; attribution: string } | null> = {
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri',
  },
  street: null,
  dark: null,
}

function createMarkerIcon(color: string, selected: boolean) {
  const outerSize = selected ? 24 : 18
  const innerSize = selected ? 12 : 8
  const glowColor = selected ? '#f97316' : color

  return new L.DivIcon({
    className: 'custom-marker',
    html: `<div style="
      width:${outerSize}px;height:${outerSize}px;
      border-radius:50%;
      background:rgba(255,255,255,0.95);
      border:2px solid ${selected ? '#f97316' : 'rgba(255,255,255,0.8)'};
      box-shadow:0 2px 8px rgba(0,0,0,0.35), 0 0 ${selected ? 16 : 0}px ${glowColor};
      display:flex;align-items:center;justify-content:center;
      transition:all 0.2s ease;
    "><div style="
      width:${innerSize}px;height:${innerSize}px;
      border-radius:50%;
      background:${color};
      box-shadow:inset 0 1px 2px rgba(0,0,0,0.2);
    "></div></div>`,
    iconSize: [outerSize, outerSize],
    iconAnchor: [outerSize / 2, outerSize / 2],
  })
}

const iconSelected = new L.DivIcon({
  className: 'custom-marker',
  html: '<div style="width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,0.95);border:2px solid #f97316;box-shadow:0 2px 8px rgba(0,0,0,0.35),0 0 16px rgba(249,115,22,0.4);display:flex;align-items:center;justify-content:center;"><div style="width:12px;height:12px;border-radius:50%;background:#f97316;box-shadow:inset 0 1px 2px rgba(0,0,0,0.2);"></div></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

function getIcon(sensor: Sensor, isSelected: boolean) {
  if (isSelected) return iconSelected

  switch (sensor.status) {
    case 'online':
      return createMarkerIcon('#22c55e', false)
    case 'offline':
      return createMarkerIcon('#5e5e5e', false)
    case 'warning':
      return createMarkerIcon('#f59e0b', false)
    case 'error':
      return createMarkerIcon('#ef4444', false)
    default:
      return createMarkerIcon('#5e5e5e', false)
  }
}

function getBounds(sensors: Sensor[]) {
  if (sensors.length === 0) return undefined

  const lats = sensors.map((s) => toFiniteNumber(s.location.lat))
  const lngs = sensors.map((s) => toFiniteNumber(s.location.lng))

  return L.latLngBounds(
    [Math.min(...lats) - 0.5, Math.min(...lngs) - 0.5],
    [Math.max(...lats) + 0.5, Math.max(...lngs) + 0.5],
  )
}

const eqColors = ['#fee08b', '#fdae61', '#f46d43', '#d73027', '#a50026']

function getMagValue(mag: unknown): number {
  return toFiniteNumber(mag, 0)
}

function getMagColor(mag: unknown): string {
  const value = getMagValue(mag)
  if (value < 4) return eqColors[0]
  if (value < 5) return eqColors[1]
  if (value < 6) return eqColors[2]
  if (value < 7) return eqColors[3]
  return eqColors[4]
}

function getMagRadius(mag: unknown): number {
  const value = getMagValue(mag)
  return Math.max(4, Math.min(18, value * 3))
}

export function SensorMap({
  sensors,
  onSensorClick,
  selectedId,
  geoJsonData,
  earthquakes,
  showEarthquakes = true,
  baseMap = 'satellite',
}: SensorMapProps) {
  const bounds = getBounds(sensors)
  const center: [number, number] = bounds
    ? [bounds.getCenter().lat, bounds.getCenter().lng]
    : [23.6345, -102.5528]

  const base = baseLayers[baseMap]
  const label = labelLayers[baseMap]

  return (
    <MapContainer
      center={center}
      zoom={bounds ? undefined : 5}
      bounds={bounds}
      className="w-full h-full"
      zoomControl={true}
      key={baseMap}
    >
      <TileLayer url={base.url} attribution={base.attribution} />
      {label && <TileLayer url={label.url} attribution={label.attribution} />}

      {sensors.map((sensor) => (
        <Marker
          key={sensor.id}
          position={[sensor.location.lat, sensor.location.lng]}
          icon={getIcon(sensor, sensor.id === selectedId)}
          eventHandlers={{
            click: () => onSensorClick(sensor.id),
          }}
        >
          <Popup>
            <div className="text-xs" style={{ minWidth: 120 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background:
                      sensor.status === 'online'
                        ? '#22c55e'
                        : sensor.status === 'warning'
                          ? '#f59e0b'
                          : sensor.status === 'error'
                            ? '#ef4444'
                            : '#5e5e5e',
                  }}
                />
                <strong className="text-white" style={{ fontSize: 12 }}>
                  {sensor.name}
                </strong>
              </div>
              <div style={{ color: '#5e5e5e', fontSize: 10, fontFamily: 'monospace', marginBottom: 4 }}>{sensor.id}</div>
              <div style={{ color: '#a8a8a8', fontSize: 11 }}>
                {formatFixed(sensor.metrics.temperature, 1)}&deg;C · {formatFixed(sensor.metrics.humidity, 0)}%
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {showEarthquakes &&
        earthquakes?.map((eq) => {
          const coordinates = eq.geometry.coordinates
          const lng = toFiniteNumber(coordinates[0], 0)
          const lat = toFiniteNumber(coordinates[1], 0)
          const mag = getMagValue(eq.properties.mag)

          return (
            <CircleMarker
              key={eq.id}
              center={[lat, lng]}
              radius={getMagRadius(mag)}
              pathOptions={{
                color: getMagColor(mag),
                fillColor: getMagColor(mag),
                fillOpacity: 0.25,
                weight: 1.5,
              }}
            >
              <Popup>
                <div className="text-xs" style={{ minWidth: 140 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: getMagColor(mag) }} />
                    <strong className="text-white" style={{ fontSize: 11 }}>
                      M {formatFixed(mag, 1)} Earthquake
                    </strong>
                  </div>
                  <div style={{ color: '#a8a8a8', fontSize: 10, marginBottom: 2 }}>{eq.properties.title}</div>
                  <div style={{ color: '#5e5e5e', fontSize: 9 }}>{new Date(eq.properties.time).toLocaleString()}</div>
                </div>
              </Popup>
            </CircleMarker>
          )
        })}

      {geoJsonData && (
        <GeoJSON
          key={JSON.stringify(geoJsonData)}
          data={geoJsonData as unknown as GeoJsonObject}
          style={() => ({
            color: '#f97316',
            weight: 2,
            opacity: 0.6,
            fillOpacity: 0.08,
          })}
        />
      )}
    </MapContainer>
  )
}
