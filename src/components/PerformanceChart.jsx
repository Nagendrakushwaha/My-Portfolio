export function PerformanceChart({ title, data = [], emptyMessage = 'Performance visualization will appear when evaluation results are added.' }) {
  const values = data.filter((item) => typeof item.value === 'number')
  return <div className="performance-chart"><div className="chart-heading"><span>{title}</span></div>{values.length ? <div className="chart-bars">{values.map((item) => <div className="chart-row" key={item.label}><span>{item.label}</span><i><b style={{ width: `${Math.min(item.value * 100, 100)}%` }} /></i><strong>{(item.value * 100).toFixed(1)}%</strong></div>)}</div> : <div className="chart-empty">{emptyMessage}</div>}</div>
}
