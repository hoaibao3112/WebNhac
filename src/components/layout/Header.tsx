"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ListeningRoomUI from "@/components/player/ListeningRoomUI";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-[#050505]/60 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between sticky top-0 z-50 transition-all duration-300">
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
            className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/10 transition-all duration-300"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-4">
        {/* 🎧 Party Stream - Listening Room */}
        <ListeningRoomUI />

        {/* Upload Button */}
        <button className="text-gray-400 hover:text-white transition">
          <span className="text-xl">⬆️</span>
        </button>

        {/* FREE/VIP Badge */}
        <div className="px-4 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold">
          FREE
        </div>

        {/* User Menu or Login Button */}
        {isAuthenticated && user ? (
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center font-bold text-white text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-white font-medium">{user.name}</span>
              <span className="text-white text-sm">▼</span>
            </button>
            
            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 overflow-hidden z-50">
                <button 
                  onClick={() => {
                    router.push('/my-music');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-700 text-white transition"
                >
                  Thư viện của tôi
                </button>
                <button 
                  onClick={() => {
                    router.push('/my-music/upload');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-700 text-white transition"
                >
                  Tải nhạc lên
                </button>
                <div className="border-t border-zinc-700"></div>
                <button 
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                    router.push('/');
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-700 text-red-400 transition"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => router.push('/auth')} 
            className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:scale-105 hover:bg-gray-100 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Đăng nhập
          </button>
        )}

        {/* Settings */}
        <button className="text-gray-400 hover:text-white transition">
          <span className="text-xl">⚙️</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
