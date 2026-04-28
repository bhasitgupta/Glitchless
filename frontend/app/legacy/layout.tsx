import './style.css';
import './dashboard.css';
import './analysis.css';

export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="legacy-app-wrapper">
      {children}
    </div>
  );
}
