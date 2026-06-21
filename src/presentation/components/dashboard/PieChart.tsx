import { formatFixed, toFiniteNumber } from '@/presentation/utils/number'

interface PieChartProps {
  data: { label: string; value: number; color: string }[]
  size?: number
}

export function PieChart({ data, size = 120 }: PieChartProps) {
  const normalizedData = data.map((item) => ({
    ...item,
    value: Math.max(0, toFiniteNumber(item.value, 0)),
  }))
  const total = normalizedData.reduce((s, d) => s + d.value, 0)

  if (total === 0) return null

  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 4
  const innerR = r * 0.58
  let cumulative = 0

  return (
    <div className="flex flex-col items-center gap-2.5">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          {normalizedData.map((d, i) => (
            <filter key={i} id={`shadow-${i}`}>
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.3" />
            </filter>
          ))}
        </defs>
        {normalizedData.map((d, i) => {
          if (d.value === 0) return null
          const pct = d.value / total
          const angle = pct * 360
          const start = (cumulative / total) * 360
          cumulative += d.value
          const startRad = ((start - 90) * Math.PI) / 180
          const endRad = ((start + angle - 90) * Math.PI) / 180
          const x1 = cx + r * Math.cos(startRad)
          const y1 = cy + r * Math.sin(startRad)
          const x2 = cx + r * Math.cos(endRad)
          const y2 = cy + r * Math.sin(endRad)
          const large = angle > 180 ? 1 : 0

          return (
            <path
              key={d.label}
              d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
              fill={d.color}
              filter={`url(#shadow-${i})`}
            >
              <title>{`${d.label}: ${d.value} (${formatFixed(pct * 100, 1)}%)`}</title>
            </path>
          )
        })}
        <circle cx={cx} cy={cy} r={innerR} fill="#141414" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fill="#e4e4e4" fontSize={size * 0.1} fontWeight="bold">
          {total}
        </text>
        <text x={cx} y={cy + size * 0.07} textAnchor="middle" dominantBaseline="central" fill="#5e5e5e" fontSize={size * 0.055}>
          total
        </text>
      </svg>
      <div className="flex flex-wrap gap-2 justify-center">
        {normalizedData
          .filter((d) => d.value > 0)
          .map((d) => (
            <div key={d.label} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-graphite-800/60">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-[9px] text-graphite-400 font-semibold">
                {d.label} {formatFixed((d.value / total) * 100, 0)}%
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
