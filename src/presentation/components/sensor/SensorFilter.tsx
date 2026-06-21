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
    <div className="space-y-2 rounded-lg border border-white/10 bg-white/[0.035] p-2">
      <div className="relative">
        <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-graphite-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search sensors..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-black/25 py-1 pl-7 pr-2 text-[10px] text-white/85 placeholder-graphite-500 transition-all focus:border-accent/40 focus:outline-none focus:shadow-[0_0_0_3px_rgba(163,230,53,0.08)]"
        />
      </div>
      <div className="grid grid-cols-2 gap-1">
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => onStatusChange(s.value)}
            className={`cursor-pointer rounded px-2 py-1 text-[8.5px] font-bold tracking-wide transition-all ${
              statusFilter === s.value
                ? 'bg-accent/15 text-accent ring-1 ring-accent/30 shadow-[0_0_8px_rgba(163,230,53,0.04)]'
                : 'bg-black/20 text-graphite-500 ring-1 ring-white/5 hover:bg-white/[0.05] hover:text-graphite-300'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
