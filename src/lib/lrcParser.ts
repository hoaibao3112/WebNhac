// LRC (Lyric) Parser - Parse synchronized lyrics
export interface LyricLine {
  time: number; // Time in seconds
  text: string;
}

/**
 * Parse LRC format lyrics
 * Format: [mm:ss.xx]Lyric text
 * Example: [00:12.50]Người theo hương hoa
 */
export function parseLRC(lrcString: string): LyricLine[] {
  if (!lrcString) return [];

  const lines = lrcString.split('\n');
  const lyrics: LyricLine[] = [];

  // Regex to match [mm:ss.xx] or [mm:ss]
  const timeRegex = /\[(\d{2}):(\d{2})\.?(\d{2,3})?\]/;

  lines.forEach(line => {
    const match = line.match(timeRegex);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      const centiseconds = match[3] ? parseInt(match[3].padEnd(2, '0')) : 0;
      
      const time = minutes * 60 + seconds + centiseconds / 100;
      const text = line.replace(timeRegex, '').trim();
      
      if (text) {
        lyrics.push({ time, text });
      }
    }
  });

  // Sort by time
  return lyrics.sort((a, b) => a.time - b.time);
}

/**
 * Get current lyric line index based on current time
 */
export function getCurrentLyricIndex(
  lyrics: LyricLine[],
  currentTime: number
): number {
  if (!lyrics.length) return -1;

  for (let i = lyrics.length - 1; i >= 0; i--) {
    if (currentTime >= lyrics[i].time) {
      return i;
    }
  }
  
  return -1;
}

/**
 * Get upcoming lyric lines (for preview)
 */
export function getVisibleLyrics(
  lyrics: LyricLine[],
  currentIndex: number,
  beforeCount: number = 2,
  afterCount: number = 3
): { line: LyricLine; index: number; isCurrent: boolean }[] {
  const result = [];
  const start = Math.max(0, currentIndex - beforeCount);
  const end = Math.min(lyrics.length - 1, currentIndex + afterCount);

  for (let i = start; i <= end; i++) {
    result.push({
      line: lyrics[i],
      index: i,
      isCurrent: i === currentIndex,
    });
  }

  return result;
}
