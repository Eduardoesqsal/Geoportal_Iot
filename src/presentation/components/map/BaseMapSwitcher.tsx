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
    <div className="flex flex-col rounded-xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] border border-white/20">
      {maps.map((m, i) => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          title={m.label}
          className={`w-9 h-9 flex items-center justify-center text-xs transition-all duration-200 cursor-pointer ${
            current === m.key
              ? 'bg-graphite-900 text-white shadow-inner'
              : 'bg-white text-graphite-700 hover:bg-graphite-100'
          } ${i < maps.length - 1 ? 'border-b border-graphite-200' : ''}`}
        >
          {m.icon}
        </button>
      ))}
    </div>
  )
}
