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
    <aside className="w-64 bg-black text-white flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🎵</span>
          <span className="text-xl font-bold text-primary">WebNhac</span>
        </Link>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-3">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-zinc-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
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
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-zinc-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Login Button */}
      <div className="p-6 border-t border-zinc-800">
        <button className="w-full bg-white text-black py-3 rounded-full font-semibold hover:scale-105 transition-transform">
          Đăng nhập
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
