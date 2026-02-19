import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#FCF9F2] text-[#1A1A1A] antialiased">
        <nav className="sticky top-0 z-50 bg-[#FCF9F2]/80 backdrop-blur-xl border-b border-black/5">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
            {/* Brand */}
            <a href="/" className="text-2xl font-black tracking-tighter uppercase italic">
              Tayabli<span className="text-[#E35933]">.</span>
            </a>

            {/* Premium Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg relative group">
              <input 
                type="text" 
                placeholder="Find a recipe (e.g. Mtewem, Rechta...)" 
                className="w-full bg-black/5 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#E35933]/20 transition-all outline-none"
              />
              <span className="absolute left-4 top-3.5 opacity-40">🔍</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <button className="text-sm font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition">Log In</button>
              <a 
                href="/add" 
                className="bg-[#1A1A1A] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#E35933] transition-all duration-300 shadow-xl shadow-black/10"
              >
                Share Recipe
              </a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}