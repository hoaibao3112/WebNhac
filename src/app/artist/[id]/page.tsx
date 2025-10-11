import React from 'react';
import { notFound } from 'next/navigation';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ArtistSongsList from '@/components/artist/ArtistSongsList';

type ArtistResponse = any;

const BACKEND_BASE = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function ArtistPage(props: any) {
  const params: any = props?.params;
  // Read defensively in case edge cases provide an array
  const rawId: any = params?.id;
  if (!rawId) return notFound();

  const idStr = Array.isArray(rawId) ? rawId[0] : rawId;
  const id = Number.parseInt(String(idStr), 10);
  if (Number.isNaN(id) || id <= 0) return notFound();

  // Fetch artist details and songs in parallel using server-side fetch
  const [artistRes, songsRes] = await Promise.all([
    fetch(`${BACKEND_BASE}/api/artists/${id}`, { cache: 'no-store' }).then(r => r.ok ? r.json().catch(() => null) : null).catch(() => null),
    fetch(`${BACKEND_BASE}/api/songs/artist/${id}?page=0&size=50`, { cache: 'no-store' }).then(r => r.ok ? r.json().catch(() => null) : null).catch(() => null),
  ]);

  const artist = artistRes?.data || artistRes;
  const songsPage = songsRes?.data || songsRes;
  const songs = songsPage?.content || [];

  if (!artist) return notFound();

  return (
    <div className="pb-12">
      <ProfileHeader name={artist.name} id={artist.id} realName={artist.bio} views={0} listens={0} />

      <main className="max-w-7xl mx-auto px-6 md:px-8 mt-8">
        <ArtistSongsList songs={songs} />
      </main>
    </div>
  );
}
