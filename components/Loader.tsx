export default function Loader() {
  return (
    <div className="page-loader">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin" />
        <p className="text-xs tracking-widest uppercase text-[#c9a84c]/60 font-body">Loading...</p>
      </div>
    </div>
  );
}
