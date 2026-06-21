interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-4">
      <div className="relative w-9 h-9">
        <div className="absolute inset-0 border-2 border-graphite-700/60 rounded-full" />
        <div className="absolute inset-0 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
      <span className="text-graphite-500 text-xs font-semibold tracking-wide">{message}</span>
    </div>
  );
}
