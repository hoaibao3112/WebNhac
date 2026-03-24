"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { songService, Song } from "@/services/songService";
import { getCoverImageFromAudio } from "@/lib/imageUtils";

export default function ChartPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const chartId = params.id as string;

  const title = searchParams.get("title") || "Bảng Xếp Hạng";
  const color = searchParams.get("color") || "from-purple-600 to-pink-600";
  const emoji = searchParams.get("emoji") || "🏆";
  const desc = searchParams.get("desc") || "";

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const response = await songService.getTrending(0, 50);
        // Sort by play count for chart ranking
        const sorted = [...(response.content || [])].sort(
          (a, b) => (b.playCount || 0) - (a.playCount || 0)
        );
        setSongs(sorted);
      } catch (err) {
        console.error("Error fetching chart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, [chartId]);

  const handlePlay = async (song: Song) => {
    router.push(`/player/${song.id}`);
    try { await songService.play(song.id); } catch {}
  };

  const formatDuration = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const formatCount = (n: number) =>
    n >= 1_000_000
      ? `${(n / 1_000_000).toFixed(1)}M`
      : n >= 1_000
      ? `${(n / 1_000).toFixed(0)}K`
      : `${n}`;

  const getRankStyle = (index: number) => {
    if (index === 0) return "text-yellow-400 font-black text-2xl";
    if (index === 1) return "text-gray-300 font-bold text-xl";
    if (index === 2) return "text-amber-600 font-bold text-xl";
    return "text-gray-500 text-sm";
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return null;
  };

  return (
    <div className="px-8 py-6 pb-32">
      {/* Header Banner */}
      <div className={`relative bg-gradient-to-br ${color} rounded-2xl p-8 mb-8 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex items-end gap-6">
          <div className="w-28 h-28 bg-black/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
            <span className="text-6xl">{emoji}</span>
          </div>
          <div>
            <p className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">
              Bảng xếp hạng
            </p>
            <h1 className="text-4xl font-bold text-white mb-1">{title}</h1>
            <p className="text-white/70 text-sm">{desc}</p>
            <p className="text-white/60 text-sm mt-1">
              Cập nhật: {new Date().toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Play All */}
      {songs.length > 0 && (
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => songs[0] && handlePlay(songs[0])}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Phát tất cả
          </button>
        </div>
      )}

      {/* Chart List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 animate-pulse">
              <div className="w-10 h-6 bg-white/10 rounded" />
              <div className="w-14 h-14 bg-white/10 rounded-lg" />
              <div className="flex-1">
                <div className="h-4 bg-white/10 rounded w-1/3 mb-2" />
                <div className="h-3 bg-white/10 rounded w-1/5" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {songs.map((song, index) => {
            const coverImage = song.coverImageUrl || getCoverImageFromAudio(song.fileUrl);
            const badge = getRankBadge(index);
            const isTop3 = index < 3;

            return (
              <div
                key={song.id}
                onClick={() => handlePlay(song)}
                className={`grid grid-cols-[50px_1fr_120px_80px] gap-4 items-center px-4 py-3 rounded-xl cursor-pointer group transition-all duration-200 ${
                  isTop3
                    ? "bg-gradient-to-r from-white/5 to-transparent hover:from-white/10"
                    : "hover:bg-white/5"
                }`}
              >
                {/* Rank */}
                <div className="flex items-center justify-center">
                  {badge ? (
                    <span className="text-2xl">{badge}</span>
                  ) : (
                    <span className={getRankStyle(index)}>{index + 1}</span>
                  )}
                </div>

                {/* Song info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0 group-hover:shadow-lg transition-shadow">
                    <Image
                      src={coverImage}
                      alt={song.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = "none";
                        if (target.parentElement) {
                          target.parentElement.innerHTML =
                            '<div class="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">🎵</div>';
                        }
                      }}
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className={`font-medium truncate transition-colors ${
                      isTop3 ? "text-white text-base" : "text-white/90 text-sm"
                    } group-hover:text-purple-300`}>
                      {song.title}
                    </p>
                    <p className="text-gray-500 text-xs truncate">
                      {song.artists?.map((a) => a.name).join(", ") || "Unknown"}
                    </p>
                  </div>
                </div>

                {/* Play count */}
                <div className="text-right">
                  <span className="text-gray-400 text-sm flex items-center justify-end gap-1">
                    <span>▶</span>{formatCount(song.playCount || 0)}
                  </span>
                </div>

                {/* Duration */}
                <p className="text-gray-500 text-sm text-right">
                  {song.duration ? formatDuration(song.duration) : "--:--"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
