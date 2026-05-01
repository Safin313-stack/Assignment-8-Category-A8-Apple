"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", image: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authClient.updateUser({
        name: form.name || undefined,
        image: form.image || undefined,
      });
      toast.success("Profile updated!");
      router.push("/my-profile");
    } catch {
      toast.error("Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 flex items-center justify-center px-4"
      style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 70%), #0f0e0a" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-3 font-body">Account</p>
          <h1 className="font-display text-3xl font-bold">Update Information</h1>
        </div>

        <div className="border border-[#c9a84c]/20 bg-[#1a1915] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs tracking-widest uppercase text-[#f0ece0]/50 font-body block mb-2">New Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={session?.user?.name || "Your name"}
                className="w-full px-4 py-3 bg-[#0f0e0a] border border-[#c9a84c]/20 text-[#f0ece0] focus:outline-none focus:border-[#c9a84c] text-sm font-body transition-colors"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-[#f0ece0]/50 font-body block mb-2">New Photo URL</label>
              <input
                type="url"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-[#0f0e0a] border border-[#c9a84c]/20 text-[#f0ece0] focus:outline-none focus:border-[#c9a84c] text-sm font-body transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm tracking-widest uppercase font-body font-medium disabled:opacity-50"
              style={{ background: "linear-gradient(135deg,#c9a84c,#f0d080)", color: "#0f0e0a" }}
            >
              {loading ? "Updating..." : "Update Information"}
            </button>

            <div className="text-center">
              <Link href="/my-profile" className="text-xs text-[#f0ece0]/40 hover:text-[#c9a84c] font-body transition-colors">
                ← Back to Profile
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
