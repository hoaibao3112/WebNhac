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
