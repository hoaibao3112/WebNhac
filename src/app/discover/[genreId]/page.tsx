"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { songService, Song } from "@/services/songService";
import { getCoverImageFromAudio } from "@/lib/imageUtils";
import { api } from "@/lib/api";

export default function GenrePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const genreId = params.genreId as string;

  const name = searchParams.get("name") || "Thể loại";
  const color = searchParams.get("color") || "from-purple-500 to-pink-500";
  const emoji = searchParams.get("emoji") || "🎵";

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        setError(null);
        // Try genre API first
        const response = await api.get<any>(`/songs/genre/${genreId}`, {
          params: { page: 0, size: 50 },
        });
        const data = response.data?.content || response.content || [];
        setSongs(data);

        // If genre returned no songs, fallback to trending
        if (data.length === 0) {
          const trending = await songService.getTrending(0, 50);
          setSongs(trending.content || []);
        }
      } catch (err) {
        // Fallback to trending if genre API fails
        try {
          const trending = await songService.getTrending(0, 50);
          setSongs(trending.content || []);
        } catch {
          setError("Không thể tải dữ liệu");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [genreId]);

  const handlePlay = async (song: Song) => {
    router.push(`/player/${song.id}`);
    try {
      await songService.play(song.id);
    } catch {}
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="px-8 py-6 pb-32">
      {/* Header Banner */}
      <div
        className={`relative bg-gradient-to-br ${color} rounded-2xl p-8 mb-8 overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex items-end gap-6">
          <div className="text-8xl">{emoji}</div>
          <div>
            <p className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">
              Thể loại
            </p>
            <h1 className="text-5xl font-bold text-white mb-2">{name}</h1>
            <p className="text-white/80">
              {songs.length} bài hát
            </p>
          </div>
        </div>
        {/* Decorative blur circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Play All Button */}
      {songs.length > 0 && (
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => songs[0] && handlePlay(songs[0])}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-purple-500/30"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Phát tất cả
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0-4H4m0 0l4-4m-4 4l4 4" />
            </svg>
            Phát ngẫu nhiên
          </button>
        </div>
      )}

      {/* Song List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 animate-pulse">
              <div className="w-8 h-4 bg-white/10 rounded" />
              <div className="w-12 h-12 bg-white/10 rounded-lg" />
              <div className="flex-1">
                <div className="h-4 bg-white/10 rounded w-1/3 mb-2" />
                <div className="h-3 bg-white/10 rounded w-1/5" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      ) : songs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎵</div>
          <p className="text-gray-400 text-lg">Chưa có bài hát nào trong thể loại này</p>
        </div>
      ) : (
        <div className="space-y-1">
          {/* Table Header */}
          <div className="grid grid-cols-[40px_1fr_1fr_80px] gap-4 px-4 py-2 text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
            <span>#</span>
            <span>Bài hát</span>
            <span>Nghệ sĩ</span>
            <span className="text-right">Thời lượng</span>
          </div>

          {songs.map((song, index) => {
            const coverImage = song.coverImageUrl || getCoverImageFromAudio(song.fileUrl);
            return (
              <div
                key={song.id}
                onClick={() => handlePlay(song)}
                className="grid grid-cols-[40px_1fr_1fr_80px] gap-4 items-center px-4 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer group transition-all duration-200"
              >
                {/* Index / Play icon */}
                <div className="text-gray-500 group-hover:text-white text-sm">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <svg className="w-4 h-4 hidden group-hover:block text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Song info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                    <Image
                      src={coverImage}
                      alt={song.title}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = "none";
                        if (target.parentElement) {
                          target.parentElement.innerHTML =
                            '<div class="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">🎵</div>';
                        }
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium truncate group-hover:text-purple-300 transition-colors">
                      {song.title}
                    </p>
                  </div>
                </div>

                {/* Artist */}
                <p className="text-gray-400 text-sm truncate">
                  {song.artists && song.artists.length > 0
                    ? song.artists.map((a) => a.name).join(", ")
                    : "Unknown Artist"}
                </p>

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
