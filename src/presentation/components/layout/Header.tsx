import { IconSatellite, IconLayers, IconActivity } from '@/presentation/components/ui/Icons'

interface HeaderProps {
  title?: string
  onToggleLeft?: () => void
  onToggleRight?: () => void
  leftOpen?: boolean
  rightOpen?: boolean
}

export function Header({ title = 'GeoPortal IoT', onToggleLeft, onToggleRight, leftOpen, rightOpen }: HeaderProps) {
  return (
    <header className="h-10 bg-graphite-900 border-b border-graphite-700/50 flex items-center px-2 md:px-3 shrink-0 gap-2">
      <button
        onClick={onToggleLeft}
        className="md:hidden w-7 h-7 rounded-md flex items-center justify-center text-graphite-400 hover:text-accent hover:bg-graphite-800 transition-all cursor-pointer"
        title={leftOpen ? 'Close explorer' : 'Open explorer'}
      >
        <IconLayers className="w-3.5 h-3.5" />
      </button>
      <div className="flex items-center gap-2 min-w-0 flex-1 md:flex-initial">
        <div className="w-6 h-6 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
          <IconSatellite className="w-3.5 h-3.5 text-accent" />
        </div>
        <h1 className="text-xs font-semibold text-white/90 tracking-wide truncate">{title}</h1>
      </div>
      <div className="ml-auto flex items-center gap-2 shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
        <span className="text-[9px] text-graphite-500 font-medium hidden sm:inline">LIVE</span>
        <button
          onClick={onToggleRight}
          className="md:hidden w-7 h-7 rounded-md flex items-center justify-center text-graphite-400 hover:text-accent hover:bg-graphite-800 transition-all cursor-pointer"
          title={rightOpen ? 'Close dashboard' : 'Open dashboard'}
        >
          <IconActivity className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  )
}
