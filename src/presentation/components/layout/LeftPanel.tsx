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
      <div className="h-9 px-3 border-b border-graphite-700/30 flex items-center justify-between shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center">
              <IconLayers className="w-3 h-3 text-accent" />
            </div>
            <h2 className="text-[9px] font-bold text-graphite-400 tracking-[0.15em] uppercase truncate">Explorer</h2>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-graphite-500 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer shrink-0 w-5 h-5 flex items-center justify-center rounded"
          title={collapsed ? 'Expand panel' : 'Collapse panel'}
        >
          {collapsed ? <IconChevronRight className="w-3 h-3" /> : <IconChevronLeft className="w-3 h-3" />}
        </button>
      </div>
      {!collapsed && (
        <div className="flex-1 flex flex-col gap-2.5 p-3 overflow-hidden">{children}</div>
      )}
    </>
  )

  return (
    <>
      <aside
        className={`shrink-0 bg-gradient-to-b from-graphite-900 to-graphite-950 border-r border-graphite-700/40 flex flex-col h-full transition-all duration-300 ${
          collapsed ? 'w-10' : 'w-60 lg:w-64'
        } hidden md:flex`}
      >
        {panelContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[1100] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <aside className="relative w-72 max-w-[85vw] h-full bg-gradient-to-b from-graphite-900 to-graphite-950 border-r border-graphite-700/40 flex flex-col shadow-2xl animate-[slide-in-left_0.2s_ease-out]">
            <div className="flex items-center justify-between h-9 px-3 border-b border-graphite-700/30 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center">
                  <IconLayers className="w-3 h-3 text-accent" />
                </div>
                <h2 className="text-[9px] font-bold text-graphite-400 tracking-[0.15em] uppercase">Explorer</h2>
              </div>
              <button
                onClick={onClose}
                className="text-graphite-500 hover:text-white hover:bg-white/10 transition-all cursor-pointer w-6 h-6 flex items-center justify-center rounded"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-2.5 p-3 overflow-hidden">{children}</div>
          </aside>
        </div>
      )}
    </>
  )
}
