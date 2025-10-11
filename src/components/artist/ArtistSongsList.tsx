"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { songService } from '@/services/songService';
import { usePlayer } from '@/contexts/PlayerContext';

type Song = {
  id: number;
  title: string;
  duration?: number;
  coverImageUrl?: string;
  artists?: { id:number; name:string }[];
};

export default function ArtistSongsList({ songs }: { songs: Song[] }) {
  const { playSong, setPlaylist } = usePlayer();

  const router = useRouter();

  const onPlay = async (song: any) => {
    try {
      // set playlist in context
      setPlaylist(songs as any);
      // navigate to player page (will mount player view)
      router.push(`/player/${song.id}`);
      // inform backend that song was played
      await songService.play(song.id);
    } catch (err) {
      console.error('Error playing song:', err);
    }
  };

  const onPlayAll = async () => {
    if (!songs || songs.length === 0) return;
    try {
      setPlaylist(songs as any);
      const first = songs[0];
      router.push(`/player/${first.id}`);
      await songService.play(first.id);
    } catch (err) {
      console.error('Error playing all songs:', err);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Bài hát</h2>
        <div>
          <button onClick={onPlayAll} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-600 text-black font-medium">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4v16l12-8z" /><path d="M20 4v16" /></svg>
            <span>Phát tất cả</span>
          </button>
        </div>
      </div>
      <div className="divide-y divide-white/6 bg-zinc-900 rounded-lg overflow-hidden">
        {songs.map((s, idx) => (
          <button key={s.id} onClick={() => onPlay(s)} className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-white/3">
            <div className="w-12 h-12 rounded overflow-hidden bg-zinc-800">
              {s.coverImageUrl ? (
                <Image src={s.coverImageUrl} alt={s.title} width={48} height={48} />
              ) : (
                <div className="w-12 h-12 bg-zinc-700" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium truncate">{s.title}</div>
              <div className="text-xs text-white/60 truncate">
                {s.artists && s.artists.map(a => a.name).join(', ')}
              </div>
            </div>
            <div className="text-sm text-white/60">{s.duration ? new Date(s.duration * 1000).toISOString().substr(14,5) : '--:--'}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
