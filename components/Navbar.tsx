"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#c9a84c]/20 backdrop-blur-md"
      style={{ background: "rgba(15,14,10,0.85)" }}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#c9a84c,#f0d080)" }}>
            <span className="text-black font-bold text-sm">T</span>
          </div>
          <span className="font-display text-xl tracking-widest gold-text font-bold">TileVerse</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "/", label: "Home" },
            { href: "/all-tiles", label: "All Tiles" },
            { href: "/my-profile", label: "My Profile" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm tracking-widest uppercase text-[#f0ece0]/70 hover:text-[#c9a84c] transition-colors duration-200 font-body"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <span className="loading loading-spinner loading-sm" style={{ color: "#c9a84c" }} />
          ) : session ? (
            <div className="flex items-center gap-3">
              <Link href="/my-profile" className="flex items-center gap-2">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={32}
                    height={32}
                    className="rounded-full border border-[#c9a84c]/50"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c] text-sm font-bold">
                    {session.user.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <span className="text-sm text-[#f0ece0]/80 hidden md:block">{session.user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-sm border border-[#c9a84c]/50 text-[#c9a84c] bg-transparent hover:bg-[#c9a84c]/10 tracking-widest text-xs uppercase"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="btn btn-sm tracking-widest text-xs uppercase"
              style={{ background: "linear-gradient(135deg,#c9a84c,#f0d080)", color: "#0f0e0a", border: "none" }}
            >
              Login
            </Link>
          )}

          {/* Mobile menu */}
          <div className="md:hidden dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-[#1a1915] border border-[#c9a84c]/20 rounded-box w-40 mt-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/all-tiles">All Tiles</Link></li>
              <li><Link href="/my-profile">My Profile</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
