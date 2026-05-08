import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function BillsPage() {
  const [items, setItems] = useState([]);
  const load = () => apiFetch('/bills').then(setItems);
  useEffect(() => { load().catch(console.error); }, []);

  async function payBill(id) {
    await apiFetch('/bills/pay', { method: 'POST', body: JSON.stringify({ billId: id }) });
    load();
  }

  return (
    <article className="glass-card table-card">
      <div className="section-head">
        <h2>Bill center</h2>
        <span className="muted">One-click payment simulation</span>
      </div>
      <table>
        <thead>
          <tr><th>Vendor</th><th>Reference</th><th>Due</th><th>Amount</th><th>Status</th><th /></tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.vendor}</td>
              <td>{item.account_ref}</td>
              <td>{item.due_date}</td>
              <td>${item.amount}</td>
              <td><span className={`status ${item.status}`}>{item.status}</span></td>
              <td>{item.status === 'pending' ? <button className="secondary-btn" onClick={() => payBill(item.id)}>Pay now</button> : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
