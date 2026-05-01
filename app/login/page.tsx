"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn.email({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Login failed. Check credentials.");
    } else {
      toast.success("Welcome back!");
      router.push("/");
      router.refresh();
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%), #0f0e0a" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="font-display text-3xl gold-text font-bold tracking-widest">TileVerse</span>
          <h1 className="font-display text-2xl mt-4">Welcome Back</h1>
          <p className="text-sm text-[#f0ece0]/50 mt-2 font-body">Sign in to your account</p>
        </div>

        <div className="border border-[#c9a84c]/20 p-8 bg-[#1a1915]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs tracking-widest uppercase text-[#f0ece0]/50 font-body block mb-2">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f0e0a] border border-[#c9a84c]/20 text-[#f0ece0] focus:outline-none focus:border-[#c9a84c] text-sm font-body transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-[#f0ece0]/50 font-body block mb-2">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f0e0a] border border-[#c9a84c]/20 text-[#f0ece0] focus:outline-none focus:border-[#c9a84c] text-sm font-body transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm tracking-widest uppercase font-body font-medium disabled:opacity-50"
              style={{ background: "linear-gradient(135deg,#c9a84c,#f0d080)", color: "#0f0e0a" }}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="divider text-[#f0ece0]/20 text-xs my-6">OR</div>

          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full py-3 border border-[#c9a84c]/30 text-sm font-body tracking-widest uppercase text-[#f0ece0]/70 hover:border-[#c9a84c]/60 hover:text-[#f0ece0] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {googleLoading ? "Redirecting..." : "Continue with Google"}
          </button>

          <p className="text-center text-sm text-[#f0ece0]/50 mt-6 font-body">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#c9a84c] hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
