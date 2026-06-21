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
      <div className="h-9 px-2.5 border-b border-graphite-700/30 flex items-center justify-between shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <IconActivity className="w-3 h-3 text-accent shrink-0" />
            <h2 className="text-[9px] font-semibold text-graphite-400 tracking-[0.15em] uppercase truncate">Dashboard</h2>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-graphite-500 hover:text-accent transition-all duration-200 cursor-pointer shrink-0 w-5 h-5 flex items-center justify-center rounded hover:bg-graphite-700/30 ml-auto"
          title={collapsed ? 'Expand panel' : 'Collapse panel'}
        >
          {collapsed ? <IconChevronLeft className="w-3 h-3" /> : <IconChevronRight className="w-3 h-3" />}
        </button>
      </div>
      {!collapsed && <div className="flex-1 overflow-y-auto p-2.5">{children}</div>}
    </>
  )

  return (
    <>
      <aside
        className={`shrink-0 bg-graphite-900/95 border-l border-graphite-700/40 flex flex-col h-full transition-all duration-300 ${
          collapsed ? 'w-10' : 'w-72 lg:w-80'
        } hidden md:flex`}
      >
        {panelContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[1100] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <aside className="absolute right-0 w-80 max-w-[85vw] h-full bg-graphite-900 border-l border-graphite-700/40 flex flex-col shadow-2xl animate-[slide-in-right_0.2s_ease-out]">
            <div className="flex items-center justify-between h-9 px-2.5 border-b border-graphite-700/30 shrink-0">
              <div className="flex items-center gap-2">
                <IconActivity className="w-3 h-3 text-accent" />
                <h2 className="text-[9px] font-semibold text-graphite-400 tracking-[0.15em] uppercase">Dashboard</h2>
              </div>
              <button
                onClick={onClose}
                className="text-graphite-500 hover:text-accent transition-all cursor-pointer w-5 h-5 flex items-center justify-center"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
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
