export async function fitRegression(data, signal) {
  const response = await fetch('/api/regression', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
    signal,
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => null);
    const message = Array.isArray(detail?.detail)
      ? detail.detail.map((item) => item.msg).join(' ')
      : detail?.detail;
    throw new Error(message || 'Could not calculate the regression model.');
  }

  return response.json();
}
