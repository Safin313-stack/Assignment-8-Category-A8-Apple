import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#c9a84c]/20 py-12 mt-auto" style={{ background: "#0a0908" }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="font-display text-2xl gold-text font-bold tracking-widest">TileVerse</span>
            <p className="mt-3 text-sm text-[#f0ece0]/50 leading-relaxed max-w-xs">
              Curating the world&apos;s finest tiles for those who believe every surface tells a story.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#c9a84c] mb-4 font-body">Explore</h4>
            <ul className="space-y-2 text-sm text-[#f0ece0]/60">
              {[
                { href: "/", label: "Home" },
                { href: "/all-tiles", label: "All Tiles" },
                { href: "/my-profile", label: "My Profile" },
                { href: "/login", label: "Login" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-[#c9a84c] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#c9a84c] mb-4 font-body">Contact Us</h4>
            <p className="text-sm text-[#f0ece0]/60">hello@tileverse.com</p>
            <div className="flex gap-4 mt-4">
              {/* Social icons */}
              {[
                { label: "Twitter", href: "#", icon: "𝕏" },
                { label: "Instagram", href: "#", icon: "◉" },
                { label: "Pinterest", href: "#", icon: "⊕" },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-sm border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]/70 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all text-sm"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#c9a84c]/10 pt-6 text-center text-xs text-[#f0ece0]/30 tracking-widest uppercase font-body">
          © {new Date().getFullYear()} TileVerse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
