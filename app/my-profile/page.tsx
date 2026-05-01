import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function MyProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const user = session.user;

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-3 font-body">Account</p>
          <h1 className="font-display text-4xl font-bold">My Profile</h1>
        </div>

        <div className="border border-[#c9a84c]/20 bg-[#1a1915] p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={96}
                height={96}
                className="rounded-full border-2 border-[#c9a84c]/40"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#c9a84c]/10 border-2 border-[#c9a84c]/40 flex items-center justify-center">
                <span className="font-display text-4xl text-[#c9a84c]">{user.name?.[0]?.toUpperCase()}</span>
              </div>
            )}
            <div>
              <h2 className="font-display text-2xl font-bold">{user.name}</h2>
              <p className="text-sm text-[#f0ece0]/50 font-body mt-1">{user.email}</p>
              <p className="text-xs text-[#c9a84c]/60 uppercase tracking-widest mt-2 font-body">
                Member since {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
              </p>
            </div>
          </div>

          <div className="border-t border-[#c9a84c]/10 pt-8">
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "Display Name", value: user.name },
                { label: "Email Address", value: user.email },
                { label: "Photo URL", value: user.image || "Not set" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start border-b border-[#c9a84c]/10 pb-4">
                  <span className="text-xs uppercase tracking-widest text-[#f0ece0]/40 font-body">{label}</span>
                  <span className="text-sm text-[#f0ece0]/80 font-body text-right max-w-xs truncate">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              href="/update-profile"
              className="px-8 py-3 text-xs tracking-widest uppercase font-body font-medium"
              style={{ background: "linear-gradient(135deg,#c9a84c,#f0d080)", color: "#0f0e0a" }}
            >
              Update Information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
