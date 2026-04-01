import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

function toChartData(subScores) {
  return [
    { name: 'Technical', value: subScores.technical_skills },
    { name: 'Experience', value: subScores.experience_relevance },
    { name: 'Education', value: subScores.education_fit },
    { name: 'Soft Skills', value: subScores.soft_skills },
  ]
}

export function SubScoreChart({ subScores }) {
  return (
    <div className="card chart-card">
      <h3>Sub-score Breakdown</h3>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={toChartData(subScores)}>
            <CartesianGrid strokeDasharray="4 4" stroke="rgba(22,29,25,0.12)" />
            <XAxis dataKey="name" stroke="#3c4a42" />
            <YAxis domain={[0, 100]} stroke="#3c4a42" />
            <Tooltip cursor={{ fill: 'rgba(16,185,129,0.08)' }} />
            <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
