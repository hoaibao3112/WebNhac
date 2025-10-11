"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { api } from "@/lib/api";
import { getAlbumCoverFromArtist } from '@/lib/imageUtils';

type Artist = {
  id: number;
  name: string;
  followers?: number;
  coverImageUrl?: string;
  sample?: { title: string; cover?: string };
};

function ArtistCard({ artist }: { artist: Artist }) {
  const cover = artist.coverImageUrl || getAlbumCoverFromArtist(artist.name || '');

  return (
    <Link href={`/artist/${artist.id}`} className="block">
      <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg">
        <div className="relative h-48 w-full bg-zinc-800">
        {cover ? (
          // use a fixed width/height fallback to avoid layout shift; fill with object-fit
          <Image src={cover} alt={artist.name} fill style={{ objectFit: 'cover' }} />
        ) : (
          <div className="h-48 w-full bg-zinc-700" />
        )}
  </div>
  <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg">{artist.name}</h3>
            <p className="text-sm text-white/60">{artist.followers ?? 0} người theo dõi</p>
          </div>
          <button className="px-3 py-1 border rounded-full text-white/90">Theo dõi</button>
        </div>

        {artist.sample && (
          <div className="mt-3 flex items-center gap-3">
            <div className="h-12 w-12 bg-zinc-800 rounded overflow-hidden">
              {artist.sample.cover && <Image src={artist.sample.cover} alt={artist.sample.title} width={48} height={48} />}
            </div>
            <div className="text-sm text-white/80">
              <div className="font-medium">{artist.sample.title}</div>
              <div className="text-xs text-white/60">{artist.name}</div>
            </div>
          </div>
        )}
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get('/artists/top?page=0&size=8')
      .then((res: any) => {
        // backend wraps in ApiResponse { success, data }
        const data = res?.data || res;
        const page = data?.content || data;
        if (mounted) {
          setArtists(
            page.map((a: any) => ({
              id: a.id,
              name: a.name,
              followers: a.followCount || a.followersCount || a.followers || 0,
              // prefer album cover from backend if present
              coverImageUrl: (a.albums && a.albums.length > 0 && a.albums[0].coverImageUrl) || a.coverImageUrl || a.cover || undefined,
              sample: a.sample ? { title: a.sample.title, cover: a.sample.cover } : undefined,
            }))
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Không thể tải nghệ sĩ');
      })
      .finally(() => setLoading(false));
    return () => { mounted = false };
  }, []);

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Nghệ Sĩ Thịnh Hành</h2>
        <a className="text-white/70">Thêm</a>
      </div>

      {loading ? (
        <div className="text-white/60">Đang tải...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {artists.map(a => (
            <ArtistCard key={a.id} artist={a} />
          ))}
        </div>
      )}
    </section>
  );
}
