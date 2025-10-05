"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { songService, Song } from '@/services/songService';
import { usePlayer } from '@/contexts/PlayerContext';
import { getCoverImageFromAudio } from '@/lib/imageUtils';

const TrendingSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [displayedSongs, setDisplayedSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(10);
  const { playSong, setPlaylist } = usePlayer();
  const router = useRouter();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        // Fetch all trending songs (increase size to get more)
        const response = await songService.getTrending(0, 100);
        setSongs(response.content);
        setDisplayedSongs(response.content.slice(0, 10)); // Show first 10
        setPlaylist(response.content); // Set playlist for player
      } catch (err) {
        setError('Không thể tải dữ liệu');
        console.error('Error fetching songs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [setPlaylist]);

  // Update displayed songs when showCount changes
  useEffect(() => {
    setDisplayedSongs(songs.slice(0, showCount));
  }, [showCount, songs]);

  const handleLoadMore = () => {
    setShowCount(prev => Math.min(prev + 10, songs.length));
  };

  const handlePlay = async (song: Song) => {
    try {
      // Navigate to player page
      router.push(`/player/${song.id}`);
      
      // Update play count in backend
      await songService.play(song.id);
      
      // Update play count in UI
      setSongs(prevSongs =>
        prevSongs.map(s =>
          s.id === song.id
            ? { ...s, playCount: s.playCount + 1 }
            : s
        )
      );
    } catch (err) {
      console.error('Error playing song:', err);
    }
  };

  if (loading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">🔥 Thịnh Hành</h2>
        <div className="grid grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-zinc-800 rounded-lg p-4 animate-pulse">
              <div className="w-full aspect-square bg-zinc-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-zinc-700 rounded mb-2"></div>
              <div className="h-3 bg-zinc-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">🔥 Thịnh Hành</h2>
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">🔥 Thịnh Hành</h2>
      <div className="grid grid-cols-5 gap-4">
        {displayedSongs.map((song) => {
          // Get cover image from audio path
          const coverImage = getCoverImageFromAudio(song.fileUrl);
          
          return (
            <div
              key={song.id}
              className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition cursor-pointer group"
              onClick={() => handlePlay(song)}
            >
              <div className="relative">
                <div className="w-full aspect-square rounded-lg mb-4 overflow-hidden bg-zinc-900">
                  <Image
                    src={coverImage}
                    alt={song.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient if image fails to load
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-6xl">🎵</div>';
                      }
                    }}
                  />
                </div>
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <h3 className="text-white font-bold truncate mb-1">{song.title}</h3>
              <p className="text-gray-400 text-sm truncate mb-2">
                {song.artists && song.artists.length > 0 
                  ? song.artists.map(a => a.name).join(', ')
                  : 'Unknown Artist'}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span>▶</span>
                  {song.playCount >= 1000000 
                    ? `${(song.playCount / 1000000).toFixed(1)}M`
                    : `${(song.playCount / 1000).toFixed(0)}K`}
                </span>
                <span className="flex items-center gap-1">
                  <span>❤</span>
                  {song.likeCount >= 1000 
                    ? `${(song.likeCount / 1000).toFixed(0)}K`
                    : song.likeCount}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Load More Button */}
      {showCount < songs.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Xem thêm ({songs.length - showCount} bài hát)
          </button>
        </div>
      )}
      
      {/* Show All Loaded Message */}
      {showCount >= songs.length && songs.length > 10 && (
        <div className="text-center mt-8 text-gray-400">
          <p>✨ Đã hiển thị tất cả {songs.length} bài hát</p>
        </div>
      )}
    </div>
  );
};

export default TrendingSongs;
