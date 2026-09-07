export function MetricCard({ name, value, unit = '', description }) {
  const hasValue = value !== null && value !== undefined && value !== ''
  const displayValue = hasValue && unit === '%' ? `${(value * 100).toFixed(1)}%` : hasValue ? `${value}${unit}` : 'Evaluation details coming soon'
  return <article className={`metric-card ${hasValue ? 'has-value' : ''}`}><span>{name}</span><strong>{displayValue}</strong><small>{description || (hasValue ? 'From project data' : 'Update projects.js when available')}</small></article>
}
