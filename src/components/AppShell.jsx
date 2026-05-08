import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  ['Overview', '/app'],
  ['Transactions', '/app/transactions'],
  ['Bills', '/app/bills'],
  ['Transfers', '/app/transfers'],
  ['Reports', '/app/reports']
];

export default function AppShell() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar glass-card">
        <div>
          <div className="brand-badge">TI</div>
          <h2>Track Inventory</h2>
          <p className="muted">Track. Print. Grow.</p>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/app'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div>
            <strong>{user?.fullName || 'User'}</strong>
            <p className="muted small">{user?.email}</p>
          </div>
          <button className="secondary-btn full-width" onClick={logout}>Sign out</button>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar glass-card">
          <div>
            <span className="eyebrow">Finance OS</span>
            <h1>Operations dashboard</h1>
          </div>
          <div className="status-pill">Blue brand system</div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
