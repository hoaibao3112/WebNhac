'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Share2, MoreVertical, Download } from 'lucide-react';
import SyncedLyrics from './SyncedLyrics';

interface SongDetailProps {
  song: {
    id: number;
    title: string;
    artist: string;
    imageUrl: string;
    likeCount: number;
    shareCount: number;
    lyrics?: string[];
    syncedLyrics?: string;
    albumName?: string;
    releaseDate?: string;
  };
  currentTime?: number;
  isPlaying?: boolean;
}

export default function SongDetail({ song, currentTime = 0, isPlaying = false }: SongDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(song.likeCount);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleShare = () => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: song.title,
        text: `Listen to ${song.title} by ${song.artist}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32 px-8 pt-8">
      <div className="max-w-4xl mx-auto">
        {/* Song Header */}
        <div className="flex flex-col items-center mb-8">
          {/* Album Cover */}
          <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl mb-6 group">
            <Image
              src={song.imageUrl}
              alt={song.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>

          {/* Song Info */}
          <h1 className="text-4xl font-bold text-white mb-2 text-center">
            {song.title}
          </h1>
          <p className="text-xl text-gray-400 mb-4">{song.artist}</p>

          {song.albumName && (
            <p className="text-sm text-gray-500 mb-2">
              Album: {song.albumName}
            </p>
          )}

          {song.releaseDate && (
            <p className="text-sm text-gray-500 mb-6">
              Released: {song.releaseDate}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition ${
                isLiked
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Heart
                size={20}
                fill={isLiked ? 'currentColor' : 'none'}
              />
              <span className="font-medium">{likeCount.toLocaleString()}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
            >
              <Share2 size={20} />
              <span className="font-medium">{song.shareCount?.toLocaleString() || 0}</span>
            </button>

            <button className="p-3 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition">
              <Download size={20} />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-3 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
              >
                <MoreVertical size={20} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-10">
                  <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 transition">
                    Add to Playlist
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 transition">
                    Go to Artist
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 transition">
                    Go to Album
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 transition">
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lyrics Section */}
        {(song.lyrics && song.lyrics.length > 0) || song.syncedLyrics ? (
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 mt-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {song.syncedLyrics ? '🎤 Synced Lyrics' : 'Lyrics'}
            </h2>
            <div className="max-w-2xl mx-auto">
              <SyncedLyrics 
                syncedLyrics={song.syncedLyrics}
                plainLyrics={song.lyrics?.join('\n')}
                currentTime={currentTime}
                isPlaying={isPlaying}
              />
            </div>
          </div>
        ) : null}

        {/* Related Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Song Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Artist</span>
                <span className="text-white">{song.artist}</span>
              </div>
              {song.albumName && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Album</span>
                  <span className="text-white">{song.albumName}</span>
                </div>
              )}
              {song.releaseDate && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Release Date</span>
                  <span className="text-white">{song.releaseDate}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Likes</span>
                <span className="text-white">{likeCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shares</span>
                <span className="text-white">{song.shareCount?.toLocaleString() || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
