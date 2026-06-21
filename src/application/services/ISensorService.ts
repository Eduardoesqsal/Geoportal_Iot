import type { Sensor } from '@/domain/entities/Sensor';

export interface ISensorService {
  getAll(): Promise<Sensor[]>;
  getById(id: string): Promise<Sensor>;
}
