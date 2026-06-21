import type { SensorStatus } from '@/domain/entities/Sensor';
import { IconSearch } from '@/presentation/components/ui/Icons';

interface SensorFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: SensorStatus | 'all';
  onStatusChange: (value: SensorStatus | 'all') => void;
}

const statuses: { value: SensorStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'online', label: 'Online' },
  { value: 'offline', label: 'Offline' },
  { value: 'warning', label: 'Warning' },
  { value: 'error', label: 'Error' },
];

export function SensorFilter({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: SensorFilterProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-graphite-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search sensors..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 bg-graphite-850 border border-graphite-700/50 rounded-lg text-xs text-white/80 placeholder-graphite-500 focus:outline-none focus:border-accent/40 focus:shadow-[0_0_0_2px_rgba(163,230,53,0.06)] transition-all"
        />
      </div>
      <div className="flex flex-wrap gap-1">
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => onStatusChange(s.value)}
            className={`px-2.5 py-1 text-[10px] rounded-lg transition-all cursor-pointer font-medium tracking-wide ${
              statusFilter === s.value
                ? 'bg-accent/15 text-accent ring-1 ring-accent/30'
                : 'text-graphite-500 hover:text-graphite-300 hover:bg-graphite-750'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
