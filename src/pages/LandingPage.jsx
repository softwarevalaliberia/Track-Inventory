import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Bill payments',
    body: 'Consolidate utilities, merchant invoices, and recurring dues in one workspace.'
  },
  {
    title: 'Fast transfers',
    body: 'Launch operator, bank, or branch transfers with status tracking and audit history.'
  },
  {
    title: 'Live reports',
    body: 'Monitor transaction categories, monthly movement, and high-value activities in real time.'
  }
];

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <div className="logo-box">TI</div>
        <div className="nav-actions">
          <Link to="/login" className="nav-link-text">Sign In</Link>
          <span className="nav-link-text">English</span>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-copy glass-card hero-card">
          <div className="eyebrow">MoniTrack-inspired rebuild</div>
          <h1>Track Inventory</h1>
          <p className="tagline">Track. Print. Grow.</p>
          <p className="hero-text">
            A React + CSS financial operations platform with real authentication, SQLite persistence,
            bill management, transfer workflows, and analytics.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="primary-btn">Create account</Link>
            <Link to="/login" className="secondary-btn">Demo login</Link>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        {features.map((feature) => (
          <article key={feature.title} className="glass-card feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
