import { IconEarthquake, IconSun } from '@/presentation/components/ui/Icons'

interface LayerToggleProps {
  showEarthquakes: boolean
  onToggleEarthquakes: (v: boolean) => void
  showWeather: boolean
  onToggleWeather: (v: boolean) => void
}

export function LayerToggle({
  showEarthquakes,
  onToggleEarthquakes,
  showWeather,
  onToggleWeather,
}: LayerToggleProps) {
  return (
    <div className="space-y-1.5 rounded-lg border border-white/10 bg-white/[0.035] p-2 shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-0.5 pb-1.5">
        <div className="flex h-4.5 w-4.5 items-center justify-center rounded bg-accent/10 text-accent ring-1 ring-accent/20">
          <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
          </svg>
        </div>
        <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-graphite-300">Overlays</p>
      </div>
      <div className="space-y-1">
        <button
          onClick={() => onToggleEarthquakes(!showEarthquakes)}
          className={`flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-[10px] transition-all duration-150 ${
            showEarthquakes
              ? 'bg-accent/12 text-white ring-1 ring-accent/20'
              : 'bg-black/20 text-graphite-400 ring-1 ring-white/5 hover:bg-white/[0.05] hover:text-graphite-200'
          }`}
        >
          <div className={`flex h-5.5 w-5.5 items-center justify-center rounded transition-all ${
            showEarthquakes ? 'bg-accent/15 text-accent' : 'bg-white/[0.05] text-graphite-500'
          }`}>
            <IconEarthquake className="w-3 h-3" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold leading-none mb-0.5">Earthquakes</p>
            <p className={`text-[8px] font-normal ${showEarthquakes ? 'text-graphite-300' : 'text-graphite-500'}`}>USGS significant</p>
          </div>
          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
            showEarthquakes ? 'bg-accent border-accent' : 'border-graphite-600 bg-transparent'
          }`}>
            {showEarthquakes && (
              <svg className="w-2 h-2 text-graphite-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </button>
        <button
          onClick={() => onToggleWeather(!showWeather)}
          className={`flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-[10px] transition-all duration-150 ${
            showWeather
              ? 'bg-accent/12 text-white ring-1 ring-accent/20'
              : 'bg-black/20 text-graphite-400 ring-1 ring-white/5 hover:bg-white/[0.05] hover:text-graphite-200'
          }`}
        >
          <div className={`flex h-5.5 w-5.5 items-center justify-center rounded transition-all ${
            showWeather ? 'bg-accent/15 text-accent' : 'bg-white/[0.05] text-graphite-500'
          }`}>
            <IconSun className="w-3 h-3" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold leading-none mb-0.5">Weather & Air</p>
            <p className={`text-[8px] font-normal ${showWeather ? 'text-graphite-300' : 'text-graphite-500'}`}>Open-Meteo + OpenAQ</p>
          </div>
          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
            showWeather ? 'bg-accent border-accent' : 'border-graphite-600 bg-transparent'
          }`}>
            {showWeather && (
              <svg className="w-2 h-2 text-graphite-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}
