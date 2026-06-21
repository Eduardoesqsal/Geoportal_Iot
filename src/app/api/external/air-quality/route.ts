import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat and lng are required' }, { status: 400 })
  }

  const res = await fetch(
    `https://api.openaq.org/v2/latest?coordinates=${lat},${lng}&radius=50000&limit=5`,
    { next: { revalidate: 300 } },
  )
  const data = await res.json()
  return NextResponse.json(data)
}
