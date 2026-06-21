import { useQuery } from '@tanstack/react-query';
import { sensorService } from '@/infrastructure/api/sensorService';

export function useGetSensors() {
  return useQuery({
    queryKey: ['sensors'],
    queryFn: () => sensorService.getAll(),
    refetchInterval: 30000,
    staleTime: 10000,
  });
}
