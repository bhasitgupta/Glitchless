"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Analysis() {
  const [plainEnglish, setPlainEnglish] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install --legacy-peer-deps');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: '#0B0E14', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav className="navbar" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <div className="logo">G Glitchless</div>
          <div className="nav-links">
              <label style={{ marginRight: '20px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={plainEnglish} onChange={(e) => setPlainEnglish(e.target.checked)} /> Plain English
              </label>
              <Link href="/legacy/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>&larr; Back to Dashboard</Link>
          </div>
      </nav>
      
      <main className="analysis-layout" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
          <div className="panel log-panel" style={{ background: '#111', padding: '20px', border: '1px solid #333', marginBottom: '20px', borderRadius: '5px', borderLeft: '4px solid #FF4C4C' }}>
              <h3>Terminal Logs</h3>
              <pre style={{ background: '#000', padding: '15px', overflowX: 'auto', margin: '15px 0' }}><code>{`npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! Found: react@18.2.0
npm ERR! node_modules/react
npm ERR!   react@"^18.2.0" from the root project`}</code></pre>
          </div>
          
          <div className="panel insight-panel" style={{ background: '#111', padding: '20px', border: '1px solid #333', marginBottom: '20px', borderRadius: '5px', borderLeft: '4px solid #00F2FF' }}>
              <h3>Insight Stream</h3>
              {!plainEnglish ? (
                <div className="technical-content" style={{ marginTop: '15px' }}>
                    Dependency conflict resolving 'react'. Expected version differs from root project requirements causing ERESOLVE.
                </div>
              ) : (
                <div className="plain-english-content" style={{ color: '#00F2FF', marginTop: '15px' }}>
                    You are trying to install a package that needs an older or different version of React than the one you currently have installed (v18.2.0).
                </div>
              )}
          </div>
          
          <div className="panel fix-panel" style={{ background: '#111', padding: '20px', border: '1px solid #333', marginBottom: '20px', borderRadius: '5px', borderLeft: '4px solid #00FF66' }}>
              <h3>Auto-Fix</h3>
              <div className="fix-item" style={{ marginTop: '15px' }}>
                  <label><input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} style={{ marginRight: '10px' }} /> Step 1: Run with legacy peer dependencies</label>
              </div>
              <pre style={{ background: '#000', padding: '15px', marginTop: '15px' }}><code id="fixCode">npm install --legacy-peer-deps</code></pre>
              <button onClick={handleCopy} style={{ padding: '10px 20px', background: '#00FF66', color: '#000', border: 'none', cursor: 'pointer', marginTop: '15px', borderRadius: '4px' }}>
                {copied ? 'Copied!' : 'Copy Fix'}
              </button>
          </div>
      </main>
    </div>
  );
}
