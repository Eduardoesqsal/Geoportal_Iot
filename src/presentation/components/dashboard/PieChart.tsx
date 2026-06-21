interface PieChartProps {
  data: { label: string; value: number; color: string }[]
  size?: number
}

export function PieChart({ data, size = 120 }: PieChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0)
  if (total === 0) return null

  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 4
  const innerR = r * 0.55
  let cumulative = 0

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((d) => {
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
            >
              <title>{`${d.label}: ${d.value} (${(pct * 100).toFixed(1)}%)`}</title>
            </path>
          )
        })}
        <circle cx={cx} cy={cy} r={innerR} fill="#1e1e1e" />
        <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="central" fill="#e4e4e4" fontSize="11px" fontWeight="bold">
          {total}
        </text>
      </svg>
      <div className="flex flex-wrap gap-2 justify-center">
        {data
          .filter((d) => d.value > 0)
          .map((d) => (
            <div key={d.label} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-[9px] text-graphite-500 font-medium">
                {d.label} {((d.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
