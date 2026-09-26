import { SlidersHorizontal } from 'lucide-react';

export default function ThresholdControl({ threshold, setThreshold, min, max, passCount, failCount }) {
  const step = Math.max((max - min) / 200, 0.1);

  return (
    <section className="threshold-panel" aria-labelledby="threshold-heading">
      <div className="threshold-header">
        <div className="section-title-inline">
          <span className="icon-tile threshold-icon"><SlidersHorizontal size={18} aria-hidden="true" /></span>
          <div>
            <span className="eyebrow">YOUR DECISION RULE</span>
            <h2 id="threshold-heading">Set the pass mark</h2>
          </div>
        </div>
        <div className="threshold-value"><span>Threshold</span><strong>{threshold.toFixed(1)}<small> marks</small></strong></div>
      </div>
      <label className="sr-only" htmlFor="threshold-slider">Decision threshold in marks</label>
      <input
        className="threshold-slider"
        id="threshold-slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={threshold}
        onChange={(event) => setThreshold(Number(event.target.value))}
        style={{ '--slider-progress': `${((threshold - min) / (max - min || 1)) * 100}%` }}
      />
      <div className="slider-limits"><span>{min.toFixed(0)} marks</span><span>{max.toFixed(0)} marks</span></div>
      <div className="decision-summary" aria-live="polite">
        <div className="decision-count"><span className="status-dot pass-dot" /><span>Predicted PASS</span><strong>{passCount}</strong></div>
        <div className="decision-divider" />
        <div className="decision-count"><span className="status-dot fail-dot" /><span>Predicted FAIL</span><strong>{failCount}</strong></div>
      </div>
      <p className="threshold-note">This cutoff is a decision made <strong>after</strong> regression. It never changes the fitted line or its error metrics.</p>
    </section>
  );
}
