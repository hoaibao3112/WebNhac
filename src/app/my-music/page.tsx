import PlaylistCard from "../../components/profile/PlaylistCard";
import Link from 'next/link';

export default function MyMusicPage() {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      {/* Dark header */}
      <header className="relative overflow-hidden rounded-b-2xl bg-gray-800 shadow-lg">
        <div className="h-64 md:h-80 bg-[url('/images/albums/DuongDomic/anhBia.jpg')] bg-cover bg-center opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/60 to-gray-900/80" />

        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto h-full px-6 md:px-8 flex items-end">
            <div className="w-full pb-8 flex items-end gap-6">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gray-700 shadow-lg flex items-center justify-center text-4xl text-cyan-400 font-bold">
                T
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold">Trần Hoài Bảo</h1>
                <div className="mt-3 flex items-center gap-3 text-gray-300 text-sm">
                  <span>12,345 followers</span>
                  <button className="px-4 py-1.5 rounded-full border border-gray-600 text-gray-200 hover:bg-gray-700 transition">
                    Theo dõi
                  </button>
                  <button className="px-4 py-1.5 rounded-full bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition">
                    Phát tất cả
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <nav className="mb-6 border-b border-gray-700">
          <ul className="flex gap-6 text-gray-300">
            <li className="flex items-center gap-2 text-cyan-400 font-medium">
              🏠 <Link href="/my-music" className="ml-2">Playlist</Link>
            </li>
            <li>
              <Link href="/my-music/upload" className="hover:text-cyan-300 cursor-pointer">Tải Nhạc lên</Link>
            </li>
            <li>
              <Link href="/my-music/favorites" className="hover:text-cyan-300 cursor-pointer">Nhạc yêu thích</Link>
            </li>
            <li>
              <Link href="/my-music/friends" className="hover:text-cyan-300 cursor-pointer">Bạn Bè</Link>
            </li>
          </ul>
        </nav>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-gray-800 text-gray-300 p-4 rounded mb-6 text-sm">
          
            </div>
            <div className="min-h-[400px] bg-gray-800 rounded-lg p-6 flex items-center justify-center">
              <p className="text-gray-500">Chưa có nội dung nào.</p>
            </div>
          </div>

          <aside className="col-span-12 lg:col-span-4">
            <PlaylistCard title="🎧 GỢI Ý DÀNH CHO BẠN" />
          </aside>
        </div>
      </div>
    </div>
  );
}