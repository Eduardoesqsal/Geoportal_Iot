'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-graphite-900 p-8">
      <div className="max-w-md w-full space-y-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center">
            <span className="text-danger text-2xl font-bold">!</span>
          </div>
          <h2 className="text-white text-lg font-bold">Something went wrong</h2>
          <p className="text-graphite-400 text-sm">
            {error.message || 'An unexpected error occurred while loading the application.'}
          </p>
          {process.env.NODE_ENV === 'development' && error.digest && (
            <p className="text-graphite-600 text-xs font-mono">Digest: {error.digest}</p>
          )}
        </div>
        <button
          onClick={reset}
          className="w-full py-2.5 bg-accent/10 hover:bg-accent/20 text-accent text-sm font-semibold rounded-xl border border-accent/20 transition-all cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
