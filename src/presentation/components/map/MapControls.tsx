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
    <div className="absolute left-3 top-36 z-[1000] flex flex-col gap-1.5">
      <BaseMapSwitcher current={baseMap} onChange={onChangeBaseMap} />

      <div className="relative">
        <button
          onClick={() => setPolyOpen(!polyOpen)}
          title="Import Polygon"
          className={`flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-lg border transition-all duration-200 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-md ${
            polyOpen
              ? 'border-accent/30 bg-accent/15 text-accent'
              : 'border-white/10 bg-graphite-950/92 text-graphite-300 hover:border-accent/25 hover:bg-white/[0.08] hover:text-white'
          }`}
        >
          <IconPolygon className="w-4 h-4" />
        </button>
        {polyOpen && (
          <div className="absolute left-11 top-0 w-72 animate-[scale-in_0.15s_ease-out] rounded-lg border border-white/10 bg-graphite-950/95 p-3 shadow-2xl backdrop-blur-md">
            <FileDropZone onLoad={(g) => { onGeoJsonLoad(g); setPolyOpen(false) }} />
          </div>
        )}
      </div>
    </div>
  )
}
