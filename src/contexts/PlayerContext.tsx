"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Song } from '@/services/songService';
import AudioPlayer from '@/components/player/AudioPlayer';

interface PlayerContextType {
  currentSong: Song | null;
  playSong: (song: Song) => void;
  closePlayer: () => void;
  playlist: Song[];
  setPlaylist: (songs: Song[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);

  const playSong = (song: Song) => {
    setCurrentSong(song);
  };

  const closePlayer = () => {
    setCurrentSong(null);
  };

  const handleNext = () => {
    if (!currentSong || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentSong(playlist[nextIndex]);
  };

  const handlePrevious = () => {
    if (!currentSong || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const previousIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    setCurrentSong(playlist[previousIndex]);
  };

  return (
    <PlayerContext.Provider value={{ 
      currentSong, 
      playSong, 
      closePlayer, 
      playlist, 
      setPlaylist 
    }}>
      {children}
      <AudioPlayer
        currentSong={currentSong}
        onClose={closePlayer}
        onNext={playlist.length > 0 ? handleNext : undefined}
        onPrevious={playlist.length > 0 ? handlePrevious : undefined}
      />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
};
