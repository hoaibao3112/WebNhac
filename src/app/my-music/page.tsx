"use client";

import ProfileHeader from "../../components/profile/ProfileHeader";
import PlaylistCard from "../../components/profile/PlaylistCard";

export default function MyMusicPage() {
  return (
    <div>
      <ProfileHeader name="Trần Hoài Bảo..." id="60396644" realName="Trần Hoài Bảo_0027" birthday="31/12/2004" gender="Nam" views={12} listens={0} />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="mb-6 border-b">
          <ul className="flex gap-6 text-gray-700">
            <li className="flex items-center gap-2"><span className="text-primary">🏠</span> Playlist</li>
            <li>Video</li>
            <li>Tui Upload</li>
            <li>Bạn Bè</li>
          </ul>
        </nav>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-green-500 text-white p-4 rounded mb-6">nct.gg.1759624867792h12sz hiện chưa có nào.</div>
            <div className="min-h-[400px] bg-white rounded p-6">
              {/* Placeholder for content list */}
              <p className="text-gray-500">No content yet.</p>
            </div>
          </div>

          <aside className="col-span-12 lg:col-span-4">
            <PlaylistCard title="GỢI Ý DÀNH CHO BẠN" />
          </aside>
        </div>
      </div>
    </div>
  );
}
