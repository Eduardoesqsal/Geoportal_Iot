import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson',
    { next: { revalidate: 300 } },
  )
  const data = await res.json()
  return NextResponse.json(data)
}
