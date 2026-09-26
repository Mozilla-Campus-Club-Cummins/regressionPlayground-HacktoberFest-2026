import { Activity, ChartNoAxesCombined, CircleDot, Gauge, Sigma, TrendingUp } from 'lucide-react';

const metrics = [
  { key: 'r2', label: 'R-squared', icon: ChartNoAxesCombined, format: (value) => value.toFixed(3) },
  { key: 'rmse', label: 'RMSE', icon: Gauge, format: (value) => value.toFixed(2) },
  { key: 'mae', label: 'MAE', icon: Activity, format: (value) => value.toFixed(2) },
  { key: 'mse', label: 'MSE', icon: Sigma, format: (value) => value.toFixed(2) },
];

export default function MetricsPanel({ model, sampleCount, passCount, failCount }) {
  return (
    <section className="metrics-section" aria-labelledby="metrics-heading">
      <div className="section-heading compact-heading">
        <div>
          <span className="eyebrow">MODEL SNAPSHOT</span>
          <h2 id="metrics-heading">A few numbers, lots of insight.</h2>
        </div>
      </div>
      <div className="metrics-grid">
        {metrics.map(({ key, label, icon: Icon, format }) => (
          <article className="metric-card" key={key}>
            <div className="metric-topline"><span>{label}</span><Icon size={17} aria-hidden="true" /></div>
            <strong>{format(model[key])}</strong>
          </article>
        ))}
        <article className="metric-card metric-card-quiet">
          <div className="metric-topline"><span>Samples</span><CircleDot size={17} aria-hidden="true" /></div>
          <strong>{sampleCount}</strong>
        </article>
        <article className="metric-card metric-card-pass">
          <div className="metric-topline"><span>Predicted PASS</span><span className="status-dot pass-dot" /></div>
          <strong>{passCount}</strong>
        </article>
        <article className="metric-card metric-card-fail">
          <div className="metric-topline"><span>Predicted FAIL</span><span className="status-dot fail-dot" /></div>
          <strong>{failCount}</strong>
        </article>
        <article className="metric-card metric-card-quiet equation-card">
          <div className="metric-topline"><span>Fitted line</span><TrendingUp size={17} aria-hidden="true" /></div>
          <strong className="equation-small">ŷ = {model.intercept.toFixed(1)} {model.slope < 0 ? '−' : '+'} {Math.abs(model.slope).toFixed(1)}x</strong>
        </article>
      </div>
    </section>
  );
}
