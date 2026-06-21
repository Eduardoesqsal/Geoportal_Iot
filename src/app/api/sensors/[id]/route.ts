import { NextResponse } from 'next/server'
import sensorsData from '../../../../../mocks/sensors.json'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const sensors = sensorsData.data as Array<Record<string, unknown>>
  const sensor = sensors.find((s) => s.id === id)

  if (!sensor) {
    return NextResponse.json({ message: 'Sensor not found' }, { status: 404 })
  }

  return NextResponse.json({ data: sensor })
}
