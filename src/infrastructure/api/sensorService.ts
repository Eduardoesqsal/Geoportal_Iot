import httpClient from './httpClient';
import { adaptSensor } from '@/infrastructure/adapters/sensorAdapter';
import type { Sensor } from '@/domain/entities/Sensor';

interface ApiResponse<T> {
  data: T;
}

export const sensorService = {
  async getAll(): Promise<Sensor[]> {
    const response = await httpClient.get<ApiResponse<unknown[]>>('/sensors');
    return (response.data.data ?? response.data).map((item: unknown) =>
      adaptSensor(item as Parameters<typeof adaptSensor>[0]),
    );
  },

  async getById(id: string): Promise<Sensor> {
    const response = await httpClient.get<ApiResponse<unknown>>(`/sensors/${id}`);
    const data = response.data.data ?? response.data;
    return adaptSensor(data as Parameters<typeof adaptSensor>[0]);
  },
};
