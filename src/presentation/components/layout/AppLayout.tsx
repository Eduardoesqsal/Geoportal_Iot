import type { ReactNode } from 'react'

interface AppLayoutProps {
  header: ReactNode
  leftPanel: ReactNode
  map: ReactNode
  rightPanel: ReactNode
}

export function AppLayout({ header, leftPanel, map, rightPanel }: AppLayoutProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#242424] text-[#dcdcdc]">
      <div className="relative z-10 flex h-full w-full flex-col">
        {header}
        <div className="flex flex-1 overflow-hidden border-t border-white/5">
          {leftPanel}
          <main className="relative min-w-0 flex-1 overflow-hidden bg-[#1c1c1c]">{map}</main>
          {rightPanel}
        </div>
      </div>
    </div>
  )
}
