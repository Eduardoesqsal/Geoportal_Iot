import type { Sensor } from '@/domain/entities/Sensor'
import type { WeatherCurrent } from '@/infrastructure/api/weatherService'
import type { AirQualityMeasurement } from '@/infrastructure/api/airQualityService'
import type { EarthquakeFeature } from '@/infrastructure/api/earthquakeService'
import { PieChart } from '@/presentation/components/dashboard/PieChart'
import { IconEarthquake, IconSensor } from '@/presentation/components/ui/Icons'
import { formatFixed } from '@/presentation/utils/number'

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
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-xl p-3 border border-graphite-700/40 shadow-sm">
          <p className="text-[9px] text-graphite-500 uppercase tracking-wider font-bold">Total</p>
          <p className="text-2xl font-bold text-white/90 mt-0.5">{total}</p>
        </div>
        <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-xl p-3 border border-graphite-700/40 shadow-sm">
          <p className="text-[9px] text-graphite-500 uppercase tracking-wider font-bold">Online</p>
          <p className="text-2xl font-bold text-success mt-0.5">{online}</p>
        </div>
        <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-xl p-3 border border-graphite-700/40 shadow-sm">
          <p className="text-[9px] text-graphite-500 uppercase tracking-wider font-bold">Offline</p>
          <p className="text-2xl font-bold text-graphite-400 mt-0.5">{offline}</p>
        </div>
        <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-xl p-3 border border-graphite-700/40 shadow-sm">
          <p className="text-[9px] text-graphite-500 uppercase tracking-wider font-bold">Alerts</p>
          <p className="text-2xl font-bold text-warning mt-0.5">{warning + error}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-xl p-3.5 border border-graphite-700/40 shadow-sm">
        <p className="text-[9px] text-graphite-500 uppercase tracking-wider mb-3 text-center font-bold">
          Station Distribution
        </p>
        <PieChart data={pieData} size={110} />
      </div>

      <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-xl p-3 border border-graphite-700/40 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
              <IconEarthquake className="w-3.5 h-3.5 text-accent" />
            </div>
            <div>
              <p className="text-[9px] text-graphite-500 uppercase tracking-wider font-bold">Earthquakes</p>
              <p className="text-[9px] text-graphite-600">Significant events this month</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-accent">{eqCount}</p>
        </div>
      </div>

      {nearSensors.length > 0 && (
        <div className="bg-gradient-to-br from-accent/5 to-transparent rounded-xl p-3 border border-accent/15 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-md bg-accent/15 flex items-center justify-center">
              <svg className="w-3 h-3 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
              </svg>
            </div>
            <p className="text-[9px] text-accent uppercase tracking-wider font-bold">
              Near polygon: {nearSensors.length} station{nearSensors.length > 1 ? 's' : ''}
            </p>
          </div>
          <div className="space-y-1">
            {nearSensors.map((id) => {
              const s = allSensors.find((x) => x.id === id)
              return s ? (
                <p key={id} className="text-[10px] text-graphite-300 font-medium">
                  {s.name} <span className="text-graphite-600 font-normal">({s.id})</span>
                </p>
              ) : null
            })}
          </div>
        </div>
      )}

      {selectedSensor ? (
        <div className="space-y-3">
          <div className="border-t border-graphite-700/30 pt-3">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center">
                <IconSensor className="w-3 h-3 text-accent" />
              </div>
              <p className="text-[9px] text-graphite-500 uppercase tracking-wider font-bold">Selected Sensor</p>
            </div>
            <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-xl p-3.5 border border-graphite-700/40 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-white/90">{selectedSensor.name}</h3>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${statusConfig[selectedSensor.status]?.bg} ${statusConfig[selectedSensor.status]?.color}`}
                >
                  {statusConfig[selectedSensor.status]?.label}
                </span>
              </div>
              <p className="text-[10px] text-graphite-500 font-mono">{selectedSensor.id}</p>
              <div className="grid grid-cols-2 gap-2 mt-2.5">
                <div className="bg-graphite-800/60 rounded-lg p-2.5 border border-graphite-700/30">
                  <p className="text-[9px] text-graphite-500">Temp</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {formatFixed(selectedSensor.metrics.temperature, 1)}&deg;C
                  </p>
                </div>
                <div className="bg-graphite-800/60 rounded-lg p-2.5 border border-graphite-700/30">
                  <p className="text-[9px] text-graphite-500">Humidity</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {formatFixed(selectedSensor.metrics.humidity, 0)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {weather && (
            <div>
              <p className="text-[9px] text-graphite-500 uppercase tracking-wider mb-2 font-bold">Weather</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-lg p-2.5 border border-graphite-700/40 shadow-sm">
                  <p className="text-[9px] text-graphite-500">Temp</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {formatFixed(weather.temperature_2m, 1)}&deg;C
                  </p>
                </div>
                <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-lg p-2.5 border border-graphite-700/40 shadow-sm">
                  <p className="text-[9px] text-graphite-500">Humidity</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {formatFixed(weather.relative_humidity_2m, 0)}%
                  </p>
                </div>
                <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-lg p-2.5 border border-graphite-700/40 shadow-sm">
                  <p className="text-[9px] text-graphite-500">Wind</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {formatFixed(weather.wind_speed_10m, 1)} km/h
                  </p>
                </div>
                <div className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-lg p-2.5 border border-graphite-700/40 shadow-sm">
                  <p className="text-[9px] text-graphite-500">Pressure</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {formatFixed(weather.surface_pressure, 0)} hPa
                  </p>
                </div>
              </div>
            </div>
          )}

          {airQuality && airQuality.length > 0 && (
            <div>
              <p className="text-[9px] text-graphite-500 uppercase tracking-wider mb-2 font-bold">Air Quality</p>
              {airQuality.map((m, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-lg p-2.5 border border-graphite-700/40 shadow-sm mb-1.5 last:mb-0"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-semibold text-graphite-300">{paramLabel(m.parameter)}</p>
                    <p className="text-xs font-bold text-white">
                      {m.value} <span className="text-graphite-500 font-normal">{m.unit}</span>
                    </p>
                  </div>
                  <p className="text-[9px] text-graphite-600 mt-0.5">{m.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="border-t border-graphite-700/30 pt-3">
          <p className="text-[9px] text-graphite-500 uppercase tracking-wider mb-2.5 font-bold">Recent Earthquakes</p>
          {earthquakes && earthquakes.length > 0 ? (
            <div className="space-y-1.5">
              {earthquakes.slice(0, 5).map((eq) => (
                <div key={eq.id} className="bg-gradient-to-br from-graphite-850 to-graphite-900 rounded-lg p-2.5 border border-graphite-700/40 shadow-sm">
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-[10px] text-white/80 truncate font-medium">{eq.properties.title}</p>
                    <span className="text-[10px] font-bold text-warning shrink-0 bg-warning/10 px-1.5 py-0.5 rounded">
                      M {safeMagnitude(eq.properties.mag)}
                    </span>
                  </div>
                  <p className="text-[9px] text-graphite-600 mt-0.5">
                    {new Date(eq.properties.time).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-graphite-600 italic">No recent earthquakes</p>
          )}
        </div>
      )}
    </div>
  )
}
