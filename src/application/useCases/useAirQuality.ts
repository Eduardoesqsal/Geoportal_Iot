import { useQuery } from '@tanstack/react-query'
import { airQualityService } from '@/infrastructure/api/airQualityService'

export function useAirQuality(lat: number | null, lng: number | null) {
  return useQuery({
    queryKey: ['airQuality', lat, lng],
    queryFn: () => airQualityService.getByCoords(lat!, lng!),
    enabled: lat !== null && lng !== null,
    refetchInterval: 300000,
    staleTime: 120000,
  })
}
