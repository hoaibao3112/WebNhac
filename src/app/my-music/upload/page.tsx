import Link from 'next/link';

export default function UploadPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tải Nhạc lên</h1>
      <p className="text-gray-400 mb-6">Chức năng tải nhạc sẽ được hỗ trợ ở đây.</p>

      <div className="flex gap-3">
        <Link href="/my-music" className="text-cyan-400">Quay lại My Music</Link>
        <Link href="/my-music/favorites" className="text-cyan-400">Đến Nhạc yêu thích</Link>
        <Link href="/my-music/friends" className="text-cyan-400">Đến Bạn Bè</Link>
      </div>
    </div>
  );
}
