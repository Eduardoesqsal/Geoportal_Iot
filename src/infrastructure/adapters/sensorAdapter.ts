import type { Sensor } from '@/domain/entities/Sensor';

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
      lat: apiSensor.location.lat,
      lng: apiSensor.location.lng,
    },
    metrics: {
      temperature: Number(apiSensor.metrics.temperature) ?? 0,
      humidity: Number(apiSensor.metrics.humidity) ?? 0,
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
