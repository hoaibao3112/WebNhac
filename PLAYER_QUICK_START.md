# 🎵 Music Player Page - Hướng Dẫn Sử Dụng Nhanh

## ✅ Đã Hoàn Thành

Tôi đã tạo thành công một trang phát nhạc (Music Player Page) hoàn chỉnh cho ứng dụng WebNhac của bạn với các tính năng sau:

### 📁 Files Đã Tạo

1. **`src/components/player/MusicPlayerBar.tsx`** - Thanh điều khiển phát nhạc ở đáy màn hình
2. **`src/components/player/SongDetail.tsx`** - Hiển thị thông tin chi tiết bài hát
3. **`src/app/player/[id]/page.tsx`** - Trang phát nhạc với dynamic route

### 📝 Files Đã Cập Nhật

1. **`src/components/home/TrendingSongs.tsx`** - Thêm navigation đến player page khi click bài hát
2. **`src/components/layout/Header.tsx`** - Thêm chức năng back/forward navigation

### 📚 Tài Liệu

1. **`MUSIC_PLAYER_PAGE_GUIDE.md`** - Hướng dẫn cơ bản
2. **`MUSIC_PLAYER_COMPLETE_GUIDE.md`** - Hướng dẫn chi tiết đầy đủ (tiếng Việt)

## 🎨 Giao Diện

### Layout
```
┌────────────────────────────────────────────────┐
│  ← → [Tìm kiếm]      [Upload] [VIP] [Avatar]  │ Header
├────────┬───────────────────────────────────────┤
│        │                                       │
│ Logo   │     [Album Cover - 320x320]          │
│        │                                       │
│ Menu   │     Tên Bài Hát (lớn, bold)          │
│        │     Tên Ca Sĩ (nhỏ hơn)              │
│ Thư    │     Album • Ngày phát hành            │
│ Viện   │                                       │
│        │  [❤️ Thích] [🔁 Chia sẻ] [⋮ More]   │
│ Play   │                                       │
│ list   │     ══════ Lời Bài Hát ══════        │
│        │     Dòng 1                            │
│        │     Dòng 2                            │
│        │     Dòng 3                            │
├────────┴───────────────────────────────────────┤
│ 🎵 Song  ⏮ ⏯ ⏭ ══🔴════  128k [===] 🔊      │ Player
└────────────────────────────────────────────────┘
```

## ✨ Tính Năng Chính

### 1. Thanh Phát Nhạc (MusicPlayerBar)
- ✅ **Nút Play/Pause** - Phát và dừng nhạc
- ✅ **Nút Next/Previous** - Chuyển bài trước/sau
- ✅ **Shuffle** - Phát ngẫu nhiên (toggle)
- ✅ **Repeat** - Lặp lại bài hát (toggle)
- ✅ **Thanh tiến trình** - Hiển thị và tua nhạc
- ✅ **Điều chỉnh âm lượng** - Kéo thanh volume, nút mute
- ✅ **Hiển thị thời gian** - Current time / Total duration (mm:ss)

### 2. Thông Tin Bài Hát (SongDetail)
- ✅ **Ảnh bìa album** - Lớn, đẹp, có hiệu ứng hover
- ✅ **Thông tin bài hát** - Title, Artist, Album, Release Date
- ✅ **Nút Like** - Thích bài hát với số lượng
- ✅ **Nút Share** - Chia sẻ bài hát
- ✅ **Nút Download** - Tải nhạc về
- ✅ **Menu More** - Add to Playlist, Go to Artist, etc.
- ✅ **Lyrics** - Hiển thị lời bài hát (nếu có)
- ✅ **Statistics** - Thống kê likes, shares

### 3. Navigation
- ✅ **Dynamic Route** - `/player/[id]` (VD: /player/21)
- ✅ **Back/Forward** - Nút quay lại/tiến trong Header
- ✅ **Click từ Home** - Click bài hát trong Trending → mở player

## 🚀 Cách Sử Dụng

### Bước 1: Khởi Động Backend
```bash
cd c:\WebNhac\backend
./mvnw.cmd spring-boot:run
```

### Bước 2: Khởi Động Frontend
```bash
cd c:\WebNhac
npm run dev
```

### Bước 3: Truy Cập

**Cách 1: Từ Trang Chủ**
1. Mở http://localhost:3000
2. Kéo xuống phần "🔥 Thịnh Hành"
3. Click vào bất kỳ bài hát nào
4. Tự động chuyển đến trang phát nhạc

**Cách 2: Trực Tiếp**
- Truy cập: http://localhost:3000/player/21
- Thay `21` bằng bất kỳ ID bài hát nào (1-77)

## 🎮 Test Các Tính Năng

### Checklist Kiểm Tra

**Hiển thị:**
- [ ] Tên bài hát hiển thị đúng
- [ ] Tên ca sĩ hiển thị đúng
- [ ] Ảnh bìa album load được (hoặc placeholder)
- [ ] Lyrics hiển thị (hoặc "Lyrics not available yet")

**Phát nhạc:**
- [ ] Click nút Play ▶️ → nhạc phát
- [ ] Click nút Pause ⏸️ → nhạc dừng
- [ ] Thanh tiến trình tự động chạy khi phát nhạc
- [ ] Thời gian current/total hiển thị đúng

**Điều khiển:**
- [ ] Kéo thanh tiến trình → tua nhạc đến vị trí mới
- [ ] Kéo thanh âm lượng → thay đổi volume
- [ ] Click icon loa → mute/unmute
- [ ] Click Shuffle 🔀 → chuyển màu purple (bật)
- [ ] Click Repeat 🔁 → chuyển màu purple (bật)

**Navigation:**
- [ ] Click Next ⏭️ → chuyển sang bài tiếp theo (ID + 1)
- [ ] Click Previous ⏮️ → quay lại bài trước (ID - 1)
- [ ] Click ← trong Header → quay lại trang trước
- [ ] Click → trong Header → tiến trang sau

**Tương tác:**
- [ ] Click Like ❤️ → đổi màu purple, số lượng tăng 1
- [ ] Click Like lần 2 → đổi về gray, số lượng giảm 1
- [ ] Click Share 🔁 → hiện share dialog (nếu browser hỗ trợ)
- [ ] Click ⋮ → hiện menu dropdown

## 🔧 Kết Nối API

### Hiện Tại
Player page đã được cấu hình để fetch dữ liệu thật từ backend của bạn:
```typescript
// Fetch song by ID
const data = await songService.getById(parseInt(songId));

// Increment play count
await songService.play(parseInt(songId));
```

### Dữ Liệu Đang Sử Dụng
- **Tên bài hát**: `data.title`
- **Ca sĩ**: `data.artists[].name` (join bằng dấu phẩy)
- **Ảnh bìa**: `data.coverImageUrl`
- **File nhạc**: `data.fileUrl`
- **Thời lượng**: `data.duration`
- **Số lượt thích**: `data.likeCount`
- **Album**: `data.album?.title`
- **Ngày phát hành**: `data.releaseDate`

### Lời Bài Hát (Lyrics)
**Lưu ý**: Hiện tại database chưa có field `lyrics`, nên đang hiển thị placeholder:
```
Lyrics not available yet.
Stay tuned for updates!
```

**Để thêm lyrics:**
1. Thêm column `lyrics TEXT` vào bảng `songs` trong database
2. Update data cho các bài hát
3. Uncomment code trong `page.tsx`:
```typescript
lyrics: data.lyrics 
  ? data.lyrics.split('\n')
  : ['Lyrics not available yet.']
```

## 📱 Responsive (Đã Tích Hợp)

- **Desktop**: Full layout với tất cả tính năng
- **Tablet**: Tự động điều chỉnh kích thước
- **Mobile**: Stack các controls, ẩn sidebar (có thể thêm hamburger menu sau)

## 🎨 Tùy Chỉnh Màu Sắc

### Đổi Màu Chủ Đạo
Hiện tại dùng màu **Purple** (`purple-500`, `purple-600`). Để đổi sang màu khác:

**Blue:**
```tsx
// Tìm và thay thế trong các file component
className="bg-purple-600" → className="bg-blue-600"
className="text-purple-500" → className="text-blue-500"
```

**Green:**
```tsx
className="bg-purple-600" → className="bg-green-600"
className="text-purple-500" → className="text-green-500"
```

**Pink:**
```tsx
className="bg-purple-600" → className="bg-pink-600"
className="text-purple-500" → className="text-pink-500"
```

### Đổi Background
```tsx
// Current: gradient from gray-900 to black
className="bg-gradient-to-b from-gray-900 via-black to-black"

// Purple gradient:
className="bg-gradient-to-b from-purple-900 via-gray-900 to-black"

// Blue gradient:
className="bg-gradient-to-b from-blue-900 via-gray-900 to-black"
```

## 🐛 Xử Lý Lỗi Thường Gặp

### 1. Audio không phát
**Nguyên nhân**: File path không đúng hoặc file không tồn tại

**Giải pháp**:
```sql
-- Check file path trong database
SELECT id, title, file_url FROM songs WHERE id = 21;

-- Nếu thiếu /images, chạy script fix:
-- c:\WebNhac\database\fix_missing_images_path.sql
```

### 2. 404 Error khi fetch song
**Nguyên nhân**: Backend chưa chạy hoặc API endpoint sai

**Giải pháp**:
```bash
# Kiểm tra backend đang chạy
curl http://localhost:8080/api/songs/21

# Restart backend nếu cần
cd backend
./mvnw.cmd spring-boot:run
```

### 3. Ảnh bìa không hiển thị
**Nguyên nhân**: coverImageUrl null hoặc file không có trong public

**Giải pháp**:
- Placeholder sẽ tự động hiển thị: `/images/albums/DuongDomic/anhBia.jpg`
- Thêm ảnh thật vào `public/images/albums/` và update database

### 4. CORS Error
**Nguyên nhân**: Backend chưa cho phép request từ frontend

**Giải pháp**: Backend đã được config CORS cho `http://localhost:3000`, nên không bị lỗi này.

## 🎯 Tính Năng Có Thể Thêm Sau

### 1. Lyrics Sync (Đồng Bộ Lời)
Highlight dòng lyrics hiện tại theo thời gian nhạc:
```typescript
const lyrics = [
  { time: 0, text: "Dòng 1" },
  { time: 10, text: "Dòng 2" },
  { time: 20, text: "Dòng 3" },
];

// Update highlight based on currentTime
```

### 2. Queue Management (Hàng Đợi Phát)
Hiển thị và quản lý danh sách nhạc chờ phát:
- Add to queue
- Remove from queue
- Reorder queue
- Clear queue

### 3. Comments Section
Cho phép user comment vào bài hát:
- Display comments
- Add new comment
- Reply to comments
- Like comments

### 4. Related Songs
Hiển thị các bài hát liên quan:
- Same artist
- Same genre
- Similar songs
- Recommendations

### 5. Visualizer (Hiệu Ứng Âm Thanh)
Hiển thị frequency bars động theo nhạc:
- Use Web Audio API
- Draw canvas visualizer
- Multiple visualizer styles

### 6. Keyboard Shortcuts
Thêm phím tắt:
- **Space**: Play/Pause
- **→**: Seek forward 5s
- **←**: Seek backward 5s
- **↑**: Volume up
- **↓**: Volume down
- **M**: Mute/Unmute

## 📊 Thống Kê

### Files Đã Tạo
- 3 files React component mới
- 2 files tài liệu hướng dẫn
- 2 files đã cập nhật

### Lines of Code
- MusicPlayerBar: ~250 lines
- SongDetail: ~200 lines
- PlayerPage: ~150 lines
- **Total**: ~600 lines code

### Dependencies Đã Cài
- `lucide-react` - Icon library (Play, Pause, Heart, Share, etc.)

## 🎉 Kết Luận

Bạn đã có một trang phát nhạc hoàn chỉnh với:

✅ Giao diện đẹp mắt, chuyên nghiệp (giống NCT/Spotify)
✅ Đầy đủ chức năng phát nhạc cơ bản
✅ Tích hợp với backend API
✅ Tự động fetch dữ liệu thật
✅ Navigation mượt mà giữa các bài hát
✅ Responsive design
✅ Error handling tốt
✅ Loading states
✅ Dễ dàng tùy chỉnh và mở rộng

## 🚀 Bắt Đầu Ngay

```bash
# Terminal 1: Start backend
cd c:\WebNhac\backend
./mvnw.cmd spring-boot:run

# Terminal 2: Start frontend
cd c:\WebNhac
npm run dev

# Browser: Open
http://localhost:3000

# Click vào bất kỳ bài hát nào trong "Thịnh Hành"
# Hoặc truy cập trực tiếp: http://localhost:3000/player/21
```

Chúc bạn code vui vẻ! 🎵🎸🎹

---

**Ghi chú**: Nếu có bất kỳ câu hỏi hoặc gặp vấn đề gì, hãy kiểm tra file `MUSIC_PLAYER_COMPLETE_GUIDE.md` để có hướng dẫn chi tiết hơn.
