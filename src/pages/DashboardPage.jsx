import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function DashboardPage() {
  const [summary, setSummary] = useState({ cards: [], transactions: [] });

  useEffect(() => {
    apiFetch('/dashboard/summary').then(setSummary).catch(console.error);
  }, []);

  return (
    <section className="content-grid">
      <div className="card-row">
        {summary.cards.map((card) => (
          <article key={card.label} className="glass-card metric-card">
            <span className="muted small">{card.label}</span>
            <h3>{card.value}</h3>
            <p className="trend">{card.trend}</p>
          </article>
        ))}
      </div>

      <article className="glass-card table-card">
        <div className="section-head">
          <h2>Latest activity</h2>
          <span className="status-pill">Realtime snapshot</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Provider</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {summary.transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.provider}</td>
                <td><span className={`status ${item.status}`}>{item.status}</span></td>
                <td>${item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
