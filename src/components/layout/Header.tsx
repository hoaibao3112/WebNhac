"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  return (
    <header className="bg-zinc-900/95 backdrop-blur-md px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      {/* Navigation Buttons */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition"
        >
          <span className="text-white">←</span>
        </button>
        <button 
          onClick={() => router.forward()}
          className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition"
        >
          <span className="text-white">→</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, album..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-black px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            🔍
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-4">
        {/* Upload Button */}
        <button className="text-gray-400 hover:text-white transition">
          <span className="text-xl">⬆️</span>
        </button>

        {/* FREE/VIP Badge */}
        <div className="px-4 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold">
          FREE
        </div>

        {/* Login Button */}
        <button className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform">
          Đăng nhập
        </button>

        {/* Settings */}
        <button className="text-gray-400 hover:text-white transition">
          <span className="text-xl">⚙️</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
