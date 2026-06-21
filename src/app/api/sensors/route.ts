import { NextResponse } from 'next/server'
import sensorsData from '../../../../mocks/sensors.json'

export async function GET() {
  return NextResponse.json(sensorsData)
}
