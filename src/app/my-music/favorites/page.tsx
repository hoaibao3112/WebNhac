import Link from 'next/link';

export default function FavoritesPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Nhạc yêu thích</h1>
      <p className="text-gray-400 mb-6">Danh sách bài hát bạn đã thích sẽ xuất hiện ở đây.</p>

      <div className="flex gap-3">
        <Link href="/my-music" className="text-cyan-400">Quay lại My Music</Link>
        <Link href="/my-music/upload" className="text-cyan-400">Đến Tải Nhạc lên</Link>
        <Link href="/my-music/friends" className="text-cyan-400">Đến Bạn Bè</Link>
      </div>
    </div>
  );
}
