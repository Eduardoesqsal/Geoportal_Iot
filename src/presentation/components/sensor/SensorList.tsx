import type { Sensor } from '@/domain/entities/Sensor'
import { EmptyState } from '@/presentation/components/common/EmptyState'
import { LoadingSpinner } from '@/presentation/components/common/LoadingSpinner'
import { IconSensor } from '@/presentation/components/ui/Icons'
import { formatFixed } from '@/infrastructure/utils/number'

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

  if (sensors.length === 0) {
    return <EmptyState title="No sensors" description="No sensors match your filters." />
  }

  return (
    <div className="-mr-1 flex-1 space-y-1.5 overflow-y-auto pr-1">
      {sensors.map((sensor) => {
        const st = statusConfig[sensor.status]

        return (
          <button
            key={sensor.id}
            onClick={() => onSelect(sensor.id)}
            className={`group w-full cursor-pointer rounded-lg border px-2 py-1.5 text-left transition-all duration-200 ${
              selectedId === sensor.id
                ? 'border-accent/30 bg-gradient-to-r from-accent/12 to-white/[0.03] shadow-[0_0_16px_rgba(163,230,53,0.05)]'
                : 'border-white/5 bg-white/[0.025] hover:border-white/10 hover:bg-white/[0.045]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="relative shrink-0">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200 ${
                    selectedId === sensor.id
                      ? 'bg-accent/15 text-accent shadow-sm'
                      : 'bg-black/25 text-graphite-400 group-hover:bg-white/[0.06]'
                  }`}
                >
                  <IconSensor className={`w-3.5 h-3.5 ${selectedId === sensor.id ? 'text-accent' : ''}`} />
                </div>
                <span className={`absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-graphite-900 ${st.dot}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span
                    className={`truncate text-[10.5px] font-semibold ${
                      selectedId === sensor.id ? 'text-accent' : 'text-white/80 group-hover:text-white'
                    }`}
                  >
                    {sensor.name}
                  </span>
                  {sensor.status !== 'online' && (
                    <span className="rounded-full bg-graphite-800 px-1 py-0.5 text-[7.5px] font-semibold uppercase tracking-wide text-graphite-400">
                      {sensor.status}
                    </span>
                  )}
                </div>

                <div className="mt-0.5 flex items-center gap-1">
                  <span className="text-[8.5px] text-graphite-500 font-mono">{sensor.id}</span>
                  <span className="text-[7.5px] text-graphite-700">|</span>
                  <span className="text-[8.5px] text-graphite-400 font-medium">
                    {formatFixed(sensor.metrics.temperature, 1)}&deg;C
                  </span>
                  <span className="text-[7.5px] text-graphite-700">/</span>
                  <span className="text-[8.5px] text-graphite-400 font-medium">
                    {formatFixed(sensor.metrics.humidity, 0)}%
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
