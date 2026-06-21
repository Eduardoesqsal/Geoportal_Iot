import { useState } from 'react'
import { BaseMapSwitcher } from './BaseMapSwitcher'
import { FileDropZone } from './FileDropZone'
import { IconPolygon } from '@/presentation/components/ui/Icons'
import type { BaseMapType } from './BaseMapSwitcher'

interface MapControlsProps {
  baseMap: BaseMapType
  onChangeBaseMap: (m: BaseMapType) => void
  onGeoJsonLoad: (geojson: Record<string, unknown>) => void
}

export function MapControls({ baseMap, onChangeBaseMap, onGeoJsonLoad }: MapControlsProps) {
  const [polyOpen, setPolyOpen] = useState(false)

  return (
    <div className="absolute top-20 left-3 z-[1000] flex flex-col gap-1.5">
      <BaseMapSwitcher current={baseMap} onChange={onChangeBaseMap} />

      <div className="relative">
        <button
          onClick={() => setPolyOpen(!polyOpen)}
          title="Import Polygon"
          className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-200 cursor-pointer ${
            polyOpen
              ? 'bg-accent text-graphite-950 border-accent shadow-[0_0_12px_rgba(163,230,53,0.25)]'
              : 'bg-graphite-850/90 backdrop-blur-sm text-graphite-400 border-graphite-700/60 hover:bg-graphite-700/60 hover:text-graphite-200 shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
          }`}
        >
          <IconPolygon className="w-4 h-4" />
        </button>
        {polyOpen && (
          <div className="absolute left-11 top-0 w-60 glass-panel rounded-xl p-3 shadow-2xl animate-[scale-in_0.15s_ease-out]">
            <FileDropZone onLoad={(g) => { onGeoJsonLoad(g); setPolyOpen(false) }} />
          </div>
        )}
      </div>
    </div>
  )
}
