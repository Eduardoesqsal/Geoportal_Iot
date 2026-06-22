'use client'

import { useState, type ReactNode } from 'react'
import { IconChevronLeft, IconChevronRight, IconLayers } from '@/presentation/components/ui/Icons'

interface LeftPanelProps {
  children: ReactNode
  mobileOpen?: boolean
  onClose?: () => void
}

export function LeftPanel({ children, mobileOpen = false, onClose }: LeftPanelProps) {
  const [collapsed, setCollapsed] = useState(false)

  const panelContent = (
    <>
      <div className="flex h-9.5 items-center justify-between border-b border-white/10 bg-white/[0.025] px-2.5">
        {!collapsed ? (
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-4.5 w-4.5 items-center justify-center rounded bg-accent/10 ring-1 ring-accent/20">
              <IconLayers className="h-2.5 w-2.5 text-accent" />
            </div>
            <div>
                <button className="flex flex-col items-start h-10 justify-center px-2 hover:bg-white/10 rounded">
                  <h2 className="text-[8px] font-semibold uppercase tracking-[0.15em] text-graphite-300">Geoportal LOT</h2>
                  <p className="text-[7.5px] text-graphite-500">Filters, layers and sensors</p>
                </button>
            </div>
          </div>
        ) : (
          <div className="h-4.5 w-4.5" />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-graphite-300 transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-white md:h-7.5 md:w-7.5"
          title={collapsed ? 'Expand panel' : 'Collapse panel'}
        >
          {collapsed ? <IconChevronRight className="h-2.5 w-2.5" /> : <IconChevronLeft className="h-2.5 w-2.5" />}
        </button>
      </div>
        {!collapsed && <div className="flex flex-1 flex-col gap-2 overflow-hidden p-2"><button className="h-12 flex items-center px-3 text-sm font-medium mb-2 rounded-md hover:bg-white/10 md:h-10 md:px-2 md:text-xs">Explorer</button>{children}</div>}
    </>
  )

  return (
    <>
      <aside
        className={`hidden h-full shrink-0 flex-col border-r border-[#3e3e3e] bg-[#2a2a2a] shadow-[inset_-1px_0_0_rgba(255,255,255,0.02)] transition-all duration-300 md:flex ${
          collapsed ? 'w-9.5' : 'w-48 lg:w-52'
        }`}
      >
        {panelContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[1100] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <aside className="relative flex h-full w-52 max-w-[85vw] flex-col border-r border-[#3e3e3e] bg-[#2a2a2a] shadow-2xl">
            <div className="flex h-9.5 items-center justify-between border-b border-[#3e3e3e] px-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-4.5 w-4.5 items-center justify-center rounded bg-accent/10 ring-1 ring-accent/15">
                  <IconLayers className="h-2.5 w-2.5 text-accent" />
                </div>
                <div>
                  <h2 className="text-[8px] font-semibold uppercase tracking-[0.15em] text-graphite-400">Geoportal LOT</h2>
                  <p className="text-[7.5px] text-graphite-600">Filters, layers and sensors</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#3e3e3e] bg-white/4 text-graphite-400 transition-all hover:border-accent/20 hover:bg-accent/10 hover:text-white"
              >
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          {!collapsed && (
        <div className="flex flex-1 flex-col gap-2 overflow-hidden p-2">
          <h2 className="text-[8px] font-semibold uppercase tracking-[0.15em] text-graphite-300">Explorer</h2>
          {children}
        </div>
      )}
          </aside>
        </div>
      )}
    </>
  )
}
