import { useQuery } from '@tanstack/react-query'
import { weatherService } from '@/infrastructure/api/weatherService'

export function useWeather(lat: number | null, lng: number | null) {
  return useQuery({
    queryKey: ['weather', lat, lng],
    queryFn: () => weatherService.getByCoords(lat!, lng!),
    enabled: lat !== null && lng !== null,
    refetchInterval: 180000,
    staleTime: 60000,
  })
}
