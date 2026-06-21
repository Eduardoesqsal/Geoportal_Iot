import type { Sensor } from '@/domain/entities/Sensor'
import { EmptyState } from '@/presentation/components/common/EmptyState'
import { LoadingSpinner } from '@/presentation/components/common/LoadingSpinner'
import { IconSensor } from '@/presentation/components/ui/Icons'

interface SensorListProps {
  sensors: Sensor[]
  selectedId: string | null
  onSelect: (id: string) => void
  isLoading: boolean
}

const statusConfig: Record<string, { dot: string; label: string }> = {
  online: { dot: 'bg-success shadow-[0_0_6px_rgba(34,197,94,0.5)]', label: 'Online' },
  offline: { dot: 'bg-graphite-500', label: 'Offline' },
  warning: { dot: 'bg-warning shadow-[0_0_6px_rgba(245,158,11,0.5)]', label: 'Warning' },
  error: { dot: 'bg-danger shadow-[0_0_6px_rgba(239,68,68,0.5)]', label: 'Error' },
}

export function SensorList({ sensors, selectedId, onSelect, isLoading }: SensorListProps) {
  if (isLoading) return <LoadingSpinner message="Loading sensors..." />

  if (sensors.length === 0)
    return <EmptyState title="No sensors" description="No sensors match your filters." />

  return (
    <div className="space-y-1.5 overflow-y-auto flex-1 pr-0.5 -mr-0.5">
      {sensors.map((sensor) => {
        const st = statusConfig[sensor.status]
        return (
          <button
            key={sensor.id}
            onClick={() => onSelect(sensor.id)}
            className={`w-full text-left px-2.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
              selectedId === sensor.id
                ? 'bg-accent/8 ring-1 ring-accent/30'
                : 'hover:bg-graphite-750/60 hover:ring-1 hover:ring-graphite-700/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="relative shrink-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  selectedId === sensor.id
                    ? 'bg-accent/15'
                    : 'bg-graphite-750'
                }`}>
                  <IconSensor className={`w-4 h-4 ${selectedId === sensor.id ? 'text-accent' : 'text-graphite-400'}`} />
                </div>
                <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-graphite-900 ${st.dot}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-medium truncate ${
                    selectedId === sensor.id ? 'text-accent' : 'text-white/80'
                  }`}>{sensor.name}</span>
                  {sensor.status !== 'online' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-graphite-750 text-graphite-400 font-medium uppercase tracking-wider">
                      {sensor.status}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] text-graphite-500 font-mono">{sensor.id}</span>
                  <span className="text-[8px] text-graphite-600">|</span>
                  <span className="text-[10px] text-graphite-400">
                    {sensor.metrics.temperature?.toFixed(1)}°C
                  </span>
                  <span className="text-[8px] text-graphite-600">|</span>
                  <span className="text-[10px] text-graphite-400">
                    {sensor.metrics.humidity?.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
