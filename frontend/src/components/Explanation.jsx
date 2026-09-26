import { BookOpen, Check, CircleHelp, LineChart, ScanSearch } from 'lucide-react';

const steps = [
  { icon: ScanSearch, title: 'Bring data', detail: 'Study hours and marks become plotted observations.' },
  { icon: LineChart, title: 'Fit a line', detail: 'Least squares picks the line with the smallest squared errors.' },
  { icon: CircleHelp, title: 'Predict a score', detail: 'The line gives a continuous predicted mark for each student.' },
  { icon: Check, title: 'Make a decision', detail: 'Your threshold turns each prediction into PASS or FAIL.' },
];

const terms = [
  ['Slope', 'How much the predicted mark changes per extra study hour.'],
  ['Intercept', 'The line’s predicted mark when study hours are zero.'],
  ['Residual', 'Actual mark minus predicted mark for one observation.'],
  ['MSE / RMSE', 'Average squared error; RMSE returns it to mark-sized units.'],
  ['R²', 'How much of the variation in marks the fitted line explains.'],
];

export default function Explanation() {
  return (
    <section className="learning-section" aria-labelledby="learning-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A QUICK FIELD GUIDE</span>
          <h2 id="learning-heading">From dots to decisions</h2>
        </div>
        <BookOpen className="learning-mark" size={22} aria-hidden="true" />
      </div>
      <div className="steps-row">
        {steps.map(({ icon: Icon, title, detail }, index) => (
          <article className="step-item" key={title}>
            <div className="step-icon"><Icon size={17} aria-hidden="true" /><span>{String(index + 1).padStart(2, '0')}</span></div>
            <h3>{title}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </div>
      <div className="terms-grid">
        {terms.map(([term, definition]) => (
          <div className="term-item" key={term}><strong>{term}</strong><span>{definition}</span></div>
        ))}
      </div>
    </section>
  );
}
