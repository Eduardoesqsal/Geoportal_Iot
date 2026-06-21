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
    <header className="h-11 bg-gradient-to-r from-graphite-900 via-graphite-900 to-graphite-950 border-b border-graphite-700/50 flex items-center px-3 md:px-4 shrink-0 gap-3">
      <button
        onClick={onToggleLeft}
        className="md:hidden w-7 h-7 rounded-lg flex items-center justify-center text-graphite-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        title={leftOpen ? 'Close explorer' : 'Open explorer'}
      >
        <IconLayers className="w-3.5 h-3.5" />
      </button>
      <div className="flex items-center gap-2.5 min-w-0 flex-1 md:flex-initial">
        <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(163,230,53,0.08)]">
          <IconSatellite className="w-4 h-4 text-accent" />
        </div>
        <div className="flex items-baseline gap-2">
          <h1 className="text-sm font-bold text-white tracking-tight truncate">{title}</h1>
          <span className="text-[9px] text-graphite-600 font-mono hidden sm:inline">v1.0.0</span>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-success/10 border border-success/15">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-[9px] text-success font-semibold tracking-wider">LIVE</span>
        </div>
        <button
          onClick={onToggleRight}
          className="md:hidden w-7 h-7 rounded-lg flex items-center justify-center text-graphite-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          title={rightOpen ? 'Close dashboard' : 'Open dashboard'}
        >
          <IconActivity className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  )
}
