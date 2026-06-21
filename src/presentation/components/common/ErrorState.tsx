interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-4">
      <div className="w-12 h-12 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center">
        <span className="text-danger text-lg font-bold">!</span>
      </div>
      <p className="text-graphite-400 text-xs text-center font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent text-xs rounded-lg border border-accent/20 transition-all cursor-pointer font-medium"
        >
          Retry
        </button>
      )}
    </div>
  );
}
