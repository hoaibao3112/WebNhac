"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { songService } from "@/services/songService";
import { usePlayer } from "@/contexts/PlayerContext";
import { motion } from "framer-motion";

type Song = {
  id: number;
  title: string;
  duration?: number;
  coverImageUrl?: string;
  artists?: { id: number; name: string }[];
};

export default function ArtistSongsList({ songs }: { songs: Song[] }) {
  const { playSong, setPlaylist } = usePlayer();
  const router = useRouter();

  const onPlay = async (song: Song) => {
    try {
      setPlaylist(songs as any);
      router.push(`/player/${song.id}`);
      await songService.play(song.id);
    } catch (err) {
      console.error("Error playing song:", err);
    }
  };

  const onPlayAll = async () => {
    if (!songs?.length) return;
    try {
      setPlaylist(songs as any);
      const first = songs[0];
      router.push(`/player/${first.id}`);
      await songService.play(first.id);
    } catch (err) {
      console.error("Error playing all songs:", err);
    }
  };

  return (
    <div className="mt-8 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-cyan-800/20 to-transparent rounded-xl px-4 py-3 backdrop-blur">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          🎵 Bài hát nổi bật
        </h2>
        <button
          onClick={onPlayAll}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold transition-all hover:scale-105"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 4v16l12-8z" />
            <path d="M20 4v16" />
          </svg>
          <span>Phát tất cả</span>
        </button>
      </div>

      {/* Song list */}
      <div className="bg-zinc-900/60 rounded-xl divide-y divide-zinc-800/80 overflow-hidden shadow-lg">
        {songs.map((s, idx) => (
          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            key={s.id}
            onClick={() => onPlay(s)}
            className="w-full text-left flex items-center justify-between gap-4 px-5 py-3 group transition-all"
          >
            {/* Left: image + info */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-800 ring-1 ring-zinc-700 group-hover:ring-cyan-500 transition-all">
                {s.coverImageUrl ? (
                  <Image
                    src={s.coverImageUrl}
                    alt={s.title}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-700 flex items-center justify-center text-zinc-400">
                    ♪
                  </div>
                )}
                {/* Play icon on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col truncate">
                <div className="font-semibold text-base truncate">
                  {s.title}
                </div>
                <div className="text-sm text-zinc-400 truncate">
                  {s.artists?.map((a) => a.name).join(", ") || "Không rõ"}
                </div>
              </div>
            </div>

            {/* Right: duration */}
            <div className="text-sm text-zinc-400 font-mono">
              {s.duration
                ? new Date(s.duration * 1000)
                    .toISOString()
                    .substring(14, 19)
                : "--:--"}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
