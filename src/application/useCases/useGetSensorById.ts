import { useQuery } from '@tanstack/react-query';
import { sensorService } from '@/infrastructure/api/sensorService';

export function useGetSensorById(id: string | null) {
  return useQuery({
    queryKey: ['sensor', id],
    queryFn: () => sensorService.getById(id!),
    enabled: !!id,
  });
}
