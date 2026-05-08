import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function ReportsPage() {
  const [report, setReport] = useState({ totals: [], monthly: [] });
  useEffect(() => {
    apiFetch('/reports/overview').then(setReport).catch(console.error);
  }, []);

  return (
    <section className="content-grid two-col">
      <article className="glass-card table-card">
        <h2>Category totals</h2>
        <table>
          <thead><tr><th>Category</th><th>Total</th></tr></thead>
          <tbody>
            {report.totals.map((item) => (
              <tr key={item.category}><td>{item.category}</td><td>${item.total}</td></tr>
            ))}
          </tbody>
        </table>
      </article>

      <article className="glass-card table-card">
        <h2>Monthly volume</h2>
        <div className="bar-stack">
          {report.monthly.map((item) => (
            <div key={item.month} className="bar-line">
              <span>{item.month}</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.min(item.total / 6, 100)}%` }} /></div>
              <strong>${item.total}</strong>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
