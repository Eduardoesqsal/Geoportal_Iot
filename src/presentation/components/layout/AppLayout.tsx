import type { ReactNode } from 'react'

interface AppLayoutProps {
  header: ReactNode
  leftPanel: ReactNode
  map: ReactNode
  rightPanel: ReactNode
}

export function AppLayout({ header, leftPanel, map, rightPanel }: AppLayoutProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-graphite-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(163,230,53,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.10),_transparent_22%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_26%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.08]" />
      <div className="relative z-10 flex h-full w-full flex-col">
        {header}
        <div className="flex flex-1 overflow-hidden">
          {leftPanel}
          <main className="relative min-w-0 flex-1 overflow-hidden">{map}</main>
          {rightPanel}
        </div>
      </div>
    </div>
  )
}
