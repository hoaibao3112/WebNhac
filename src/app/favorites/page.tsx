"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { songService, Song } from "@/services/songService";
import { usePlayer } from "@/contexts/PlayerContext";

export default function FavoritesPage() {
  const router = useRouter();
  const { playSong } = usePlayer();
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFavoriteSongs();
  }, []);

  const fetchFavoriteSongs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await songService.getFavorites(1, 0, 50);
      setFavoriteSongs(response.content);
    } catch (err) {
      console.error("Error fetching favorites:", err);
      setError("Không thể tải danh sách bài hát yêu thích");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaySong = (song: Song) => {
    playSong(song);
  };

  const handlePlayAll = () => {
    if (favoriteSongs.length > 0) {
      playSong(favoriteSongs[0]);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-800 to-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Playlist Header */}
        <div className="flex items-start gap-8 mb-8">
          {/* Playlist Cover */}
          <div className="flex-shrink-0">
            <div className="w-60 h-60 rounded-lg bg-gradient-to-br from-pink-400 to-pink-500 shadow-2xl flex items-center justify-center">
              <svg 
                className="w-24 h-24 text-white/90" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>

          {/* Playlist Info */}
          <div className="flex-1 flex flex-col justify-end pb-4">
            <div className="text-sm text-gray-400 mb-2">
              Playlist · {favoriteSongs.length} Bài hát
            </div>
            <h1 className="text-6xl font-bold mb-6">Your Favorite</h1>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {/* Heart Icon */}
              <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>

              {/* Play All Button */}
              <button 
                onClick={handlePlayAll}
                className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={favoriteSongs.length === 0 || loading}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span className="font-semibold">Phát tất cả</span>
              </button>

              {/* Download Button */}
              <button 
                className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={favoriteSongs.length === 0 || loading}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/>
                </svg>
                <span className="font-semibold">Tải về</span>
              </button>
            </div>
          </div>
        </div>

        {/* Songs List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Đang tải...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="w-20 h-20 text-red-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">{error}</h3>
            <button 
              onClick={fetchFavoriteSongs}
              className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 font-semibold transition mt-4"
            >
              Thử lại
            </button>
          </div>
        ) : favoriteSongs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            {/* Empty Box Icon */}
            <div className="mb-6">
              <svg className="w-32 h-32 text-cyan-400/30" viewBox="0 0 200 200" fill="none">
                <path d="M100 20L160 50V150L100 180L40 150V50L100 20Z" fill="url(#gradient)" opacity="0.3"/>
                <path d="M100 20L160 50M160 50V150M160 150L100 180M100 180L40 150M40 150V50M40 50L100 20M100 20V180" stroke="currentColor" strokeWidth="2"/>
                <defs>
                  <linearGradient id="gradient" x1="100" y1="20" x2="100" y2="180">
                    <stop offset="0%" stopColor="#06b6d4"/>
                    <stop offset="100%" stopColor="#3b82f6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Không có dữ liệu</h3>
            <p className="text-gray-400 mb-8">Chọn bài hát thêm vào playlist</p>
            
            <button 
              onClick={() => router.push('/')}
              className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 font-semibold transition"
            >
              Thêm bài hát
            </button>
          </div>
        ) : (
          <div className="bg-black/20 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[50px_1fr_1fr_100px_80px] gap-4 px-6 py-4 border-b border-gray-700 text-sm text-gray-400 font-medium">
              <div className="text-center">#</div>
              <div>Tiêu đề</div>
              <div>Album</div>
              <div>Lượt nghe</div>
              <div className="text-center">⏱</div>
            </div>

            {/* Song List */}
            <div className="space-y-1">
              {favoriteSongs.map((song, index) => (
                <div 
                  key={song.id} 
                  className="grid grid-cols-[50px_1fr_1fr_100px_80px] gap-4 items-center px-6 py-3 hover:bg-white/5 transition group cursor-pointer"
                  onClick={() => handlePlaySong(song)}
                >
                  <div className="text-gray-400 text-center group-hover:hidden">{index + 1}</div>
                  <button className="hidden group-hover:flex items-center justify-center text-blue-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  
                  <div className="flex items-center gap-4 min-w-0">
                    <img 
                      src={song.coverImageUrl || '/images/placeholder.jpg'} 
                      alt={song.title}
                      className="w-12 h-12 rounded object-cover flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder.jpg';
                      }}
                    />
                    <div className="min-w-0">
                      <div className="font-semibold truncate group-hover:text-blue-400 transition">
                        {song.title}
                      </div>
                      <div className="text-sm text-gray-400 truncate">
                        {song.artists?.map(a => a.name).join(', ') || 'Unknown Artist'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-gray-400 truncate text-sm">
                    {song.album?.title || 'Single'}
                  </div>
                  
                  <div className="text-gray-400 text-sm">
                    {song.playCount.toLocaleString()}
                  </div>
                  
                  <div className="text-gray-400 text-center text-sm">
                    {formatDuration(song.duration)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
