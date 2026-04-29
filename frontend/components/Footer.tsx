import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[rgba(0,0,0,0.3)] border-t border-[rgba(255,255,255,0.1)] py-12">
      <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center flex-wrap gap-8">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <Image src="/logo.png" width={24} height={24} alt="Glitchless Logo" className="drop-shadow-[0_0_10px_rgba(0,242,255,0.5)]" />
            <span className="font-bold">Glitchless</span>
          </div>
          <p className="text-[var(--secondary)] mt-2">Turn chaotic logs into clear success</p>
        </div>
        <div className="flex gap-8">
          <Link href="/privacy" className="text-[var(--secondary)] no-underline transition-colors hover:text-[var(--accent)]">Privacy</Link>
          <Link href="/terms" className="text-[var(--secondary)] no-underline transition-colors hover:text-[var(--accent)]">Terms</Link>
          <Link href="/documentation" className="text-[var(--secondary)] no-underline transition-colors hover:text-[var(--accent)]">Documentation</Link>
          <Link href="/support" className="text-[var(--secondary)] no-underline transition-colors hover:text-[var(--accent)]">Support</Link>
        </div>
      </div>
    </footer>
  );
}
