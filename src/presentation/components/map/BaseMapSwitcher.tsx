import { IconDarkMode, IconMap, IconSatellite } from '@/presentation/components/ui/Icons'

export type BaseMapType = 'satellite' | 'street' | 'dark'

interface BaseMapSwitcherProps {
  current: BaseMapType
  onChange: (map: BaseMapType) => void
}

const maps: { key: BaseMapType; icon: typeof IconSatellite; label: string }[] = [
  { key: 'satellite', icon: IconSatellite, label: 'Satellite' },
  { key: 'street', icon: IconMap, label: 'Street' },
  { key: 'dark', icon: IconDarkMode, label: 'Dark' },
]

export function BaseMapSwitcher({ current, onChange }: BaseMapSwitcherProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-graphite-950/92 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-md">
      {maps.map((m, i) => {
        const Icon = m.icon

        return (
          <button
            key={m.key}
            onClick={() => onChange(m.key)}
            title={m.label}
            className={`flex h-8.5 w-8.5 cursor-pointer items-center justify-center transition-all duration-200 ${
            current === m.key
              ? 'bg-graphite-900 text-white'
              : 'bg-white/[0.035] text-graphite-400 hover:bg-white/[0.08] hover:text-white'
          } ${i < maps.length - 1 ? 'border-b border-white/10' : ''}`}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        )
      })}
    </div>
  )
}
