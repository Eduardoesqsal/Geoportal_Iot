export interface SensorLocation {
  lat: number;
  lng: number;
}

export interface SensorMetrics {
  temperature: number;
  humidity: number;
  pressure?: number;
  windSpeed?: number;
 空气质量?: string;
}

export type SensorStatus = 'online' | 'offline' | 'warning' | 'error';

export interface Sensor {
  id: string;
  name: string;
  status: SensorStatus;
  location: SensorLocation;
  metrics: SensorMetrics;
  lastUpdated?: string;
}
