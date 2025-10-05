'use client';

import React from 'react';
import Image from 'next/image';

interface PlaylistDrawerProps {
  visible: boolean;
  onClose: () => void;
  playlist: any[];
  onPlay: (id: number) => void;
}

export default function PlaylistDrawer({ visible, onClose, playlist = [], onPlay }: PlaylistDrawerProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={onClose} />

      <div className="w-96 bg-zinc-900 text-white shadow-xl p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Danh sách phát</h3>
          <button onClick={onClose} className="text-white text-2xl px-2">✕</button>
        </div>

        {playlist.length === 0 ? (
          <div className="text-gray-400">Không có bài hát</div>
        ) : (
          <ul className="space-y-3">
            {playlist.map((s) => (
              <li key={s.id} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer" onClick={() => onPlay(s.id)}>
                <div className="w-12 h-12 rounded overflow-hidden bg-zinc-800">
                  <Image src={s.imageUrl || '/images/albums/DuongDomic/anhBia.jpg'} alt={s.title} width={48} height={48} className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{s.title}</div>
                  <div className="text-sm text-gray-400">{s.artists?.map((a:any)=>a.name).join(', ')}</div>
                </div>
                <div className="text-sm text-gray-400">{s.duration ? `${Math.floor(s.duration/60)}:${(s.duration%60).toString().padStart(2,'0')}` : ''}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
