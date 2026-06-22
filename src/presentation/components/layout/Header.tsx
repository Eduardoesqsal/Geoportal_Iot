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
    <header className="relative h-13 shrink-0 border-b border-white/10 bg-[linear-gradient(180deg,rgba(18,22,18,0.98),rgba(8,10,9,0.94))] px-3 shadow-[0_8px_30px_rgba(0,0,0,0.2)] md:px-4">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="flex h-full items-center gap-2.5">
        <button
          onClick={onToggleLeft}
          className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-graphite-300 transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-white md:hidden"
          title={leftOpen ? 'Close explorer' : 'Open explorer'}
        >
          <IconLayers className="h-3 w-3" />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-2.5 md:flex-initial">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/25 bg-[linear-gradient(135deg,rgba(163,230,53,0.18),rgba(20,184,166,0.08))] shadow-[0_0_16px_rgba(163,230,53,0.08)]">
            <IconSatellite className="h-[14px] w-[14px] text-accent" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="truncate text-xs font-semibold text-white md:text-sm">{title}</h1>
              <span className="hidden rounded-md border border-accent/20 bg-accent/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-accent sm:inline">
                live gis
              </span>
            </div>
            <p className="mt-0.5 hidden text-[9px] font-medium text-graphite-400 md:block">
              Spatial telemetry, environmental layers and field operations
            </p>
          </div>
        </div>

        <div className="ml-auto hidden h-8 items-center divide-x divide-white/10 rounded-lg border border-white/10 bg-black/20 px-1.5 md:flex">
          <div className="px-2.5">
            <p className="text-[7px] font-semibold uppercase tracking-[0.15em] text-graphite-500">CRS</p>
            <p className="font-mono text-[9px] text-graphite-300">WGS84</p>
          </div>
          <div className="px-2.5">
            <p className="text-[7px] font-semibold uppercase tracking-[0.15em] text-graphite-500">Mode</p>
            <p className="font-mono text-[9px] text-graphite-300">OPS</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-lg border border-success/20 bg-success/10 px-2 py-1 md:flex">
            <div className="h-1 w-1 rounded-full bg-success shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
            <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-success">Online</span>
          </div>
          <div className="hidden rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[8px] tracking-[0.12em] text-graphite-400 lg:block">
            v1.0.0
          </div>
          <button
            onClick={onToggleRight}
            className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-graphite-300 transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-white md:hidden md:h-7.5 md:w-7.5"
            title={rightOpen ? 'Close dashboard' : 'Open dashboard'}
          >
            <IconActivity className="h-3 w-3" />
          </button>
        </div>
      </div>
    </header>
  )
}
