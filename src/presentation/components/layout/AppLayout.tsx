import type { ReactNode } from 'react';

interface AppLayoutProps {
  header: ReactNode;
  leftPanel: ReactNode;
  map: ReactNode;
  rightPanel: ReactNode;
}

export function AppLayout({ header, leftPanel, map, rightPanel }: AppLayoutProps) {
  return (
    <div className="h-full w-full flex flex-col bg-graphite-900">
      {header}
      <div className="flex flex-1 overflow-hidden">
        {leftPanel}
        <main className="flex-1 relative min-w-0">
          {map}
        </main>
        {rightPanel}
      </div>
    </div>
  );
}
