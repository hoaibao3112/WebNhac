'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SongDetail from '@/components/player/SongDetail';
import MusicPlayerBar from '@/components/player/MusicPlayerBar';
import LyricsOverlay from '@/components/player/LyricsOverlay';
import PlaylistDrawer from '@/components/player/PlaylistDrawer';
import { songService } from '@/services/songService';
import { getCoverImageFromAudio } from '@/lib/imageUtils';

export default function PlayerPage() {
  const params = useParams();
  const songId = params.id as string;
  const [song, setSong] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyricsOverlay, setShowLyricsOverlay] = useState(false);
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState(false);
  const [playlist, setPlaylist] = useState<any[]>([]);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch from API
        const data = await songService.getById(parseInt(songId));
        
        // Get proper cover image from audio path
        const coverImage = getCoverImageFromAudio(data.fileUrl);
        
        // Parse lyrics from backend (split by newlines if exists)
        const parsedLyrics = data.lyrics 
          ? data.lyrics.split('\n').filter((line: string) => line.trim() !== '')
          : ['Lyrics not available yet.'];
        
        // Map to player format
        setSong({
          id: data.id,
          title: data.title,
          artist: data.artists && data.artists.length > 0 
            ? data.artists.map(a => a.name).join(', ')
            : 'Unknown Artist',
          imageUrl: coverImage,
          audioUrl: data.fileUrl,
          duration: data.duration || 240,
          likeCount: data.likeCount || 0,
          shareCount: 0,
          albumName: data.album?.title,
          releaseDate: data.releaseDate,
          lyrics: parsedLyrics,
          syncedLyrics: data.syncedLyrics,
        });
        
        // Set playlist (for demo we fetch trending as playlist)
        const trending = await songService.getTrending(0, 50);
        setPlaylist(trending.content);
        setPlaylist(trending.content);
        
        // Increment play count
        await songService.play(parseInt(songId));
      } catch (err) {
        console.error('Error fetching song:', err);
        setError('Không thể tải bài hát. Vui lòng thử lại.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSong();
  }, [songId]);

  const handleNext = () => {
    // Navigate to next song (simple increment for now)
    const nextId = parseInt(songId) + 1;
    window.location.href = `/player/${nextId}`;
  };

  const handlePrevious = () => {
    // Navigate to previous song (simple decrement for now)
    const prevId = Math.max(1, parseInt(songId) - 1);
    window.location.href = `/player/${prevId}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl">Đang tải bài hát...</div>
        </div>
      </div>
    );
  }

  if (error || !song) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <div className="text-white text-xl mb-2">
            {error || 'Không tìm thấy bài hát'}
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
          >
            Về Trang Chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Song Detail */}
      <SongDetail 
        song={song} 
        currentTime={currentTime}
        isPlaying={isPlaying}
      />

      {/* Player Bar */}
      <MusicPlayerBar
        song={song}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onTimeUpdate={setCurrentTime}
        onPlayStateChange={setIsPlaying}
        onOpenLyrics={() => setShowLyricsOverlay(true)}
        onOpenPlaylist={() => setShowPlaylistDrawer(true)}
      />

      {/* Lyrics Overlay */}
      <LyricsOverlay 
        visible={showLyricsOverlay}
        onClose={() => setShowLyricsOverlay(false)}
        syncedLyrics={song?.syncedLyrics}
        plainLyrics={song?.lyrics?.join('\n')}
        currentTime={currentTime}
        isPlaying={isPlaying}
      />

      {/* Playlist Drawer */}
      <PlaylistDrawer 
        visible={showPlaylistDrawer}
        onClose={() => setShowPlaylistDrawer(false)}
        playlist={playlist}
        onPlay={(id:number)=> window.location.href = `/player/${id}`}
      />
    </div>
  );
}
