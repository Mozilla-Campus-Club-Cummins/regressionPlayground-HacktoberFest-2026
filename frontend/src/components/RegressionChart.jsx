import { useMemo } from 'react';
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const point = payload.find((entry) => entry.payload?.actual !== undefined)?.payload;
  if (!point) return null;
  return (
    <div className="chart-tooltip">
      <strong>{point.x.toFixed(1)} study hours</strong>
      <span>Actual mark <b>{point.actual.toFixed(1)}</b></span>
      <span>Predicted <b>{point.predicted.toFixed(1)}</b></span>
      <span>Decision <b className={point.decision === 'PASS' ? 'tooltip-pass' : 'tooltip-fail'}>{point.decision}</b></span>
    </div>
  );
}

export default function RegressionChart({ data, model, threshold }) {
  const chartData = useMemo(
    () => model.predictions.map((row) => ({
      ...row,
      decision: row.predicted >= threshold ? 'PASS' : 'FAIL',
    })),
    [model.predictions, threshold],
  );
  const lineData = useMemo(() => {
    const xValues = data.map((point) => point.x);
    const low = Math.min(...xValues);
    const high = Math.max(...xValues);
    return [
      { x: low, fitted: model.intercept + model.slope * low },
      { x: high, fitted: model.intercept + model.slope * high },
    ];
  }, [data, model.intercept, model.slope]);

  return (
    <section className="chart-panel" aria-labelledby="chart-heading">
      <div className="chart-heading-row">
        <div>
          <span className="eyebrow">THE BIG PICTURE</span>
          <h2 id="chart-heading">Study time vs. exam marks</h2>
          <p>Each dot is a student. Color reflects the prediction, not the actual mark.</p>
        </div>
        <span className="chart-sample-count">{data.length} observations</span>
      </div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart margin={{ top: 14, right: 20, bottom: 8, left: 0 }}>
            <CartesianGrid stroke="#e4ebe5" strokeDasharray="3 5" vertical={false} />
            <XAxis
              type="number"
              dataKey="x"
              name="Study hours"
              domain={['dataMin - 0.5', 'dataMax + 0.5']}
              tickLine={false}
              axisLine={{ stroke: '#cbd6cc' }}
              tick={{ fill: '#78877b', fontSize: 12 }}
              label={{ value: 'Study hours', position: 'insideBottom', offset: -2, fill: '#66756a', fontSize: 12 }}
            />
            <YAxis
              type="number"
              dataKey="actual"
              domain={['auto', 'auto']}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#78877b', fontSize: 12 }}
              width={43}
              label={{ value: 'Exam marks', angle: -90, position: 'insideLeft', fill: '#66756a', fontSize: 12 }}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#a6b4a8', strokeDasharray: '3 4' }} />
            <Legend verticalAlign="top" align="right" height={34} iconType="circle" wrapperStyle={{ fontSize: 12, color: '#66756a' }} />
            <ReferenceLine y={threshold} stroke="#dd765b" strokeDasharray="5 5" strokeWidth={1.5} label={{ value: `Decision cutoff ${threshold.toFixed(1)}`, fill: '#c65f45', fontSize: 11, position: 'insideTopRight' }} />
            <Line
              data={lineData}
              dataKey="fitted"
              name="Best-fit line"
              type="linear"
              stroke="#3e765c"
              strokeWidth={3}
              dot={false}
              activeDot={false}
              legendType="line"
            />
            <Scatter data={chartData.filter((point) => point.decision === 'PASS')} dataKey="actual" name="Predicted PASS" fill="#2f8a68" legendType="circle" />
            <Scatter data={chartData.filter((point) => point.decision === 'FAIL')} dataKey="actual" name="Predicted FAIL" fill="#dd765b" legendType="circle" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-footnote"><span className="threshold-line-key" /> Dashed line = chosen threshold</div>
    </section>
  );
}
