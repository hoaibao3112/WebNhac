# Music Player Page Guide

## Overview
This guide explains the new Music Player Page created for your Next.js music streaming application.

## File Structure

```
src/
├── app/
│   └── player/
│       └── [id]/
│           └── page.tsx          # Main player page with dynamic route
├── components/
│   ├── player/
│   │   ├── MusicPlayerBar.tsx    # Bottom player bar with controls
│   │   └── SongDetail.tsx        # Main content area with song info
│   └── layout/
│       ├── Sidebar.tsx           # (existing) Left sidebar
│       └── Header.tsx            # (existing) Top header
```

## Components Description

### 1. MusicPlayerBar.tsx
**Fixed bottom player bar with full music controls:**

**Features:**
- Left section: Small album cover + song title + artist name
- Center section:
  - Shuffle button (toggleable)
  - Previous track button
  - Play/Pause button (large, white, centered)
  - Next track button
  - Repeat button (toggleable)
  - Progress bar with current time and total duration
- Right section:
  - Audio quality badge (128kbps)
  - Volume control with mute button
  - Playlist button

**Props:**
```typescript
interface MusicPlayerBarProps {
  song: {
    id: number;
    title: string;
    artist: string;
    imageUrl: string;
    audioUrl: string;
    duration: number;
  } | null;
  onNext?: () => void;
  onPrevious?: () => void;
}
```

**Audio Features:**
- Real HTML5 audio element with play/pause control
- Seek functionality (click on progress bar)
- Volume control with slider
- Mute/unmute toggle
- Repeat mode
- Auto-play next song on end (if onNext is provided)

### 2. SongDetail.tsx
**Main content area displaying song information:**

**Features:**
- Large album cover (320x320px) with hover zoom effect
- Song title (large, bold, centered)
- Artist name (medium, gray, below title)
- Album name and release date (optional)
- Action buttons:
  - ❤️ Like button with count (toggleable)
  - 🔁 Share button with count
  - ⬇️ Download button
  - ⋮ More options menu (Add to Playlist, Go to Artist, etc.)
- Lyrics section:
  - Styled background gradient
  - Centered text
  - Each line on separate line
  - Hover effect on lyrics lines
- Information cards:
  - Song information (Artist, Album, Release Date)
  - Statistics (Likes, Shares)

**Props:**
```typescript
interface SongDetailProps {
  song: {
    id: number;
    title: string;
    artist: string;
    imageUrl: string;
    likeCount: number;
    shareCount: number;
    lyrics?: string[];
    albumName?: string;
    releaseDate?: string;
  };
}
```

### 3. page.tsx (Player Page)
**Main page component with dynamic routing:**

**Route:** `/player/[id]`

**Features:**
- Dynamic route parameter for song ID
- Fetches song data based on ID
- Loading state
- Error state (song not found)
- Integrates all components (Sidebar, Header, SongDetail, MusicPlayerBar)
- Handles next/previous song navigation

## Usage

### Navigate to Player Page
```typescript
// From any component
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push(`/player/${songId}`);

// Or use Link
import Link from 'next/link';

<Link href={`/player/${songId}`}>
  Play Song
</Link>
```

### Integration with API

Currently using mock data. To integrate with your backend:

**1. Update page.tsx to fetch from your API:**
```typescript
useEffect(() => {
  fetch(`http://localhost:8080/api/songs/${songId}`)
    .then(res => res.json())
    .then(data => {
      setSong({
        id: data.id,
        title: data.title,
        artist: data.artist.name,
        imageUrl: data.imageUrl || '/images/default.jpg',
        audioUrl: data.fileUrl,
        duration: data.duration,
        likeCount: data.likeCount,
        shareCount: data.shareCount || 0,
        albumName: data.album?.title,
        releaseDate: data.releaseDate,
        lyrics: data.lyrics ? data.lyrics.split('\n') : [],
      });
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error fetching song:', error);
      setIsLoading(false);
    });
}, [songId]);
```

**2. Implement next/previous song logic:**
```typescript
const handleNext = async () => {
  // Option 1: Get next song from playlist
  const response = await fetch(`/api/songs/${songId}/next`);
  const nextSong = await response.json();
  router.push(`/player/${nextSong.id}`);

  // Option 2: Navigate to next ID
  router.push(`/player/${parseInt(songId) + 1}`);
};
```

## Styling

All components use TailwindCSS with these design principles:
- Dark theme (black/gray backgrounds)
- Purple accent color (#8b5cf6)
- Smooth transitions and hover effects
- Responsive layout
- Shadow effects for depth
- Rounded corners for modern look

## Customization

### Change Colors
Update the color classes in each component:
- Purple accent: `bg-purple-600`, `text-purple-500`
- Gray backgrounds: `bg-gray-900`, `bg-gray-800`
- White text: `text-white`

### Add More Features
- **Queue management:** Add playlist queue display
- **Lyrics sync:** Highlight current lyric line based on audio time
- **Equalizer:** Add visual audio equalizer
- **Comments:** Add comment section below lyrics
- **Related songs:** Show similar songs at bottom

### Mobile Responsive
The layout is already responsive. For mobile-specific improvements:
- Stack controls vertically on small screens
- Hide sidebar on mobile, show hamburger menu
- Reduce album cover size
- Simplify player controls

## Testing

1. **Start your backend:**
```bash
cd backend
./mvnw.cmd spring-boot:run
```

2. **Start your frontend:**
```bash
npm run dev
```

3. **Navigate to player page:**
```
http://localhost:3000/player/1
```

4. **Test features:**
- ✅ Song info displays correctly
- ✅ Album cover loads
- ✅ Audio plays when clicking play button
- ✅ Progress bar updates during playback
- ✅ Seek works (click on progress bar)
- ✅ Volume control works
- ✅ Like button toggles
- ✅ Share button works (if browser supports navigator.share)
- ✅ Lyrics display properly

## Next Steps

1. **Connect to real API** - Replace mock data with backend calls
2. **Add lyrics sync** - Highlight current line during playback
3. **Implement playlist queue** - Show and manage upcoming songs
4. **Add keyboard shortcuts** - Space for play/pause, arrows for seek
5. **Add lyrics scrolling** - Auto-scroll to current line
6. **Implement like/share API** - Save user interactions to database
7. **Add comments section** - Allow users to comment on songs
8. **Add related songs** - Show similar or recommended tracks

## Notes

- The player bar is fixed at the bottom (z-index: 50)
- Add `pb-32` to page content to prevent overlap with player bar
- Audio element is hidden, controlled programmatically
- All icons from `lucide-react` package (already installed)
- Images use Next.js Image component for optimization

Enjoy your new music player page! 🎵
