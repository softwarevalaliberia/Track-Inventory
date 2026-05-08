import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function TransfersPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ recipient: '', channel: 'Mobile Money', amount: '' });

  const load = () => apiFetch('/transfers').then(setItems);
  useEffect(() => { load().catch(console.error); }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    await apiFetch('/transfers', { method: 'POST', body: JSON.stringify(form) });
    setForm({ recipient: '', channel: 'Mobile Money', amount: '' });
    load();
  }

  return (
    <section className="content-grid two-col">
      <form className="glass-card form-card" onSubmit={handleSubmit}>
        <h2>New transfer</h2>
        <input placeholder="Recipient" value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })} />
        <select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })}>
          <option>Mobile Money</option>
          <option>Bank Transfer</option>
          <option>Wallet Float</option>
        </select>
        <input placeholder="Amount" type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        <button className="primary-btn">Send transfer</button>
      </form>

      <article className="glass-card table-card">
        <h2>Recent transfers</h2>
        <table>
          <thead>
            <tr><th>Recipient</th><th>Channel</th><th>Amount</th><th>Status</th></tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.recipient}</td>
                <td>{item.channel}</td>
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
