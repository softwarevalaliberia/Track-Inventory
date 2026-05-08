import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function TransactionsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', category: '', type: 'payment', amount: '', provider: '' });

  const load = () => apiFetch('/transactions').then(setItems);
  useEffect(() => { load().catch(console.error); }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    await apiFetch('/transactions', { method: 'POST', body: JSON.stringify(form) });
    setForm({ title: '', category: '', type: 'payment', amount: '', provider: '' });
    load();
  }

  return (
    <section className="content-grid two-col">
      <form className="glass-card form-card" onSubmit={handleSubmit}>
        <h2>Add transaction</h2>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="payment">Payment</option>
          <option value="transfer">Transfer</option>
        </select>
        <input placeholder="Provider" value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })} />
        <input placeholder="Amount" type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        <button className="primary-btn">Save transaction</button>
      </form>

      <article className="glass-card table-card">
        <div className="section-head"><h2>All transactions</h2></div>
        <table>
          <thead>
            <tr><th>Title</th><th>Type</th><th>Category</th><th>Amount</th><th>Status</th></tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.type}</td>
                <td>{item.category}</td>
                <td>${item.amount}</td>
                <td><span className={`status ${item.status}`}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
