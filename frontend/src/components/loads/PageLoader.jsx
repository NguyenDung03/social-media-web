function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 w-15 h-15 rounded-full border-4 border-transparent border-t-cyan-500 border-r-pink-500 animate-spin shadow-lg shadow-cyan-500/50"></div>

          {/* Middle pulsing ring */}
          <div className="absolute inset-0 w-15 h-15 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-4 border-transparent border-t-blue-400 border-r-pink-400 animate-spin animation-delay-150"></div>
          </div>

          {/* Inner glowing ring */}
          <div className="absolute inset-0 w-15 h-15 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-pink-400 opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* Loading text with gradient */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 font-bold text-xl animate-pulse drop-shadow-sm">
            Đang tải...
          </p>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce shadow-lg shadow-cyan-500/50"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-200 shadow-lg shadow-blue-500/50"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce animation-delay-400 shadow-lg shadow-pink-500/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageLoader;
