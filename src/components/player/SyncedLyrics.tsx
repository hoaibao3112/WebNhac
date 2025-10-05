'use client';

import { useEffect, useState, useRef } from 'react';
import { parseLRC, getCurrentLyricIndex, getVisibleLyrics, LyricLine } from '@/lib/lrcParser';

interface SyncedLyricsProps {
  syncedLyrics?: string;
  plainLyrics?: string;
  currentTime: number;
  isPlaying: boolean;
}

export default function SyncedLyrics({ 
  syncedLyrics, 
  plainLyrics, 
  currentTime,
  isPlaying 
}: SyncedLyricsProps) {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef<HTMLDivElement>(null);

  // Parse LRC when component mounts
  useEffect(() => {
    if (syncedLyrics) {
      const parsed = parseLRC(syncedLyrics);
      setLyrics(parsed);
    }
  }, [syncedLyrics]);

  // Update current line based on time
  useEffect(() => {
    if (lyrics.length > 0) {
      const index = getCurrentLyricIndex(lyrics, currentTime);
      setCurrentIndex(index);
    }
  }, [currentTime, lyrics]);

  // Auto-scroll to current line
  useEffect(() => {
    if (currentLineRef.current && containerRef.current) {
      currentLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentIndex]);

  // If no synced lyrics, show plain lyrics
  if (!syncedLyrics || lyrics.length === 0) {
    const lines = plainLyrics?.split('\n') || [];
    return (
      <div className="space-y-3 text-center">
        {lines.map((line, i) => (
          <p key={i} className="text-gray-300 text-lg leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    );
  }

  // Show synced lyrics with highlight
  const visibleLyrics = getVisibleLyrics(lyrics, currentIndex, 3, 4);

  return (
    <div 
      ref={containerRef}
      className="space-y-6 max-h-[72vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-zinc-800"
    >
      {visibleLyrics.map(({ line, index, isCurrent }) => (
        <div
          key={index}
          ref={isCurrent ? currentLineRef : null}
          className={`
            transition-all duration-300 text-center py-3 px-6 rounded-lg
            ${isCurrent 
              ? 'text-purple-300 font-extrabold text-4xl scale-125 bg-purple-900/25 tracking-wide' 
              : 'text-gray-400 text-lg'
            }
            ${index < currentIndex ? 'opacity-50' : 'opacity-100'}
          `}
        >
          {line.text}
        </div>
      ))}
      
      {/* Show indicator if playing */}
      {isPlaying && currentIndex >= 0 && (
        <div className="fixed bottom-36 left-1/2 transform -translate-x-1/2 pointer-events-none">
          <div className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse">
            🎤 Synced Lyrics
          </div>
        </div>
      )}
    </div>
  );
}
