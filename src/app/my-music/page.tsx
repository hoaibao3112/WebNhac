"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function MyMusicPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const recentPlaylists = [
    { title: "V-Pop Rising", description: "Hits mới nhất của V...", songs: 45, image: "/images/playlists/vpop.jpg" },
    { title: "Lofi Chill", description: "Beats để học bài", songs: 120, image: "/images/playlists/lofi.jpg" },
    { title: "Mưa Hè Sôi Động", description: "Nhạc cho những chuyến đi", songs: 38, image: "/images/playlists/summer.jpg" },
    { title: "Deep Focus", description: "Tập trung tối đa", songs: 87, image: "/images/playlists/focus.jpg" },
    { title: "Karaoke Hits", description: "Hát cùng bạn bè", songs: 56, image: "/images/playlists/karaoke.jpg" },
  ];

  const recentSongs = [
    { title: "Mơ hồ", artist: "Vũ Cát Tường", album: "Stardom", date: "2 ngày trước", duration: "3:42", liked: true },
    { title: "Thằng Mây Em Nhớ Anh?", artist: "Hà Anh Tuấn", album: "Single", date: "3 ngày trước", duration: "4:15", liked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white px-8 py-6">
      <h1 className="text-5xl font-bold mb-8">Thư viện của tôi</h1>

      {/* Tabs Navigation */}
      <div className="flex gap-8 mb-10 border-b border-gray-700 pb-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-3 font-semibold transition text-lg ${
            activeTab === "overview"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Tổng quan
        </button>
        <button
          onClick={() => setActiveTab("playlists")}
          className={`px-4 py-3 font-semibold transition text-lg ${
            activeTab === "playlists"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Danh sách phát
        </button>
        <button
          onClick={() => setActiveTab("artists")}
          className={`px-4 py-3 font-semibold transition text-lg ${
            activeTab === "artists"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Nghệ sĩ
        </button>
        <button
          onClick={() => setActiveTab("albums")}
          className={`px-4 py-3 font-semibold transition text-lg ${
            activeTab === "albums"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Album
        </button>
      </div>

      {/* Bài hát đã thích - Featured Card */}
      <Link
        href="/favorites"
        className="block mb-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 hover:scale-[1.02] transition-transform shadow-2xl"
      >
        <div className="flex items-center gap-8">
          <div className="w-40 h-40 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-2xl">
            <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-3">Bài hát đã thích</h2>
            <p className="text-purple-100 text-lg mb-6">428 bài hát • Đã lưu vào thư viện</p>
            <div className="flex gap-4">
              <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-110 transition shadow-lg">
                <svg className="w-7 h-7 text-purple-700 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <button className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-zinc-800/50 rounded-xl p-6 hover:bg-zinc-800 transition cursor-pointer group">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition">
              <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-1">Mới phát gần đây</h3>
              <p className="text-sm text-gray-400">Tiếp tục nghe nhạc của bạn</p>
            </div>
            <svg className="w-7 h-7 text-gray-400 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </div>
        </div>

        <div className="bg-zinc-800/50 rounded-xl p-6 hover:bg-zinc-800 transition cursor-pointer group">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition">
              <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-1">Đã tải xuống</h3>
              <p className="text-sm text-gray-400">168 bài hát offline</p>
            </div>
            <svg className="w-7 h-7 text-gray-400 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Playlist gần đây */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Playlist gần đây</h2>
          <Link href="/playlists" className="text-sm text-gray-400 hover:text-white font-semibold uppercase tracking-wider">
            Xem tất cả
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {recentPlaylists.map((playlist, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-zinc-800/30 rounded-xl p-5 hover:bg-zinc-800 transition-all duration-300"
            >
              <div className="relative mb-5">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden shadow-xl">
                  <div className="w-full h-full flex items-center justify-center text-5xl">
                    🎵
                  </div>
                </div>
                <button className="absolute bottom-3 right-3 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl hover:scale-110">
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
              <h3 className="font-bold text-lg mb-2 truncate">{playlist.title}</h3>
              <p className="text-sm text-gray-400 truncate">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bài hát mới thêm */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Bài hát mới thêm</h2>
        <div className="bg-zinc-800/30 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-sm">
                <th className="text-left py-4 px-6 font-medium">#</th>
                <th className="text-left py-4 px-6 font-medium">Tiêu đề</th>
                <th className="text-left py-4 px-6 font-medium">Album</th>
                <th className="text-left py-4 px-6 font-medium">Ngày thêm</th>
                <th className="text-right py-4 px-6 font-medium">⏱</th>
              </tr>
            </thead>
            <tbody>
              {recentSongs.map((song, index) => (
                <tr
                  key={index}
                  className="hover:bg-white/5 transition group cursor-pointer border-b border-gray-800/50"
                >
                  <td className="py-4 px-6 text-gray-400">{index + 1}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                        🎵
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{song.title}</div>
                        <div className="text-sm text-gray-400 flex items-center gap-2">
                          {song.artist}
                          {song.liked && (
                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-400">{song.album}</td>
                  <td className="py-4 px-6 text-gray-400">{song.date}</td>
                  <td className="py-4 px-6 text-right text-gray-400">{song.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}