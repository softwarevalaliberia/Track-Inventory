import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: 'demo@trackinventory.app', password: 'demo123' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/app');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="glass-card auth-card" onSubmit={handleSubmit}>
        <div className="logo-box large">TI</div>
        <h1>Welcome back</h1>
        <p className="muted">Login to Track Inventory</p>
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <div className="error-box">{error}</div>}
        <button className="primary-btn full-width" disabled={loading}>{loading ? 'Signing in…' : 'Login'}</button>
        <p className="small">New here? <Link to="/register">Create account</Link></p>
      </form>
    </div>
  );
}
