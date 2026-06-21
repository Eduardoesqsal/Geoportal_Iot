'use client'

import dynamic from 'next/dynamic'
import { useState, useMemo } from 'react'
import { AppLayout } from '@/presentation/components/layout/AppLayout'
import { Header } from '@/presentation/components/layout/Header'
import { LeftPanel } from '@/presentation/components/layout/LeftPanel'
import { RightPanel } from '@/presentation/components/layout/RightPanel'
import { SensorFilter } from '@/presentation/components/sensor/SensorFilter'
import { SensorList } from '@/presentation/components/sensor/SensorList'
import { SensorDashboard } from '@/presentation/components/dashboard/SensorDashboard'
import { MapControls } from '@/presentation/components/map/MapControls'
import { LayerToggle } from '@/presentation/components/map/LayerToggle'
import { useSensors } from '@/presentation/hooks/useSensors'
import { useEarthquakes } from '@/application/useCases/useEarthquakes'
import { useWeather } from '@/application/useCases/useWeather'
import { useAirQuality } from '@/application/useCases/useAirQuality'
import { ErrorState } from '@/presentation/components/common/ErrorState'
import { IconLayers, IconActivity } from '@/presentation/components/ui/Icons'
import type { BaseMapType } from '@/presentation/components/map/BaseMapSwitcher'

const SensorMap = dynamic(
  () => import('@/presentation/components/map/SensorMap').then((m) => ({ default: m.SensorMap })),
  { ssr: false },
)

export function Dashboard() {
  const [showEarthquakes, setShowEarthquakes] = useState(true)
  const [showWeather, setShowWeather] = useState(true)
  const [baseMap, setBaseMap] = useState<BaseMapType>('satellite')
  const [uploadedGeoJson, setUploadedGeoJson] = useState<Record<string, unknown> | null>(null)
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false)
  const [mobileRightOpen, setMobileRightOpen] = useState(false)

  const {
    sensors,
    allSensors,
    isLoading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedId,
    setSelectedId,
    selectedSensor,
    refetch,
  } = useSensors()

  const { data: earthquakeFeed } = useEarthquakes()

  const weatherLat = selectedSensor?.location.lat ?? null
  const weatherLng = selectedSensor?.location.lng ?? null
  const { data: weatherData } = useWeather(showWeather ? weatherLat : null, showWeather ? weatherLng : null)
  const { data: airQualityData } = useAirQuality(showWeather ? weatherLat : null, showWeather ? weatherLng : null)

  const nearSensors = useMemo(() => {
    if (!uploadedGeoJson || allSensors.length === 0) return []

    const geojson = uploadedGeoJson as Record<string, unknown>
    const features = (geojson.features as Record<string, unknown>[]) ?? [geojson]

    return allSensors.filter((s) => {
      const pt: [number, number] = [s.location.lng, s.location.lat]
      for (const f of features) {
        const geom = f.geometry as Record<string, unknown> | undefined
        if (!geom) continue
        try {
          const inside = booleanPointInPolygon(pt, f as never)
          if (inside) return true
        } catch {
          const dist = pointDistance(pt, geom as never)
          if (dist !== null && dist < 5) return true
        }
      }
      return false
    }).map((s) => s.id)
  }, [uploadedGeoJson, allSensors])

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-graphite-900">
        <ErrorState message={error.message} onRetry={refetch} />
      </div>
    )
  }

  const onlineCount = allSensors.filter(s => s.status === 'online').length
  const totalCount = allSensors.length

  const leftPanelContent = (
    <>
      <SensorFilter
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <LayerToggle
        showEarthquakes={showEarthquakes}
        onToggleEarthquakes={setShowEarthquakes}
        showWeather={showWeather}
        onToggleWeather={setShowWeather}
      />
      <SensorList
        sensors={sensors}
        selectedId={selectedId}
        onSelect={(id) => { setSelectedId(id); setMobileRightOpen(true); setMobileLeftOpen(false) }}
        isLoading={isLoading}
      />
    </>
  )

  return (
    <>
      <AppLayout
        header={
          <Header
            onToggleLeft={() => setMobileLeftOpen(!mobileLeftOpen)}
            onToggleRight={() => setMobileRightOpen(!mobileRightOpen)}
            leftOpen={mobileLeftOpen}
            rightOpen={mobileRightOpen}
          />
        }
        leftPanel={
          <LeftPanel mobileOpen={mobileLeftOpen} onClose={() => setMobileLeftOpen(false)}>
            {leftPanelContent}
          </LeftPanel>
        }
        map={
          <div className="relative w-full h-full">
            <SensorMap
              sensors={allSensors}
              onSensorClick={(id) => { setSelectedId(id); setMobileRightOpen(true) }}
              selectedId={selectedId}
              earthquakes={showEarthquakes ? earthquakeFeed?.features : undefined}
              showEarthquakes={showEarthquakes}
              baseMap={baseMap}
              geoJsonData={uploadedGeoJson}
            />
            <MapControls
              baseMap={baseMap}
              onChangeBaseMap={setBaseMap}
              onGeoJsonLoad={setUploadedGeoJson}
            />

            <div className="md:hidden absolute bottom-0 left-0 right-0 z-[1001] flex">
              <button
                onClick={() => setMobileLeftOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-graphite-900/95 backdrop-blur-sm border-t border-graphite-700/40 text-graphite-300 active:bg-graphite-800 transition-all text-xs font-medium"
              >
                <IconLayers className="w-4 h-4" />
                <span>Explorer</span>
                <span className="text-graphite-600 ml-1">{sensors.length}</span>
              </button>
              <div className="w-px bg-graphite-700/40" />
              <button
                onClick={() => setMobileRightOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-graphite-900/95 backdrop-blur-sm border-t border-graphite-700/40 text-graphite-300 active:bg-graphite-800 transition-all text-xs font-medium"
              >
                <IconActivity className="w-4 h-4" />
                <span>Dashboard</span>
                <span className="text-success font-bold ml-1">{onlineCount}</span>
                <span className="text-graphite-600">/</span>
                <span className="text-graphite-400">{totalCount}</span>
              </button>
            </div>
          </div>
        }
        rightPanel={
          <RightPanel mobileOpen={mobileRightOpen} onClose={() => setMobileRightOpen(false)}>
            <SensorDashboard
              allSensors={allSensors}
              selectedSensor={selectedSensor}
              weather={weatherData?.current ?? null}
              airQuality={airQualityData?.results ?? null}
              earthquakes={earthquakeFeed?.features}
              nearSensors={nearSensors}
            />
          </RightPanel>
        }
      />
    </>
  )
}

function booleanPointInPolygon(pt: [number, number], feature: Record<string, unknown>): boolean {
  try {
    const coords = (feature.geometry as Record<string, unknown>).coordinates as number[][][] | number[][]
    const ring = Array.isArray(coords[0]?.[0]) ? (coords as number[][][])[0] : (coords as number[][])
    const [px, py] = pt
    let inside = false
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [ax, ay] = ring[i]
      const [bx, by] = ring[j]
      if (ay > py !== by > py && px < ((bx - ax) * (py - ay)) / (by - ay) + ax) {
        inside = !inside
      }
    }
    return inside
  } catch {
    return false
  }
}

function pointDistance(
  pt: [number, number],
  geom: Record<string, unknown>,
): number | null {
  try {
    const coords = geom.coordinates as number[] | number[][]
    const [px, py] = pt
    const [gx, gy] = coords.length === 2 ? (coords as number[]) : (coords as number[][])[0]
    const R = 6371
    const dLat = ((gy - py) * Math.PI) / 180
    const dLon = ((gx - px) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((py * Math.PI) / 180) * Math.cos((gy * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  } catch {
    return null
  }
}
