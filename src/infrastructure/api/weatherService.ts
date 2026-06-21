import httpClient from './httpClient'

export interface WeatherCurrent {
  temperature_2m: number
  relative_humidity_2m: number
  surface_pressure: number
  wind_speed_10m: number
}

export interface WeatherResponse {
  latitude: number
  longitude: number
  current: WeatherCurrent
}

export const weatherService = {
  async getByCoords(lat: number, lng: number): Promise<WeatherResponse> {
    const response = await httpClient.get<WeatherResponse>(
      `/external/weather?lat=${lat}&lng=${lng}`,
    )
    return response.data
  },
}
