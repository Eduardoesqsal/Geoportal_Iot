import type { Sensor } from '@/domain/entities/Sensor'
import type { WeatherCurrent } from '@/infrastructure/api/weatherService'
import type { AirQualityMeasurement } from '@/infrastructure/api/airQualityService'
import type { EarthquakeFeature } from '@/infrastructure/api/earthquakeService'
import { PieChart } from '@/presentation/components/dashboard/PieChart'
import { IconEarthquake, IconSensor } from '@/presentation/components/ui/Icons'

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
    o3: 'O₃',
    no2: 'NO₂',
    so2: 'SO₂',
    co: 'CO',
  }
  return labels[param] ?? param.toUpperCase()
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
        <div className="bg-graphite-850 rounded-xl p-2.5 border border-graphite-700/40">
          <p className="text-[9px] text-graphite-500 uppercase tracking-wider font-medium">Total</p>
          <p className="text-xl font-bold text-white/90 mt-0.5">{total}</p>
        </div>
        <div className="bg-graphite-850 rounded-xl p-2.5 border border-graphite-700/40">
          <p className="text-[9px] text-graphite-500 uppercase tracking-wider font-medium">Online</p>
          <p className="text-xl font-bold text-success mt-0.5">{online}</p>
        </div>
        <div className="bg-graphite-850 rounded-xl p-2.5 border border-graphite-700/40">
          <p className="text-[9px] text-graphite-500 uppercase tracking-wider font-medium">Offline</p>
          <p className="text-xl font-bold text-graphite-400 mt-0.5">{offline}</p>
        </div>
        <div className="bg-graphite-850 rounded-xl p-2.5 border border-graphite-700/40">
          <p className="text-[9px] text-graphite-500 uppercase tracking-wider font-medium">Alerts</p>
          <p className="text-xl font-bold text-warning mt-0.5">{warning + error}</p>
        </div>
      </div>

      <div className="bg-graphite-850 rounded-xl p-3 border border-graphite-700/40">
        <p className="text-[9px] text-graphite-500 uppercase tracking-wider mb-2 text-center font-medium">Station Distribution</p>
        <PieChart data={pieData} size={100} />
      </div>

      <div className="bg-graphite-850 rounded-xl p-2.5 border border-graphite-700/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <IconEarthquake className="w-3 h-3 text-accent" />
            <p className="text-[9px] text-graphite-500 uppercase tracking-wider font-medium">Earthquakes</p>
          </div>
          <p className="text-lg font-bold text-accent">{eqCount}</p>
        </div>
        <p className="text-[9px] text-graphite-600 mt-0.5">Significant events this month</p>
      </div>

      {nearSensors.length > 0 && (
        <div className="bg-accent/5 rounded-xl p-2.5 border border-accent/20">
          <p className="text-[9px] text-accent uppercase tracking-wider font-medium">
            Near polygon: {nearSensors.length} station{nearSensors.length > 1 ? 's' : ''}
          </p>
          <div className="mt-1.5 space-y-0.5">
            {nearSensors.map((id) => {
              const s = allSensors.find((x) => x.id === id)
              return s ? (
                <p key={id} className="text-[10px] text-graphite-300">
                  {s.name} <span className="text-graphite-600">({s.id})</span>
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
              <IconSensor className="w-3 h-3 text-accent" />
              <p className="text-[9px] text-graphite-500 uppercase tracking-wider font-medium">Selected Sensor</p>
            </div>
            <div className="bg-graphite-850 rounded-xl p-3 border border-graphite-700/40">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-white/90">{selectedSensor.name}</h3>
                <span
                  className={`text-[9px] font-medium px-1.5 py-0.5 rounded-md ${statusConfig[selectedSensor.status]?.bg} ${statusConfig[selectedSensor.status]?.color}`}
                >
                  {statusConfig[selectedSensor.status]?.label}
                </span>
              </div>
              <p className="text-[10px] text-graphite-500 font-mono">{selectedSensor.id}</p>
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                <div className="bg-graphite-800 rounded-lg p-2">
                  <p className="text-[9px] text-graphite-500">Temp</p>
                  <p className="text-xs font-bold text-white">
                    {selectedSensor.metrics.temperature?.toFixed(1)}°C
                  </p>
                </div>
                <div className="bg-graphite-800 rounded-lg p-2">
                  <p className="text-[9px] text-graphite-500">Humidity</p>
                  <p className="text-xs font-bold text-white">
                    {selectedSensor.metrics.humidity?.toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {weather && (
            <div>
              <p className="text-[9px] text-graphite-500 uppercase tracking-wider mb-2 font-medium">Weather</p>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="bg-graphite-850 rounded-lg p-2 border border-graphite-700/40">
                  <p className="text-[9px] text-graphite-500">Temp</p>
                  <p className="text-sm font-bold text-white">
                    {weather.temperature_2m?.toFixed(1)}°C
                  </p>
                </div>
                <div className="bg-graphite-850 rounded-lg p-2 border border-graphite-700/40">
                  <p className="text-[9px] text-graphite-500">Humidity</p>
                  <p className="text-sm font-bold text-white">
                    {weather.relative_humidity_2m?.toFixed(0)}%
                  </p>
                </div>
                <div className="bg-graphite-850 rounded-lg p-2 border border-graphite-700/40">
                  <p className="text-[9px] text-graphite-500">Wind</p>
                  <p className="text-sm font-bold text-white">
                    {weather.wind_speed_10m?.toFixed(1)} km/h
                  </p>
                </div>
                <div className="bg-graphite-850 rounded-lg p-2 border border-graphite-700/40">
                  <p className="text-[9px] text-graphite-500">Pressure</p>
                  <p className="text-sm font-bold text-white">
                    {weather.surface_pressure?.toFixed(0)} hPa
                  </p>
                </div>
              </div>
            </div>
          )}

          {airQuality && airQuality.length > 0 && (
            <div>
              <p className="text-[9px] text-graphite-500 uppercase tracking-wider mb-2 font-medium">Air Quality</p>
              {airQuality.map((m, i) => (
                <div
                  key={i}
                  className="bg-graphite-850 rounded-lg p-2 border border-graphite-700/40 mb-1 last:mb-0"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-graphite-300">{paramLabel(m.parameter)}</p>
                    <p className="text-xs font-bold text-white">
                      {m.value} <span className="text-graphite-500 font-normal">{m.unit}</span>
                    </p>
                  </div>
                  <p className="text-[9px] text-graphite-600">{m.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="border-t border-graphite-700/30 pt-2.5">
          <p className="text-[9px] text-graphite-500 uppercase tracking-wider mb-2 font-medium">Recent Earthquakes</p>
          {earthquakes && earthquakes.length > 0 ? (
            <div className="space-y-1">
              {earthquakes.slice(0, 5).map((eq) => (
                <div key={eq.id} className="bg-graphite-850 rounded-lg p-2 border border-graphite-700/40">
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-[10px] text-white/80 truncate">{eq.properties.title}</p>
                    <span className="text-[10px] font-bold text-warning shrink-0">
                      M {eq.properties.mag.toFixed(1)}
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
