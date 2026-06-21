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

const statusConfig: Record<string, { dot: string; label: string; ring: string }> = {
  online: { dot: 'bg-success shadow-[0_0_6px_rgba(34,197,94,0.5)]', label: 'Online', ring: 'ring-success/30' },
  offline: { dot: 'bg-graphite-500', label: 'Offline', ring: 'ring-graphite-600/30' },
  warning: { dot: 'bg-warning shadow-[0_0_6px_rgba(245,158,11,0.5)]', label: 'Warning', ring: 'ring-warning/30' },
  error: { dot: 'bg-danger shadow-[0_0_6px_rgba(239,68,68,0.5)]', label: 'Error', ring: 'ring-danger/30' },
}

export function SensorList({ sensors, selectedId, onSelect, isLoading }: SensorListProps) {
  if (isLoading) return <LoadingSpinner message="Loading sensors..." />

  if (sensors.length === 0)
    return <EmptyState title="No sensors" description="No sensors match your filters." />

  return (
    <div className="space-y-1 overflow-y-auto flex-1 pr-1 -mr-1">
      {sensors.map((sensor) => {
        const st = statusConfig[sensor.status]
        return (
          <button
            key={sensor.id}
            onClick={() => onSelect(sensor.id)}
            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer group ${
              selectedId === sensor.id
                ? 'bg-gradient-to-r from-accent/10 to-transparent ring-1 ring-accent/25 shadow-[0_0_12px_rgba(163,230,53,0.04)]'
                : 'hover:bg-white/[0.03] hover:ring-1 hover:ring-graphite-700/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  selectedId === sensor.id
                    ? 'bg-accent/15 text-accent shadow-sm'
                    : 'bg-graphite-800 text-graphite-400 group-hover:bg-graphite-750'
                }`}>
                  <IconSensor className={`w-4 h-4 ${selectedId === sensor.id ? 'text-accent' : ''}`} />
                </div>
                <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-graphite-900 ${st.dot}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-semibold truncate ${
                    selectedId === sensor.id ? 'text-accent' : 'text-white/80 group-hover:text-white'
                  }`}>{sensor.name}</span>
                  {sensor.status !== 'online' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-graphite-800 text-graphite-400 font-semibold uppercase tracking-wider">
                      {sensor.status}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] text-graphite-500 font-mono">{sensor.id}</span>
                  <span className="text-[8px] text-graphite-700">|</span>
                  <span className="text-[10px] text-graphite-400 font-medium">
                    {sensor.metrics.temperature?.toFixed(1)}°C
                  </span>
                  <span className="text-[8px] text-graphite-700">/</span>
                  <span className="text-[10px] text-graphite-400 font-medium">
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
