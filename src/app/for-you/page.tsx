"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForYouPage() {
  const recentlyPlayed = [
    { title: "Top Hits Vietnam", artist: "Sơn Tùng M-TP...", image: "/images/playlists/top-hits.jpg" },
    { title: "EDM Party", artist: "Martin Garrix...", image: "/images/playlists/edm.jpg" },
    { title: "Nhạc Lofi Chill", artist: "Hop Lớp & Lofi...", image: "/images/playlists/lofi.jpg" },
    { title: "Acoustic Collection", artist: "Thu giãn cuối tuần...", image: "/images/playlists/acoustic.jpg" },
    { title: "Rock Classics", artist: "Queen, AC/DC...", image: "/images/playlists/rock.jpg" },
  ];

  const forYouPlaylists = [
    { 
      title: "Daily Mix 1", 
      subtitle: "Hans và những nhạc sĩ tài năng khác",
      image: "/images/playlists/daily1.jpg" 
    },
    { 
      title: "Discover Weekly", 
      subtitle: "Danh mục những bản nhạc mới chỉ dành riêng cho bạn",
      image: "/images/playlists/discover.jpg" 
    },
    { 
      title: "On Repeat", 
      subtitle: "Những bài hát bạn nghe nhiều nhất trong tuần",
      image: "/images/playlists/repeat.jpg" 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Hero Banner Section */}
      <section className="relative h-[500px] mb-12 rounded-b-3xl overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/banner/music-hero.jpg')",
              filter: "brightness(0.4) blur(2px)",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-purple-900/40 to-black"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center px-12 max-w-4xl">
          <div className="inline-block px-4 py-1.5 bg-blue-500/40 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 w-fit border border-blue-400/30">
            🎵 MỚI PHÁT HÀNH
          </div>
          <h1 className="text-7xl font-extrabold mb-6 leading-tight">
            Âm nhạc đỉnh cao<br />không giới hạn
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
            Khám phá các bản hit mới nhất từ các nghệ sĩ hàng đầu thế giới ngay hôm nay.
          </p>
          <div className="flex gap-4">
            <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-bold text-lg flex items-center gap-3 transition shadow-xl hover:shadow-2xl hover:scale-105">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Phát ngay
            </button>
            <button className="px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-bold text-lg flex items-center gap-3 transition backdrop-blur-md hover:scale-105">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
              </svg>
              Lưu lại
            </button>
          </div>
        </div>
      </section>

      <div className="px-12 pb-12">
        {/* Recently Played Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold">Nghe lại gần đây</h2>
            <Link href="/library" className="text-sm font-semibold text-gray-400 hover:text-white transition uppercase tracking-wider">
              XEM TẤT CẢ
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {recentlyPlayed.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-zinc-800/30 rounded-xl p-5 hover:bg-zinc-800 transition-all duration-300 hover:scale-105"
              >
                <div className="relative mb-5">
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden shadow-xl">
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                      🎵
                    </div>
                  </div>
                  {/* Play Button Overlay */}
                  <button className="absolute bottom-3 right-3 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl hover:scale-110 hover:bg-green-400">
                    <svg className="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
                <h3 className="font-bold text-lg mb-2 truncate">{item.title}</h3>
                <p className="text-sm text-gray-400 truncate">{item.artist}</p>
              </div>
            ))}
          </div>
        </section>

        {/* For You Playlists Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">Dành riêng cho bạn</h2>
              <p className="text-gray-400 text-lg">Dựa trên thói quen nghe nhạc của bạn</p>
            </div>
            <Link href="/discover" className="text-sm font-semibold text-gray-400 hover:text-white transition uppercase tracking-wider">
              XEM TẤT CẢ
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {forYouPlaylists.map((playlist, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-zinc-800/30 rounded-xl p-6 hover:bg-zinc-800 transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-red-500 via-orange-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-xl group-hover:shadow-2xl transition-shadow">
                    <span className="text-4xl">🔥</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xl mb-2 truncate group-hover:text-blue-400 transition">{playlist.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{playlist.subtitle}</p>
                  </div>
                  <button className="w-12 h-12 text-gray-400 hover:text-red-400 transition-all hover:scale-110">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New Releases Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold">Mới phát hành</h2>
            <Link href="/discover" className="text-sm font-semibold text-gray-400 hover:text-white transition uppercase tracking-wider">
              XEM TẤT CẢ
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="group cursor-pointer bg-zinc-800/30 rounded-xl p-5 hover:bg-zinc-800 transition-all duration-300"
              >
                <div className="relative mb-5">
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 overflow-hidden shadow-xl">
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                      🎸
                    </div>
                  </div>
                  <button className="absolute bottom-3 right-3 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl hover:scale-110">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
                <h3 className="font-bold text-lg mb-2 truncate">New Album {item}</h3>
                <p className="text-sm text-gray-400 truncate">Various Artists</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Now Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold">Đang thịnh hành</h2>
            <Link href="/charts" className="text-sm font-semibold text-gray-400 hover:text-white transition uppercase tracking-wider">
              XEM TẤT CẢ
            </Link>
          </div>
          <div className="bg-zinc-800/30 rounded-xl p-6">
            <div className="space-y-3">
              {[
                { title: "Chúng Ta Của Hiện Tại", artist: "Sơn Tùng M-TP", plays: "2.5M" },
                { title: "Lạc Trôi", artist: "Sơn Tùng M-TP", plays: "3.2M" },
                { title: "Nơi Này Có Anh", artist: "Sơn Tùng M-TP", plays: "4.1M" },
              ].map((song, index) => (
                <div
                  key={index}
                  className="flex items-center gap-5 p-4 rounded-lg hover:bg-zinc-700/50 transition cursor-pointer group"
                >
                  <span className="text-2xl font-bold text-gray-400 w-8">{index + 1}</span>
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    🎵
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate group-hover:text-blue-400 transition">{song.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">{song.plays} lượt phát</p>
                  </div>
                  <button className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-blue-400">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
