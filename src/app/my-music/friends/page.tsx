import Link from 'next/link';

export default function FriendsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bạn Bè</h1>
      <p className="text-gray-400 mb-6">Danh sách bạn bè và hoạt động họ chia sẻ.</p>

      <div className="flex gap-3">
        <Link href="/my-music" className="text-cyan-400">Quay lại My Music</Link>
        <Link href="/my-music/upload" className="text-cyan-400">Đến Tải Nhạc lên</Link>
        <Link href="/my-music/favorites" className="text-cyan-400">Đến Nhạc yêu thích</Link>
      </div>
    </div>
  );
}
