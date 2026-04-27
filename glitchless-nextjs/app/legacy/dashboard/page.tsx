"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing...");
  const [url, setUrl] = useState("");

  const startScan = () => {
    setIsScanning(true);
    let currentProgress = 0;
    const statuses = [
      'Connecting to repository...',
      'Scanning log files...',
      'Analyzing error patterns...',
      'Identifying root cause...',
      'Generating insights...'
    ];
    
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      
      const statusIndex = Math.floor(currentProgress / 20);
      if (statusIndex < statuses.length) {
        setStatus(statuses[statusIndex]);
      }
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setStatus('Analysis complete!');
        setTimeout(() => {
          router.push('/legacy/analysis');
        }, 500);
      }
    }, 40);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    startScan();
  };

  return (
    <div style={{ background: '#0B0E14', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav className="navbar" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <div className="logo">G Glitchless</div>
          <div className="nav-links">
              <span>Welcome, dev_user</span>
              <Link href="/legacy" style={{ marginLeft: '20px', color: '#FF4C4C', textDecoration: 'none' }}>Logout</Link>
          </div>
      </nav>
      <main className="dashboard" style={{ maxWidth: '800px', margin: '50px auto', textAlign: 'center' }}>
          <h2>Analyze Logs</h2>
          <div 
            className="drop-zone" 
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={startScan}
            style={{ border: '2px dashed #00F2FF', padding: '50px', margin: '20px 0', cursor: 'pointer' }}
          >
              <p>Drag and drop .log or .txt file here (or click)</p>
          </div>
          <p>OR</p>
          <div className="url-input-container" style={{ marginTop: '20px' }}>
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter GitHub repo URL..." 
                style={{ padding: '10px', width: '60%', background: '#111', color: '#fff', border: '1px solid #333' }}
              />
              <button onClick={startScan} style={{ padding: '10px 20px', background: '#00F2FF', color: '#000', border: 'none', cursor: 'pointer' }}>Analyze</button>
          </div>
      </main>

      {isScanning && (
        <div className="overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="scanner" style={{ textAlign: 'center', color: '#00F2FF' }}>
                <p>{status}</p>
                <div style={{ width: '300px', height: '10px', background: '#333', borderRadius: '5px', overflow: 'hidden', marginTop: '10px' }}>
                  <div style={{ height: '100%', background: '#00F2FF', width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
