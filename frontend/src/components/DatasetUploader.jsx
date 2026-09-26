import { useRef } from 'react';
import { RotateCcw, Upload } from 'lucide-react';

function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 3) throw new Error('Add a header and at least two data rows.');

  const first = lines[0].split(',').map((cell) => cell.trim().toLowerCase());
  const hasHeader = first[0] === 'x' && first[1] === 'y';
  const rows = hasHeader ? lines.slice(1) : lines;
  const points = rows.map((line, index) => {
    const columns = line.split(',').map((cell) => cell.trim());
    if (columns.length !== 2 || !columns[0] || !columns[1]) {
      throw new Error(`Row ${index + (hasHeader ? 2 : 1)} must contain exactly two values: x,y.`);
    }
    const [x, y] = columns.map(Number);
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      throw new Error(`Row ${index + (hasHeader ? 2 : 1)} contains a value that is not a finite number.`);
    }
    return { x, y };
  });

  if (points.length < 2) throw new Error('At least two data rows are required.');
  if (new Set(points.map((point) => point.x)).size < 2) {
    throw new Error('At least two distinct x values are required to fit a line.');
  }
  return points;
}

export default function DatasetUploader({ onUpload, onReset, datasetName }) {
  const inputRef = useRef(null);

  async function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      onUpload(parseCsv(await file.text()), file.name);
    } catch (error) {
      onUpload(null, error.message);
    } finally {
      event.target.value = '';
    }
  }

  return (
    <div className="dataset-controls">
      <input ref={inputRef} type="file" accept=".csv,text/csv" onChange={handleFile} hidden aria-label="Upload a CSV dataset" />
      <button className="button button-primary" type="button" onClick={() => inputRef.current?.click()}>
        <Upload size={16} aria-hidden="true" /> Upload CSV
      </button>
      <button className="button button-secondary" type="button" onClick={onReset}>
        <RotateCcw size={15} aria-hidden="true" /> Reset
      </button>
      <span className="dataset-name" title={datasetName}>{datasetName}</span>
    </div>
  );
}

export { parseCsv };
