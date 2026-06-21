export type BaseMapType = 'satellite' | 'street' | 'dark'

interface BaseMapSwitcherProps {
  current: BaseMapType
  onChange: (map: BaseMapType) => void
}

const maps: { key: BaseMapType; icon: string; label: string }[] = [
  { key: 'satellite', icon: '🛰', label: 'Satellite' },
  { key: 'street', icon: '🗺', label: 'Street' },
  { key: 'dark', icon: '🌙', label: 'Dark' },
]

export function BaseMapSwitcher({ current, onChange }: BaseMapSwitcherProps) {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden border border-graphite-700/60 bg-graphite-850/90 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
      {maps.map((m, i) => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          title={m.label}
          className={`w-9 h-9 flex items-center justify-center text-xs transition-all duration-200 cursor-pointer ${
            current === m.key
              ? 'bg-accent text-graphite-950 shadow-inner'
              : 'bg-transparent text-graphite-400 hover:bg-graphite-700/50 hover:text-graphite-200'
          } ${i < maps.length - 1 ? 'border-b border-graphite-700/40' : ''}`}
        >
          {m.icon}
        </button>
      ))}
    </div>
  )
}
