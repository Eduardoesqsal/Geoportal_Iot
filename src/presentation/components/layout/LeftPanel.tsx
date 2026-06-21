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
      <div className="flex h-10 items-center justify-between border-b border-white/6 px-3">
        {!collapsed ? (
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-accent/10 ring-1 ring-accent/15">
              <IconLayers className="h-3 w-3 text-accent" />
            </div>
            <div>
              <h2 className="text-[9px] font-semibold uppercase tracking-[0.18em] text-graphite-400">Explorer</h2>
              <p className="text-[9px] text-graphite-600">Filters, layers and sensors</p>
            </div>
          </div>
        ) : (
          <div className="h-5 w-5" />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/6 bg-white/4 text-graphite-400 transition-all hover:border-accent/20 hover:bg-accent/10 hover:text-white"
          title={collapsed ? 'Expand panel' : 'Collapse panel'}
        >
          {collapsed ? <IconChevronRight className="h-3 w-3" /> : <IconChevronLeft className="h-3 w-3" />}
        </button>
      </div>
      {!collapsed && <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-3">{children}</div>}
    </>
  )

  return (
    <>
      <aside
        className={`hidden h-full shrink-0 flex-col border-r border-white/6 bg-[linear-gradient(180deg,rgba(20,20,20,0.94),rgba(13,13,13,0.96))] shadow-[inset_-1px_0_0_rgba(255,255,255,0.02)] transition-all duration-300 md:flex ${
          collapsed ? 'w-10' : 'w-60 lg:w-64'
        }`}
      >
        {panelContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[1100] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <aside className="relative flex h-full w-72 max-w-[85vw] flex-col border-r border-white/6 bg-[linear-gradient(180deg,rgba(20,20,20,0.98),rgba(13,13,13,0.98))] shadow-2xl">
            <div className="flex h-10 items-center justify-between border-b border-white/6 px-3">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-accent/10 ring-1 ring-accent/15">
                  <IconLayers className="h-3 w-3 text-accent" />
                </div>
                <div>
                  <h2 className="text-[9px] font-semibold uppercase tracking-[0.18em] text-graphite-400">Explorer</h2>
                  <p className="text-[9px] text-graphite-600">Filters, layers and sensors</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/6 bg-white/4 text-graphite-400 transition-all hover:border-accent/20 hover:bg-accent/10 hover:text-white"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-3">{children}</div>
          </aside>
        </div>
      )}
    </>
  )
}
