import { useQuery } from '@tanstack/react-query'
import { earthquakeService } from '@/infrastructure/api/earthquakeService'

export function useEarthquakes() {
  return useQuery({
    queryKey: ['earthquakes'],
    queryFn: () => earthquakeService.getSignificant(),
    refetchInterval: 300000,
    staleTime: 120000,
  })
}
