import type { Sensor } from '@/domain/entities/Sensor'
import type { WeatherCurrent } from '@/infrastructure/api/weatherService'
import type { AirQualityMeasurement } from '@/infrastructure/api/airQualityService'
import { LoadingSpinner } from '@/presentation/components/common/LoadingSpinner'
import { EmptyState } from '@/presentation/components/common/EmptyState'
import { IconSensor, IconDroplet, IconWind } from '@/presentation/components/ui/Icons'

interface SensorDetailProps {
  sensor: Sensor | undefined
  isLoading: boolean
  weather: WeatherCurrent | null
  airQuality: AirQualityMeasurement[] | null
}

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  online: { label: 'Online', color: 'text-success', dot: 'bg-success shadow-[0_0_6px_rgba(34,197,94,0.4)]' },
  offline: { label: 'Offline', color: 'text-graphite-400', dot: 'bg-graphite-500' },
  warning: { label: 'Warning', color: 'text-warning', dot: 'bg-warning shadow-[0_0_6px_rgba(245,158,11,0.4)]' },
  error: { label: 'Error', color: 'text-danger', dot: 'bg-danger shadow-[0_0_6px_rgba(239,68,68,0.4)]' },
}

function paramLabel(param: string): string {
  const labels: Record<string, string> = {
    pm25: 'PM2.5',
    pm10: 'PM10',
    o3: 'O₃',
    no2: 'NO₂',
    so2: 'SO₂',
    co: 'CO',
  }
  return labels[param] ?? param.toUpperCase()
}

export function SensorDetail({ sensor, isLoading, weather, airQuality }: SensorDetailProps) {
  if (isLoading) return <LoadingSpinner message="Loading sensor details..." />

  if (!sensor) return <EmptyState title="Select a sensor" description="Click on a sensor to view its details." />

  const status = statusConfig[sensor.status]

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2.5 bg-graphite-850 rounded-xl p-3 border border-graphite-700/40">
        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
          <IconSensor className="w-4 h-4 text-accent" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white/90 truncate">{sensor.name}</h3>
          <p className="text-[10px] text-graphite-500 font-mono">{sensor.id}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${status.dot}`} />
          <span className={`text-[10px] font-medium ${status.color}`}>{status.label}</span>
        </div>
      </div>

      <div className="bg-graphite-850 rounded-xl p-3 border border-graphite-700/40">
        <p className="text-[9px] text-graphite-500 uppercase tracking-wider mb-2 font-medium">Location</p>
        <div className="flex items-center gap-2 text-xs">
          <div className="bg-graphite-800 rounded-lg px-2.5 py-1.5 font-mono text-graphite-300 flex-1">
            {sensor.location.lat.toFixed(4)}°N
          </div>
          <div className="bg-graphite-800 rounded-lg px-2.5 py-1.5 font-mono text-graphite-300 flex-1">
            {sensor.location.lng.toFixed(4)}°E
          </div>
        </div>
      </div>

      <div className="bg-graphite-850 rounded-xl p-3 border border-graphite-700/40">
        <p className="text-[9px] text-graphite-500 uppercase tracking-wider mb-2 font-medium">Metrics</p>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="bg-graphite-800 rounded-lg p-2.5">
            <p className="text-[9px] text-graphite-500">Temperature</p>
            <p className="text-base font-bold text-white">{sensor.metrics.temperature?.toFixed(1)}°C</p>
          </div>
          <div className="bg-graphite-800 rounded-lg p-2.5">
            <p className="text-[9px] text-graphite-500">Humidity</p>
            <p className="text-base font-bold text-white">{sensor.metrics.humidity?.toFixed(0)}%</p>
          </div>
        </div>
      </div>

      {sensor.metrics.pressure !== undefined && (
        <div className="bg-graphite-850 rounded-xl p-3 border border-graphite-700/40">
          <p className="text-[9px] text-graphite-500 uppercase tracking-wider mb-1 font-medium">Pressure</p>
          <p className="text-base font-bold text-white">{sensor.metrics.pressure} hPa</p>
        </div>
      )}

      {weather && (
        <div className="bg-graphite-850 rounded-xl p-3 border border-graphite-700/40">
          <div className="flex items-center gap-1.5 mb-2">
            <IconWind className="w-3 h-3 text-graphite-400" />
            <p className="text-[9px] text-graphite-500 uppercase tracking-wider font-medium">Weather</p>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="bg-graphite-800 rounded-lg p-2">
              <p className="text-[9px] text-graphite-500">Temp</p>
              <p className="text-sm font-bold text-white">{weather.temperature_2m?.toFixed(1)}°C</p>
            </div>
            <div className="bg-graphite-800 rounded-lg p-2">
              <p className="text-[9px] text-graphite-500">Humidity</p>
              <p className="text-sm font-bold text-white">{weather.relative_humidity_2m?.toFixed(0)}%</p>
            </div>
            <div className="bg-graphite-800 rounded-lg p-2">
              <p className="text-[9px] text-graphite-500">Wind</p>
              <p className="text-sm font-bold text-white">{weather.wind_speed_10m?.toFixed(1)} km/h</p>
            </div>
            <div className="bg-graphite-800 rounded-lg p-2">
              <p className="text-[9px] text-graphite-500">Pressure</p>
              <p className="text-sm font-bold text-white">{weather.surface_pressure?.toFixed(0)} hPa</p>
            </div>
          </div>
        </div>
      )}

      {airQuality && airQuality.length > 0 && (
        <div className="bg-graphite-850 rounded-xl p-3 border border-graphite-700/40">
          <div className="flex items-center gap-1.5 mb-2">
            <IconDroplet className="w-3 h-3 text-graphite-400" />
            <p className="text-[9px] text-graphite-500 uppercase tracking-wider font-medium">Air Quality</p>
          </div>
          {airQuality.map((m, i) => (
            <div key={i} className="bg-graphite-800 rounded-lg p-2 mb-1 last:mb-0">
              <div className="flex justify-between items-center">
                <p className="text-xs text-graphite-300">{paramLabel(m.parameter)}</p>
                <p className="text-xs font-bold text-white">{m.value} <span className="text-graphite-500 font-normal">{m.unit}</span></p>
              </div>
              <p className="text-[9px] text-graphite-600 mt-0.5">{m.location}</p>
            </div>
          ))}
        </div>
      )}

      {sensor.lastUpdated && (
        <p className="text-[10px] text-graphite-600 text-center pt-1">
          Updated {new Date(sensor.lastUpdated).toLocaleString()}
        </p>
      )}
    </div>
  )
}
