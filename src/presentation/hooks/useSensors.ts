import { useGetSensors } from '@/application/useCases/useGetSensors';
import { useGetSensorById } from '@/application/useCases/useGetSensorById';
import { useState, useMemo } from 'react';
import type { SensorStatus } from '@/domain/entities/Sensor';

export function useSensors() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<SensorStatus | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: sensors, isLoading, error, refetch } = useGetSensors();
  const { data: selectedSensor, isLoading: isLoadingDetail } = useGetSensorById(selectedId);

  const filteredSensors = useMemo(() => {
    if (!sensors) return [];
    return sensors.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [sensors, search, statusFilter]);

  return {
    sensors: filteredSensors,
    allSensors: sensors ?? [],
    isLoading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedId,
    setSelectedId,
    selectedSensor,
    isLoadingDetail,
    refetch,
  };
}
