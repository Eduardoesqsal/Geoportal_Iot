'use client'

import dynamic from 'next/dynamic'

const Dashboard = dynamic(
  () => import('@/presentation/pages/Dashboard').then((m) => ({ default: m.Dashboard })),
  { ssr: false },
)

export default function Home() {
  return <Dashboard />
}
