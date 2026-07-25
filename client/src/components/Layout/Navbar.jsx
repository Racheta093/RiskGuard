const Navbar = () => {
  return (
    <header className="h-14 border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur flex items-center px-5 gap-4 shrink-0">
      {/* macOS-style window controls */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>

      <div className="w-px h-5 bg-zinc-800" />

      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold font-display shrink-0">
          D
        </div>
        <h1 className="text-base font-semibold font-display tracking-tight text-white">
          DocuMind
        </h1>
      </div>
    </header>
  );
};

export default Navbar;
