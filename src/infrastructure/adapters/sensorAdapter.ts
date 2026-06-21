import type { Sensor } from '@/domain/entities/Sensor';
import { toFiniteNumber } from '@/infrastructure/utils/number';

interface ApiSensor {
  id: string;
  name: string;
  status: string;
  location: { lat: number; lng: number };
  metrics: Record<string, number | string>;
  lastUpdated?: string;
}

export function adaptSensor(apiSensor: ApiSensor): Sensor {
  return {
    id: apiSensor.id,
    name: apiSensor.name,
    status: mapStatus(apiSensor.status),
    location: {
      lat: toFiniteNumber(apiSensor.location.lat),
      lng: toFiniteNumber(apiSensor.location.lng),
    },
    metrics: {
      temperature: toFiniteNumber(apiSensor.metrics.temperature),
      humidity: toFiniteNumber(apiSensor.metrics.humidity),
    },
    lastUpdated: apiSensor.lastUpdated,
  };
}

function mapStatus(status: string): Sensor['status'] {
  switch (status.toLowerCase()) {
    case 'online':
      return 'online';
    case 'offline':
      return 'offline';
    case 'warning':
      return 'warning';
    case 'error':
      return 'error';
    default:
      return 'offline';
  }
}
