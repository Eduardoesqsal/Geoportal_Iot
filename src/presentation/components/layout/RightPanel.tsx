'use client'

import { useState, type ReactNode } from 'react'
import { IconChevronRight, IconChevronLeft, IconActivity } from '@/presentation/components/ui/Icons'

interface RightPanelProps {
  children: ReactNode
  mobileOpen?: boolean
  onClose?: () => void
}

export function RightPanel({ children, mobileOpen = false, onClose }: RightPanelProps) {
  const [collapsed, setCollapsed] = useState(false)

  const panelContent = (
    <>
      <div className="flex h-9.5 items-center justify-between border-b border-white/10 bg-white/[0.025] px-2.5">
        {!collapsed ? (
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-4.5 w-4.5 items-center justify-center rounded bg-accent/10 ring-1 ring-accent/20">
              <IconActivity className="h-2.5 w-2.5 text-accent" />
            </div>
            <div>
              <h2 className="text-[8px] font-semibold uppercase tracking-[0.15em] text-graphite-300">Dashboard</h2>
              <p className="text-[7.5px] text-graphite-500">Status and analytics</p>
            </div>
          </div>
        ) : (
          <div className="h-4.5 w-4.5" />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-graphite-400 transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-white"
          title={collapsed ? 'Expand panel' : 'Collapse panel'}
        >
          {collapsed ? <IconChevronLeft className="h-2.5 w-2.5" /> : <IconChevronRight className="h-2.5 w-2.5" />}
        </button>
      </div>
      {!collapsed && <div className="flex-1 overflow-y-auto p-2">{children}</div>}
    </>
  )

  return (
    <>
      <aside
        className={`hidden h-full shrink-0 flex-col border-l border-[#3e3e3e] bg-[#2a2a2a] shadow-[inset_1px_0_0_rgba(255,255,255,0.02)] transition-all duration-300 md:flex ${
          collapsed ? 'w-9.5' : 'w-52 lg:w-56'
        }`}
      >
        {panelContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[1100] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <aside className="absolute right-0 flex h-full w-56 max-w-[85vw] flex-col border-l border-[#3e3e3e] bg-[#2a2a2a] shadow-2xl">
            <div className="flex h-9.5 items-center justify-between border-b border-[#3e3e3e] px-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-4.5 w-4.5 items-center justify-center rounded bg-accent/10 ring-1 ring-accent/15">
                  <IconActivity className="h-2.5 w-2.5 text-accent" />
                </div>
                <div>
                  <h2 className="text-[8px] font-semibold uppercase tracking-[0.15em] text-graphite-400">Dashboard</h2>
                  <p className="text-[7.5px] text-graphite-600">Status and analytics</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#3e3e3e] bg-white/4 text-graphite-400 transition-all hover:border-accent/20 hover:bg-accent/10 hover:text-white"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2.5">{children}</div>
          </aside>
        </div>
      )}
    </>
  )
}
