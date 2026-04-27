"use client";
import Link from 'next/link';

export default function LegacyIndex() {
  return (
    <div style={{ background: '#0B0E14', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav className="navbar" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo">G Glitchless</div>
          <div className="nav-links">
              <Link href="/legacy/dashboard" className="btn btn-primary" style={{ padding: '10px 20px', background: '#00F2FF', color: '#000', textDecoration: 'none', borderRadius: '4px' }}>Login with GitHub</Link>
          </div>
      </nav>
      <main className="hero" style={{ textAlign: 'center', marginTop: '100px' }}>
          <h1>Stop squinting at logs.<br/><span style={{ color: '#00F2FF' }}>Start shipping code.</span></h1>
          <p>Glitchless turns deployment nightmares into one-click resolutions.</p>
          <Link href="/legacy/dashboard" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.2rem', marginTop: '20px', display: 'inline-block', background: '#00F2FF', color: '#000', textDecoration: 'none', borderRadius: '4px' }}>Login with GitHub</Link>
      </main>
    </div>
  );
}
