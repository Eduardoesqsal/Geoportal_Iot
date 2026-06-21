import httpClient from './httpClient'

export interface AirQualityMeasurement {
  location: string
  parameter: string
  value: number
  unit: string
  lastUpdated: string
  coordinates: {
    latitude: number
    longitude: number
  }
}

export interface AirQualityResponse {
  results: AirQualityMeasurement[]
}

export const airQualityService = {
  async getByCoords(lat: number, lng: number): Promise<AirQualityResponse> {
    const response = await httpClient.get<AirQualityResponse>(
      `/external/air-quality?lat=${lat}&lng=${lng}`,
    )
    return response.data
  },
}
