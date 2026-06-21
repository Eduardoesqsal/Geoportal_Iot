import { IconSensor } from '@/presentation/components/ui/Icons'

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = 'No data available',
  description = 'There are no sensors to display.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2.5 p-4">
      <div className="w-10 h-10 rounded-full bg-graphite-800 border border-graphite-700/50 flex items-center justify-center">
        <IconSensor className="w-4 h-4 text-graphite-600" />
      </div>
      <p className="text-graphite-500 text-xs font-medium">{title}</p>
      <p className="text-graphite-600 text-[10px] text-center max-w-[180px]">{description}</p>
    </div>
  );
}
