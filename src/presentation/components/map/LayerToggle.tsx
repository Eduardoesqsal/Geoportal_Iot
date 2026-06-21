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
    <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/40 space-y-2">
      <div className="flex items-center gap-2 px-1 pb-1.5 border-b border-graphite-200/60">
        <div className="flex items-center justify-center w-5 h-5 rounded-md bg-graphite-900">
          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
          </svg>
        </div>
        <p className="text-[9px] text-graphite-600 uppercase tracking-[0.12em] font-bold">Overlays</p>
      </div>
      <div className="space-y-1">
        <button
          onClick={() => onToggleEarthquakes(!showEarthquakes)}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-xs transition-all duration-150 cursor-pointer ${
            showEarthquakes
              ? 'bg-graphite-900 text-white shadow-sm'
              : 'bg-graphite-100/60 text-graphite-600 hover:bg-graphite-200/80 hover:text-graphite-800'
          }`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
            showEarthquakes ? 'bg-white/15 text-white' : 'bg-white text-graphite-500 shadow-sm'
          }`}>
            <IconEarthquake className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold leading-none mb-0.5">Earthquakes</p>
            <p className={`text-[9px] font-normal ${showEarthquakes ? 'text-white/60' : 'text-graphite-400'}`}>USGS significant</p>
          </div>
          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
            showEarthquakes ? 'bg-white border-white' : 'border-graphite-400 bg-transparent'
          }`}>
            {showEarthquakes && (
              <svg className="w-2.5 h-2.5 text-graphite-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </button>
        <button
          onClick={() => onToggleWeather(!showWeather)}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-xs transition-all duration-150 cursor-pointer ${
            showWeather
              ? 'bg-graphite-900 text-white shadow-sm'
              : 'bg-graphite-100/60 text-graphite-600 hover:bg-graphite-200/80 hover:text-graphite-800'
          }`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
            showWeather ? 'bg-white/15 text-white' : 'bg-white text-graphite-500 shadow-sm'
          }`}>
            <IconSun className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold leading-none mb-0.5">Weather & Air</p>
            <p className={`text-[9px] font-normal ${showWeather ? 'text-white/60' : 'text-graphite-400'}`}>Open-Meteo + OpenAQ</p>
          </div>
          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
            showWeather ? 'bg-white border-white' : 'border-graphite-400 bg-transparent'
          }`}>
            {showWeather && (
              <svg className="w-2.5 h-2.5 text-graphite-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}
