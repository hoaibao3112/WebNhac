'use client';

import React from 'react';
import Image from 'next/image';
import SyncedLyrics from './SyncedLyrics';

interface LyricsOverlayProps {
  visible: boolean;
  onClose: () => void;
  syncedLyrics?: string;
  plainLyrics?: string;
  currentTime?: number;
  isPlaying?: boolean;
}

export default function LyricsOverlay({ visible, onClose, syncedLyrics, plainLyrics, currentTime = 0, isPlaying = false }: LyricsOverlayProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-6xl mx-4 md:mx-0">
        <div className="bg-zinc-900/70 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl text-white font-bold">Lyrics</h3>
            <button onClick={onClose} className="text-white text-2xl px-3 py-1 rounded hover:bg-white/5">✕</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Left: Cover + metadata */}
            <div className="md:col-span-1 flex flex-col items-center md:items-start">
              <div className="w-72 h-72 rounded-xl overflow-hidden shadow-2xl mb-4 bg-zinc-800">
                <Image src={"/images/albums/DuongDomic/anhBia.jpg"} alt="cover" width={288} height={288} className="object-cover w-full h-full" />
              </div>
              <div className="text-left">
                <div className="text-white text-2xl font-extrabold">Track Title</div>
                <div className="text-gray-400 text-sm mt-2">Artist Name</div>
                <div className="mt-4 text-gray-400 text-sm">❤ 0 &nbsp; • &nbsp; ▶ 0</div>
              </div>
            </div>

            {/* Right: lyrics area (span two columns on md) */}
            <div className="md:col-span-2 max-h-[70vh] overflow-y-auto px-2">
              <SyncedLyrics syncedLyrics={syncedLyrics} plainLyrics={plainLyrics} currentTime={currentTime} isPlaying={isPlaying} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
