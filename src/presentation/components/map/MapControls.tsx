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
          className={`w-9 h-9 flex items-center justify-center rounded-xl border-2 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.25)] ${
            polyOpen
              ? 'bg-graphite-900 text-white border-graphite-900'
              : 'bg-white text-graphite-800 border-white hover:bg-graphite-100 hover:border-graphite-200'
          }`}
        >
          <IconPolygon className="w-4 h-4" />
        </button>
        {polyOpen && (
          <div className="absolute left-11 top-0 w-64 bg-white rounded-xl p-3 shadow-2xl border border-graphite-200 animate-[scale-in_0.15s_ease-out]">
            <FileDropZone onLoad={(g) => { onGeoJsonLoad(g); setPolyOpen(false) }} />
          </div>
        )}
      </div>
    </div>
  )
}
