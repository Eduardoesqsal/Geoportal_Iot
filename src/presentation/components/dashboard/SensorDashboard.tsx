import type { Sensor } from '@/domain/entities/Sensor'
import type { WeatherCurrent } from '@/infrastructure/api/weatherService'
import type { AirQualityMeasurement } from '@/infrastructure/api/airQualityService'
import type { EarthquakeFeature } from '@/infrastructure/api/earthquakeService'
import { PieChart } from '@/presentation/components/dashboard/PieChart'
import { IconEarthquake, IconSensor } from '@/presentation/components/ui/Icons'
import { formatFixed } from '@/infrastructure/utils/number'

interface SensorDashboardProps {
  allSensors: Sensor[]
  selectedSensor: Sensor | undefined
  weather: WeatherCurrent | null
  airQuality: AirQualityMeasurement[] | null
  earthquakes: EarthquakeFeature[] | undefined
  nearSensors: string[]
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  online: { label: 'Online', color: 'text-success', bg: 'bg-success/10' },
  offline: { label: 'Offline', color: 'text-graphite-400', bg: 'bg-graphite-700/30' },
  warning: { label: 'Warning', color: 'text-warning', bg: 'bg-warning/10' },
  error: { label: 'Error', color: 'text-danger', bg: 'bg-danger/10' },
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

function safeMagnitude(value: unknown): string {
  return formatFixed(value, 1, '--')
}

export function SensorDashboard({
  allSensors,
  selectedSensor,
  weather,
  airQuality,
  earthquakes,
  nearSensors,
}: SensorDashboardProps) {
  const total = allSensors.length
  const online = allSensors.filter((s) => s.status === 'online').length
  const offline = allSensors.filter((s) => s.status === 'offline').length
  const warning = allSensors.filter((s) => s.status === 'warning').length
  const error = allSensors.filter((s) => s.status === 'error').length
  const eqCount = earthquakes?.length ?? 0

  const pieData = [
    { label: 'Online', value: online, color: '#22c55e' },
    { label: 'Warning', value: warning, color: '#f59e0b' },
    { label: 'Error', value: error, color: '#ef4444' },
    { label: 'Offline', value: offline, color: '#5e5e5e' },
  ]

  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-2 shadow-sm">
          <p className="text-[8px] text-graphite-500 uppercase tracking-wider font-bold">Total</p>
          <p className="mt-0.5 text-lg font-bold text-white/90">{total}</p>
        </div>
        <div className="rounded-lg border border-success/20 bg-success/10 p-2 shadow-sm">
          <p className="text-[8px] text-graphite-500 uppercase tracking-wider font-bold">Online</p>
          <p className="mt-0.5 text-lg font-bold text-success">{online}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-2 shadow-sm">
          <p className="text-[8px] text-graphite-500 uppercase tracking-wider font-bold">Offline</p>
          <p className="mt-0.5 text-lg font-bold text-graphite-400">{offline}</p>
        </div>
        <div className="rounded-lg border border-warning/20 bg-warning/10 p-2 shadow-sm">
          <p className="text-[8px] text-graphite-500 uppercase tracking-wider font-bold">Alerts</p>
          <p className="mt-0.5 text-lg font-bold text-warning">{warning + error}</p>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.035] p-2.5 shadow-sm">
        <p className="text-[8px] text-graphite-500 uppercase tracking-wider mb-2 text-center font-bold">
          Station Distribution
        </p>
        <PieChart data={pieData} size={95} />
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.035] p-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10">
              <IconEarthquake className="w-3 h-3 text-accent" />
            </div>
            <div>
              <p className="text-[8px] text-graphite-500 uppercase tracking-wider font-bold">Earthquakes</p>
              <p className="text-[8px] text-graphite-600">Significant events this month</p>
            </div>
          </div>
          <p className="text-lg font-bold text-accent">{eqCount}</p>
        </div>
      </div>

      {nearSensors.length > 0 && (
        <div className="rounded-lg border border-accent/20 bg-accent/10 p-2.5 shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex h-4.5 w-4.5 items-center justify-center rounded bg-accent/15">
              <svg className="w-2.5 h-2.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
              </svg>
            </div>
            <p className="text-[8px] text-accent uppercase tracking-wider font-bold">
              Near polygon: {nearSensors.length} station{nearSensors.length > 1 ? 's' : ''}
            </p>
          </div>
          <div className="space-y-0.5">
            {nearSensors.map((id) => {
              const s = allSensors.find((x) => x.id === id)
              return s ? (
                <p key={id} className="text-[9px] text-graphite-300 font-medium">
                  {s.name} <span className="text-graphite-600 font-normal">({s.id})</span>
                </p>
              ) : null
            })}
          </div>
        </div>
      )}

      {selectedSensor ? (
        <div className="space-y-2.5">
          <div className="border-t border-graphite-700/30 pt-2.5">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-4.5 h-4.5 rounded-md bg-accent/10 flex items-center justify-center">
                <IconSensor className="w-2.5 h-2.5 text-accent" />
              </div>
              <p className="text-[8px] text-graphite-500 uppercase tracking-wider font-bold">Selected Sensor</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-2.5 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-bold text-white/90">{selectedSensor.name}</h3>
                <span
                  className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${statusConfig[selectedSensor.status]?.bg} ${statusConfig[selectedSensor.status]?.color}`}
                >
                  {statusConfig[selectedSensor.status]?.label}
                </span>
              </div>
              <p className="text-[9px] text-graphite-500 font-mono">{selectedSensor.id}</p>
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                <div className="rounded-md border border-white/10 bg-black/25 p-2">
                  <p className="text-[8px] text-graphite-500">Temp</p>
                  <p className="text-xs font-bold text-white mt-0.5">
                    {formatFixed(selectedSensor.metrics.temperature, 1)}&deg;C
                  </p>
                </div>
                <div className="rounded-md border border-white/10 bg-black/25 p-2">
                  <p className="text-[8px] text-graphite-500">Humidity</p>
                  <p className="text-xs font-bold text-white mt-0.5">
                    {formatFixed(selectedSensor.metrics.humidity, 0)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {weather && (
            <div>
              <p className="text-[8px] text-graphite-500 uppercase tracking-wider mb-1.5 font-bold">Weather</p>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded-md border border-white/10 bg-white/[0.035] p-2 shadow-sm">
                  <p className="text-[8px] text-graphite-500">Temp</p>
                  <p className="text-xs font-bold text-white mt-0.5">
                    {formatFixed(weather.temperature_2m, 1)}&deg;C
                  </p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.035] p-2 shadow-sm">
                  <p className="text-[8px] text-graphite-500">Humidity</p>
                  <p className="text-xs font-bold text-white mt-0.5">
                    {formatFixed(weather.relative_humidity_2m, 0)}%
                  </p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.035] p-2 shadow-sm">
                  <p className="text-[8px] text-graphite-500">Wind</p>
                  <p className="text-xs font-bold text-white mt-0.5">
                    {formatFixed(weather.wind_speed_10m, 1)} km/h
                  </p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.035] p-2 shadow-sm">
                  <p className="text-[8px] text-graphite-500">Pressure</p>
                  <p className="text-xs font-bold text-white mt-0.5">
                    {formatFixed(weather.surface_pressure, 0)} hPa
                  </p>
                </div>
              </div>
            </div>
          )}

          {airQuality && airQuality.length > 0 && (
            <div>
              <p className="text-[8px] text-graphite-500 uppercase tracking-wider mb-1.5 font-bold">Air Quality</p>
              {airQuality.map((m, i) => (
                <div
                  key={i}
                  className="mb-1 rounded-md border border-white/10 bg-white/[0.035] p-2 shadow-sm last:mb-0"
                >
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
          )}
        </div>
      ) : (
        <div className="border-t border-graphite-700/30 pt-2.5">
          <p className="text-[8px] text-graphite-500 uppercase tracking-wider mb-2 font-bold">Recent Earthquakes</p>
          {earthquakes && earthquakes.length > 0 ? (
            <div className="space-y-1">
              {earthquakes.slice(0, 5).map((eq) => (
                <div key={eq.id} className="rounded-md border border-white/10 bg-white/[0.035] p-2 shadow-sm">
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-[9px] text-white/80 truncate font-medium">{eq.properties.title}</p>
                    <span className="text-[8.5px] font-bold text-warning shrink-0 bg-warning/10 px-1 py-0.5 rounded">
                      M {safeMagnitude(eq.properties.mag)}
                    </span>
                  </div>
                  <p className="text-[8px] text-graphite-600 mt-0.5">
                    {new Date(eq.properties.time).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[10px] text-graphite-600 italic">No recent earthquakes</p>
          )}
        </div>
      )}
    </div>
  )
}
