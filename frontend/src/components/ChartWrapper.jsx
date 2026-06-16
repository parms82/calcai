import { useState } from 'react'
import {
  BarChart, Bar,
  LineChart, Line,
  AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const TYPE_LABELS = {
  bar:  { label: 'Bar',  icon: '▪▪▪' },
  line: { label: 'Line', icon: '〜' },
  area: { label: 'Area', icon: '⬟' },
  pie:  { label: 'Pie',  icon: '◑' },
}

const PIE_LABEL = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null
  const RADIAN = Math.PI / 180
  const r = innerRadius + (outerRadius - innerRadius) * 0.55
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      fontSize={12} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const MARGIN = { top: 4, right: 4, left: 0, bottom: 0 }

export default function ChartWrapper({
  title,
  data,
  series,
  xKey = 'year',
  availableTypes = ['bar'],
  formatValue,
  formatX,
  pieData,
}) {
  const [type, setType] = useState(availableTypes[0])

  const yFmt = v => {
    if (!formatValue) return v
    const s = formatValue(v)
    return s.replace('₹', '')
  }
  const ttFmt = (value, name) => [formatValue ? formatValue(value) : value, name]
  const lblFmt = v => formatX ? formatX(v) : `Year ${v}`

  const sharedAxes = (
    <>
      <XAxis dataKey={xKey} tick={{ fontSize: 11 }} tickFormatter={formatX} />
      <YAxis tick={{ fontSize: 11 }} tickFormatter={yFmt} width={58} />
      <Tooltip formatter={ttFmt} labelFormatter={lblFmt} />
      <Legend wrapperStyle={{ fontSize: 12 }} />
    </>
  )

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data} margin={MARGIN}>
            {sharedAxes}
            {series.map(s => (
              <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color} radius={[3, 3, 0, 0]} />
            ))}
          </BarChart>
        )

      case 'line':
        return (
          <LineChart data={data} margin={MARGIN}>
            {sharedAxes}
            {series.map(s => (
              <Line key={s.key} type="monotone" dataKey={s.key} name={s.name}
                stroke={s.color} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        )

      case 'area':
        return (
          <AreaChart data={data} margin={MARGIN}>
            {sharedAxes}
            {series.map(s => (
              <Area key={s.key} type="monotone" dataKey={s.key} name={s.name}
                stroke={s.color} fill={s.color} fillOpacity={0.3} strokeWidth={2} />
            ))}
          </AreaChart>
        )

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              labelLine={false}
              label={PIE_LABEL}
            >
              {pieData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v, name) => [formatValue ? formatValue(v) : v, name]} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        )

      default:
        return null
    }
  }

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <div className="flex flex-wrap gap-1">
          {availableTypes.map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                type === t
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {TYPE_LABELS[t].label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={type === 'pie' ? 250 : 220}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}
