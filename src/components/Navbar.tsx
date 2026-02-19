import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#FFF9F5] antialiased">
        {/* RESPONSIVE NAVBAR */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16 gap-4">
              
              {/* Logo - Text smaller on mobile */}
              <a href="/" className="flex-shrink-0">
                <h1 className="text-xl sm:text-2xl font-black text-orange-600 tracking-tighter">
                  TAYABLI
                </h1>
              </a>

              {/* Search Bar - Expands on desktop, hides placeholder text on tiny screens */}
              <div className="flex-1 max-w-md relative group">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full bg-gray-100 border-transparent rounded-full py-2 pl-9 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                />
                <span className="absolute left-3 top-2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                  🔍
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Login - Hidden on very small phones to save space */}
                <button className="hidden xs:block text-xs sm:text-sm font-bold text-gray-600 hover:text-orange-600 transition">
                  Log In
                </button>
                
                {/* Create Button - Icon only on mobile, text on desktop */}
                <a 
                  href="/add" 
                  className="bg-orange-600 text-white p-2 sm:px-5 sm:py-2 rounded-full text-sm font-bold hover:bg-orange-700 shadow-md shadow-orange-200 transition-all active:scale-95"
                >
                  <span className="hidden sm:inline">+ Create</span>
                  <span className="sm:hidden text-lg leading-none">+</span>
                </a>
              </div>

            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}