import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/privacy", label: "Privacy", active: pathname === "/privacy" },
    { href: "/terms", label: "Terms", active: pathname === "/terms" },
    { href: "/documentation", label: "Documentation", active: pathname === "/documentation" },
    { href: "/support", label: "Support", active: pathname === "/support" },
  ];

  return (
    <footer className="bg-[rgba(0,0,0,0.3)] border-t border-[rgba(255,255,255,0.1)] py-12">
      <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center flex-wrap gap-8">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <Image src="/logo.png" width={28} height={28} alt="Glitchless Logo" className="drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]" />
            <span className="font-bold text-xl bg-gradient-to-r from-white via-sky-200 to-cyan-400 bg-clip-text text-transparent">
              Glitchless
            </span>
          </div>
          <p className="text-[var(--secondary)] mt-2">Turn chaotic logs into clear success</p>
        </div>
        <div className="flex gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`no-underline transition-colors ${
                link.active
                  ? "text-[var(--accent)]"
                  : "text-[var(--secondary)] hover:text-[var(--accent)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
