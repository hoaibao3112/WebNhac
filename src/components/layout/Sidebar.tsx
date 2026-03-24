"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: "🔍", label: "Khám Phá", href: "/" },
    { icon: "🎧", label: "Dành Cho Bạn", href: "/for-you" },
    { icon: "👤", label: "Của Tôi", href: "/my-music" },
  ];

  const libraryItems = [
    { label: "Thư viện", href: "/library" },
    { label: "Bài hát yêu thích", href: "/favorites" },
  ];

  return (
    <aside className="w-64 bg-[#050505]/40 backdrop-blur-3xl border-r border-white/5 text-white flex flex-col z-20 transition-all">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-2xl group-hover:scale-110 transition-transform">🎵</span>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">PartyNhac</span>
        </Link>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-3">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-purple-500/10 to-transparent text-white border-l-2 border-purple-500 shadow-[inset_0_0_20px_rgba(168,85,247,0.05)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                }`}
              >
                <span className={`text-xl transition-transform ${pathname === item.href ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="my-4 border-t border-zinc-800"></div>

        {/* Library Section */}
        <ul className="space-y-2">
          {libraryItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                  pathname === item.href
                    ? "text-white bg-white/10 font-medium"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Login Button */}
      <div className="p-6 border-t border-white/5 mt-auto mb-20">
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-semibold hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
          Đăng nhập
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
