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
    <div className="glass-panel-light rounded-xl p-2.5 space-y-2">
      <div className="flex items-center gap-2 px-1">
        <div className="w-0.5 h-3 rounded-full bg-accent/60" />
        <p className="text-[8px] text-graphite-500 uppercase tracking-[0.12em] font-semibold">Overlays</p>
      </div>
      <div className="space-y-1.5">
        <button
          onClick={() => onToggleEarthquakes(!showEarthquakes)}
          className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-[11px] transition-all duration-150 cursor-pointer ${
            showEarthquakes
              ? 'bg-accent/8 text-accent font-medium'
              : 'text-graphite-400 hover:bg-graphite-700/30 hover:text-graphite-200'
          }`}
        >
          <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
            showEarthquakes ? 'bg-accent/15 text-accent' : 'bg-graphite-700/40 text-graphite-400'
          }`}>
            <IconEarthquake className="w-3 h-3" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium leading-none mb-0.5">Earthquakes</p>
            <p className="text-[9px] text-graphite-500 font-normal">USGS significant</p>
          </div>
          <div className={`w-3.5 h-3.5 rounded border transition-all flex items-center justify-center ${
            showEarthquakes ? 'bg-accent border-accent' : 'border-graphite-600'
          }`}>
            {showEarthquakes && (
              <svg className="w-2.5 h-2.5 text-graphite-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </button>
        <button
          onClick={() => onToggleWeather(!showWeather)}
          className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-[11px] transition-all duration-150 cursor-pointer ${
            showWeather
              ? 'bg-accent/8 text-accent font-medium'
              : 'text-graphite-400 hover:bg-graphite-700/30 hover:text-graphite-200'
          }`}
        >
          <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
            showWeather ? 'bg-accent/15 text-accent' : 'bg-graphite-700/40 text-graphite-400'
          }`}>
            <IconSun className="w-3 h-3" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium leading-none mb-0.5">Weather & Air</p>
            <p className="text-[9px] text-graphite-500 font-normal">Open-Meteo + OpenAQ</p>
          </div>
          <div className={`w-3.5 h-3.5 rounded border transition-all flex items-center justify-center ${
            showWeather ? 'bg-accent border-accent' : 'border-graphite-600'
          }`}>
            {showWeather && (
              <svg className="w-2.5 h-2.5 text-graphite-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}
