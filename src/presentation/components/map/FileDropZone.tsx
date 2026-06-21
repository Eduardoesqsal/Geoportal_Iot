'use client'

import { useRef, useState, useCallback, type DragEvent } from 'react'
import { IconUpload, IconPolygon } from '@/presentation/components/ui/Icons'

interface FileDropZoneProps {
  onLoad: (geojson: Record<string, unknown>) => void
}

export function FileDropZone({ onLoad }: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const processFile = useCallback(async (file: File) => {
    setLoading(true)
    setFileName(file.name)
    try {
      if (file.name.endsWith('.geojson') || file.name.endsWith('.json')) {
        const text = await file.text()
        onLoad(JSON.parse(text))
      } else if (file.name.endsWith('.zip')) {
        const shp = await import('shpjs')
        const arrayBuf = await file.arrayBuffer()
        const geojson = await shp.default(arrayBuf)
        onLoad(geojson as Record<string, unknown>)
      } else {
        alert('Supported formats: .geojson, .json, .zip (shapefile)')
      }
    } catch {
      alert('Failed to parse file')
    } finally {
      setLoading(false)
    }
  }, [onLoad])

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragging(false)
      const f = e.dataTransfer.files[0]
      if (f) processFile(f)
    },
    [processFile],
  )

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => setDragging(false), [])

  const handleClick = () => inputRef.current?.click()

  if (fileName) {
    return (
      <div className="flex items-center gap-2 bg-graphite-50 rounded-lg border border-graphite-200 px-3 py-2">
        <IconPolygon className="w-4 h-4 text-graphite-700 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-graphite-800 font-medium truncate">{fileName}</p>
          <p className="text-[10px] text-graphite-500">Loaded successfully</p>
        </div>
        <button
          onClick={() => { setFileName(null); onLoad(null as unknown as Record<string, unknown>) }}
          className="text-[10px] text-graphite-400 hover:text-danger transition-colors cursor-pointer font-medium"
        >
          Clear
        </button>
      </div>
    )
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      className={`relative rounded-lg border-2 border-dashed p-3.5 text-center cursor-pointer transition-all duration-200 ${
        dragging
          ? 'border-graphite-900 bg-graphite-100'
          : 'border-graphite-300 bg-graphite-50/50 hover:border-graphite-400 hover:bg-graphite-100'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".geojson,.json,.zip"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) processFile(f)
          e.target.value = ''
        }}
      />
      <div className="flex flex-col items-center gap-1.5">
        {loading ? (
          <div className="w-6 h-6 border-2 border-graphite-700 border-t-transparent rounded-full animate-spin" />
        ) : (
          <IconUpload className="w-5 h-5 text-graphite-500" />
        )}
        <p className="text-[11px] text-graphite-700 font-semibold tracking-wide">
          {loading ? 'Loading...' : 'Drop GeoJSON here'}
        </p>
        <p className="text-[9px] text-graphite-500">or click to browse</p>
        <p className="text-[8px] text-graphite-400 mt-0.5">.geojson .json .zip (shapefile)</p>
      </div>
    </div>
  )
}
