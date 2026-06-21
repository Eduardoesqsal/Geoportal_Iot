import type { Sensor } from '@/domain/entities/Sensor'
import type { WeatherCurrent } from '@/infrastructure/api/weatherService'
import type { AirQualityMeasurement } from '@/infrastructure/api/airQualityService'
import { LoadingSpinner } from '@/presentation/components/common/LoadingSpinner'
import { EmptyState } from '@/presentation/components/common/EmptyState'
import { IconSensor, IconDroplet, IconWind, IconMap } from '@/presentation/components/ui/Icons'
import { formatFixed } from '@/presentation/utils/number'

interface SensorDetailProps {
  sensor: Sensor | undefined
  isLoading: boolean
  weather: WeatherCurrent | null
  airQuality: AirQualityMeasurement[] | null
}

const statusConfig: Record<string, { label: string; color: string; dot: string; bg: string }> = {
  online: { label: 'Online', color: 'text-success', dot: 'bg-success shadow-[0_0_6px_rgba(34,197,94,0.4)]', bg: 'bg-success/10 border-success/20' },
  offline: { label: 'Offline', color: 'text-graphite-400', dot: 'bg-graphite-500', bg: 'bg-graphite-700/30 border-graphite-600/20' },
  warning: { label: 'Warning', color: 'text-warning', dot: 'bg-warning shadow-[0_0_6px_rgba(245,158,11,0.4)]', bg: 'bg-warning/10 border-warning/20' },
  error: { label: 'Error', color: 'text-danger', dot: 'bg-danger shadow-[0_0_6px_rgba(239,68,68,0.4)]', bg: 'bg-danger/10 border-danger/20' },
}

function paramLabel(param: string): string {
  const labels: Record<string, string> = {
    pm25: 'PM2.5',
    pm10: 'PM10',
    o3: 'O3',
    no2: 'NO2',
    so2: 'SO2',
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
      <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-xl p-2.5 border border-graphite-700/40 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(163,230,53,0.06)]">
            <IconSensor className="w-3 h-3 text-accent" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-bold text-white/90 truncate">{sensor.name}</h3>
            <p className="text-[9px] text-graphite-500 font-mono mt-0.5">{sensor.id}</p>
          </div>
          <div className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded-lg ${status.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            <span className={`text-[9px] font-bold ${status.color}`}>{status.label}</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-xl p-2.5 border border-graphite-700/40 shadow-sm">
        <div className="flex items-center gap-1 mb-2">
          <IconMap className="w-2.5 h-2.5 text-graphite-400" />
          <p className="text-[8px] text-graphite-500 uppercase tracking-wider font-bold">Location</p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px]">
          <div className="bg-graphite-800/80 rounded-lg px-2 py-1.5 font-mono text-graphite-300 flex-1 border border-graphite-700/30">
            {formatFixed(sensor.location.lat, 4)}&deg; N
          </div>
          <div className="bg-graphite-800/80 rounded-lg px-2 py-1.5 font-mono text-graphite-300 flex-1 border border-graphite-700/30">
            {formatFixed(sensor.location.lng, 4)}&deg; E
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-xl p-2.5 border border-graphite-700/40 shadow-sm">
        <p className="text-[8px] text-graphite-500 uppercase tracking-wider mb-2 font-bold">Metrics</p>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="bg-graphite-800/60 rounded-lg p-2 border border-graphite-700/30">
            <p className="text-[8px] text-graphite-500 font-medium">Temperature</p>
            <p className="text-sm font-bold text-white mt-0.5">{formatFixed(sensor.metrics.temperature, 1)}&deg;C</p>
          </div>
          <div className="bg-graphite-800/60 rounded-lg p-2 border border-graphite-700/30">
            <p className="text-[8px] text-graphite-500 font-medium">Humidity</p>
            <p className="text-sm font-bold text-white mt-0.5">{formatFixed(sensor.metrics.humidity, 0)}%</p>
          </div>
        </div>
      </div>

      {sensor.metrics.pressure !== undefined && (
        <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-xl p-2.5 border border-graphite-700/40 shadow-sm">
          <p className="text-[8px] text-graphite-500 uppercase tracking-wider mb-0.5 font-bold">Pressure</p>
          <p className="text-sm font-bold text-white">{sensor.metrics.pressure} hPa</p>
        </div>
      )}

      {weather && (
        <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-xl p-2.5 border border-graphite-700/40 shadow-sm">
          <div className="flex items-center gap-1 mb-2">
            <div className="w-4.5 h-4.5 rounded bg-info/10 flex items-center justify-center">
              <IconWind className="w-2.5 h-2.5 text-info" />
            </div>
            <p className="text-[8px] text-graphite-500 uppercase tracking-wider font-bold">Weather</p>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="bg-graphite-800/60 rounded-lg p-2 border border-graphite-700/30">
              <p className="text-[8px] text-graphite-500">Temp</p>
              <p className="text-xs font-bold text-white mt-0.5">{formatFixed(weather.temperature_2m, 1)}&deg;C</p>
            </div>
            <div className="bg-graphite-800/60 rounded-lg p-2 border border-graphite-700/30">
              <p className="text-[8px] text-graphite-500">Humidity</p>
              <p className="text-xs font-bold text-white mt-0.5">{formatFixed(weather.relative_humidity_2m, 0)}%</p>
            </div>
            <div className="bg-graphite-800/60 rounded-lg p-2 border border-graphite-700/30">
              <p className="text-[8px] text-graphite-500">Wind</p>
              <p className="text-xs font-bold text-white mt-0.5">{formatFixed(weather.wind_speed_10m, 1)} km/h</p>
            </div>
            <div className="bg-graphite-800/60 rounded-lg p-2 border border-graphite-700/30">
              <p className="text-[8px] text-graphite-500">Pressure</p>
              <p className="text-xs font-bold text-white mt-0.5">{formatFixed(weather.surface_pressure, 0)} hPa</p>
            </div>
          </div>
        </div>
      )}

      {airQuality && airQuality.length > 0 && (
        <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-xl p-2.5 border border-graphite-700/40 shadow-sm">
          <div className="flex items-center gap-1 mb-2">
            <div className="w-4.5 h-4.5 rounded bg-warning/10 flex items-center justify-center">
              <IconDroplet className="w-2.5 h-2.5 text-warning" />
            </div>
            <p className="text-[8px] text-graphite-500 uppercase tracking-wider font-bold">Air Quality</p>
          </div>
          <div className="space-y-1">
            {airQuality.map((m, i) => (
              <div key={i} className="bg-graphite-800/60 rounded-lg p-2 border border-graphite-700/30">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-semibold text-graphite-300">{paramLabel(m.parameter)}</p>
                  <p className="text-[10px] font-bold text-white">
                    {m.value} <span className="text-graphite-500 font-normal">{m.unit}</span>
                  </p>
                </div>
                <p className="text-[8px] text-graphite-600 mt-0.5">{m.location}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {sensor.lastUpdated ? (
        <p className="text-[9px] text-graphite-600 text-center pt-1 font-medium">
          Updated {new Date(sensor.lastUpdated).toLocaleString()}
        </p>
      ) : null}
    </div>

  )
}
