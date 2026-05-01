import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4"
      style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%), #0f0e0a" }}>
      <div>
        <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-6 font-body">Lost in the gallery</p>
        <h1 className="font-display text-8xl font-bold gold-text mb-4">404</h1>
        <p className="text-[#f0ece0]/60 font-body text-lg mb-8">This page doesn't exist.</p>
        <Link
          href="/"
          className="px-8 py-3 text-xs tracking-widest uppercase font-body"
          style={{ background: "linear-gradient(135deg,#c9a84c,#f0d080)", color: "#0f0e0a" }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
