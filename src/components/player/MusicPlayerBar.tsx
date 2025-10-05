'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle, 
  Volume2, 
  VolumeX,
  List
} from 'lucide-react';

interface MusicPlayerBarProps {
  song: {
    id: number;
    title: string;
    artist: string;
    imageUrl: string;
    audioUrl: string;
    duration: number;
  } | null;
  onNext?: () => void;
  onPrevious?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onOpenLyrics?: () => void;
  onOpenPlaylist?: () => void;
}

export default function MusicPlayerBar({ song, onNext, onPrevious, onTimeUpdate, onPlayStateChange, onOpenLyrics, onOpenPlaylist }: MusicPlayerBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && song) {
      audioRef.current.src = song.audioUrl;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [song]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      const newPlayState = !isPlaying;
      setIsPlaying(newPlayState);
      // Notify parent
      if (onPlayStateChange) {
        onPlayStateChange(newPlayState);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);
      // Notify parent component
      if (onTimeUpdate) {
        onTimeUpdate(time);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!song) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3 z-50">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          if (isRepeat) {
            audioRef.current?.play();
          } else if (onNext) {
            onNext();
          }
        }}
      />

      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Song Info */}
        <div className="flex items-center gap-3 w-1/4 min-w-[180px]">
          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={song.imageUrl}
              alt={song.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-medium text-sm truncate">
              {song.title}
            </h4>
            <p className="text-gray-400 text-xs truncate">
              {song.artist}
            </p>
          </div>
        </div>

        {/* Center: Player Controls */}
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center justify-center gap-4 mb-2">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`p-2 rounded-full hover:bg-gray-800 transition ${
                isShuffle ? 'text-purple-500' : 'text-gray-400'
              }`}
            >
              <Shuffle size={18} />
            </button>

            <button
              onClick={onPrevious}
              className="p-2 text-gray-400 hover:text-white transition"
            >
              <SkipBack size={20} fill="currentColor" />
            </button>

            <button
              onClick={togglePlay}
              className="p-3 bg-white rounded-full hover:scale-105 transition"
            >
              {isPlaying ? (
                <Pause size={24} fill="black" className="text-black" />
              ) : (
                <Play size={24} fill="black" className="text-black ml-0.5" />
              )}
            </button>

            <button
              onClick={onNext}
              className="p-2 text-gray-400 hover:text-white transition"
            >
              <SkipForward size={20} fill="currentColor" />
            </button>

            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`p-2 rounded-full hover:bg-gray-800 transition ${
                isRepeat ? 'text-purple-500' : 'text-gray-400'
              }`}
            >
              <Repeat size={18} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={song.duration}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:cursor-pointer
                hover:[&::-webkit-slider-thumb]:bg-purple-500"
            />
            <span className="text-xs text-gray-400 w-10">
              {formatTime(song.duration)}
            </span>
          </div>
        </div>

        {/* Right: Volume & Options */}
        <div className="flex items-center gap-3 w-1/4 justify-end">
          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
            128kbps
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 text-gray-400 hover:text-white transition"
            >
              {isMuted || volume === 0 ? (
                <VolumeX size={20} />
              ) : (
                <Volume2 size={20} />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>

          <button className="p-2 text-gray-400 hover:text-white transition" onClick={() => onOpenLyrics && onOpenLyrics()}>
            {/* Microphone icon - use emoji fallback */}
            <span className="sr-only">Open Lyrics</span>
            🎤
          </button>

          <button className="p-2 text-gray-400 hover:text-white transition" onClick={() => onOpenPlaylist && onOpenPlaylist()}>
            <List size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
