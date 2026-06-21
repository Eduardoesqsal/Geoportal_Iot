import httpClient from './httpClient'

export interface EarthquakeFeature {
  type: 'Feature'
  properties: {
    mag: number
    place: string
    time: number
    updated: number
    title: string
    type: string
    status: string
    detail: string
  }
  geometry: {
    type: 'Point'
    coordinates: [number, number, number]
  }
  id: string
}

export interface EarthquakeFeed {
  type: 'FeatureCollection'
  features: EarthquakeFeature[]
}

export const earthquakeService = {
  async getSignificant(): Promise<EarthquakeFeed> {
    const response = await httpClient.get<EarthquakeFeed>('/external/earthquakes')
    return response.data
  },
}
