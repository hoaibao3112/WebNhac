// Utility function to get cover image from audio file path
export function getCoverImageFromAudio(audioUrl: string, artistName?: string): string {
  if (!audioUrl) return '/images/albums/DuongDomic/anhBia.jpg';
  
  // Extract file name from audio path
  // Example: /images/audio/SONTUNGMTP/Buông Đôi Tay Nhau Ra.mp3
  const parts = audioUrl.split('/');
  const fileName = parts[parts.length - 1]; // Get last part
  const artistFolder = parts[parts.length - 2]; // Get artist folder
  
  // Remove .mp3 extension and normalize
  const baseName = fileName.replace(/\.mp3$/i, '')
    .replace(/\s+/g, '_')  // Replace spaces with underscore
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A')
    .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E')
    .replace(/[ÌÍỊỈĨ]/g, 'I')
    .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O')
    .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U')
    .replace(/[ỲÝỴỶỸ]/g, 'Y')
    .replace(/Đ/g, 'D')
    .replace(/[^\w_]/g, '_'); // Replace special chars with underscore
  
  // Map artist folder to songs folder name
  const artistFolderMap: Record<string, string> = {
    'SONTUNGMTP': 'sontung_mtp',
    'HIEUTHU2': 'hieuthu2',
    'JACKJ97': 'jack',
    'RHYDER': 'rhyder',
    'QUANAP': 'quan_ap',
    'DIDAN': 'didan',
  };
  
  const songsFolder = artistFolderMap[artistFolder] || artistFolder.toLowerCase();
  
  // Construct image path
  const imagePath = `/images/songs/${songsFolder}/${baseName}.jpg`;
  
  return imagePath;
}

// Alternative: Get cover from artist name if audio mapping fails
export function getCoverImageFromArtist(artistName: string, songTitle: string): string {
  const artistSlug = artistName
    .toLowerCase()
    .replace(/sơn tùng m-tp/i, 'sontung_mtp')
    .replace(/hiếu thứ hai/i, 'hieuthu2')
    .replace(/jack j97/i, 'jack')
    .replace(/rhyder/i, 'rhyder')
    .replace(/quân a\.p/i, 'quan_ap')
    .replace(/\s+/g, '_');
  
  const titleSlug = songTitle
    .replace(/\s+/g, '_')
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A')
    .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E')
    .replace(/[ÌÍỊỈĨ]/g, 'I')
    .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O')
    .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U')
    .replace(/[ỲÝỴỶỸ]/g, 'Y')
    .replace(/Đ/g, 'D')
    .replace(/[^\w_]/g, '_');
  
  return `/images/songs/${artistSlug}/${titleSlug}.jpg`;
}

// Try to guess an album cover path for an artist from public/images/albums
export function getAlbumCoverFromArtist(artistName: string): string {
  if (!artistName) return '/images/albums/DuongDomic/anhBia.jpg';

  // common special mappings
  const lower = artistName.toLowerCase();
  const mapping: Record<string, string> = {
    'sơn tùng m-tp': 'sontung_mtp',
    'sontung m-tp': 'sontung_mtp',
    'sontung_mtp': 'sontung_mtp',
    'hiếu thứ hai': 'hieuthu2',
    'jack j97': 'jackj97',
    'rhyder': 'rhyder',
    'quân a.p': 'quanap',
    'duong domic': 'DuongDomic',
    'duongdomic': 'DuongDomic',
    'taylor swift': 'taylor-swift',
  };

  let slug = mapping[lower];
  if (!slug) {
    // basic slugify: remove diacritics-ish and keep letters/numbers/underscore/dash
    slug = artistName
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-z0-9\s_-]/g, '')
      .trim()
      .replace(/\s+/g, '_');
  }

  // try common album image names; pick the most common default filename
  const candidates = [
    `/images/albums/${slug}/anhBia.jpg`,
    `/images/albums/${slug}/cover.jpg`,
    `/images/albums/${slug}/avatar.jpg`,
    `/images/albums/${slug}/1.jpg`,
  ];

  // We can't check FS here in the client bundle reliably, so return the first candidate.
  // Image component will fallback to broken image if not present; callers should also
  // include a generic fallback when rendering.
  return candidates[0];
}
