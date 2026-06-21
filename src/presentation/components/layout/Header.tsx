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
    <header className="relative h-14 shrink-0 border-b border-white/8 bg-[linear-gradient(180deg,rgba(20,20,20,0.96),rgba(13,13,13,0.88))] px-3 md:px-4">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="flex h-full items-center gap-3">
        <button
          onClick={onToggleLeft}
          className="md:hidden flex h-8 w-8 items-center justify-center rounded-xl border border-white/6 bg-white/4 text-graphite-300 transition-all hover:border-accent/20 hover:bg-accent/10 hover:text-white"
          title={leftOpen ? 'Close explorer' : 'Open explorer'}
        >
          <IconLayers className="h-3.5 w-3.5" />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-3 md:flex-initial">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/15 bg-accent/10 shadow-[0_0_18px_rgba(163,230,53,0.08)]">
            <IconSatellite className="h-4 w-4 text-accent" />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <h1 className="truncate text-sm font-semibold tracking-tight text-white md:text-[15px]">{title}</h1>
              <span className="hidden rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-graphite-400 sm:inline">
                live gis
              </span>
            </div>
            <p className="mt-0.5 hidden text-[10px] text-graphite-500 md:block">
              Spatial telemetry and environmental layers
            </p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2.5 shrink-0">
          <div className="hidden items-center gap-2 rounded-full border border-success/15 bg-success/10 px-3 py-1 md:flex">
            <div className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-success">Live</span>
          </div>
          <div className="hidden rounded-full border border-white/8 bg-white/5 px-3 py-1 text-[9px] font-mono tracking-[0.16em] text-graphite-400 lg:block">
            v1.0.0
          </div>
          <button
            onClick={onToggleRight}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-xl border border-white/6 bg-white/4 text-graphite-300 transition-all hover:border-accent/20 hover:bg-accent/10 hover:text-white"
            title={rightOpen ? 'Close dashboard' : 'Open dashboard'}
          >
            <IconActivity className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  )
}
