# 🎬 DEMO SCRIPT - Test Frontend

## 📋 Checklist Testing

### Bước 1: Mở Frontend
1. Truy cập: http://localhost:3001
2. ✅ Trang load thành công
3. ✅ Không có error trong console

### Bước 2: Kiểm tra hiển thị
1. Tìm section "🔥 Thịnh Hành"
2. ✅ Hiển thị grid của trending songs
3. ✅ Mỗi card có:
   - Tên bài hát
   - Tên nghệ sĩ (KHÔNG phải "Unknown Artist")
   - Play count (M views)
   - Like count (K likes)

### Bước 3: Test Click
1. Hover chuột vào một card
2. ✅ Card có hiệu ứng hover (nổi lên)
3. ✅ Play button xuất hiện
4. Click vào card
5. ✅ Console không có error
6. ✅ Play count trong database tăng

### Bước 4: Kiểm tra Console
Mở DevTools (F12) → Console tab:
```
✅ Không có: "Cannot read property 'map' of undefined"
✅ Không có: "artists is not iterable"
✅ Không có: AxiosError
✅ Không có: net::ERR_INCOMPLETE_CHUNKED_ENCODING
```

### Bước 5: Kiểm tra Network
Mở DevTools (F12) → Network tab:
1. Reload trang (Ctrl+R)
2. Tìm request: `trending?page=0&size=10`
3. ✅ Status: 200 OK
4. ✅ Response có structure:
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "artists": [ ... ],  // ← ARRAY, không phải string
        "genres": [ ... ]    // ← ARRAY, không phải string
      }
    ]
  }
}
```

### Bước 6: Test Multiple Clicks
1. Click vào nhiều bài hát khác nhau
2. ✅ Mỗi lần click, play count tăng
3. ✅ Không có memory leak
4. ✅ UI responsive

## 🐛 Nếu có lỗi

### Lỗi: "artists.map is not a function"
**Nguyên nhân:** Backend chưa trả về array

**Giải pháp:**
```powershell
# Test backend response
$test = Invoke-RestMethod -Uri 'http://localhost:8080/api/songs/trending?page=0&size=1'
$test.data.content[0].artists

# Nếu không phải array → restart backend trong IntelliJ
```

### Lỗi: Không hiển thị tên nghệ sĩ
**Kiểm tra:**
1. Backend có trả về artists array không?
2. Frontend component có render artists không?
3. CSS có ẩn text không?

### Lỗi: Click không tăng play count
**Kiểm tra:**
1. POST request có gửi thành công không?
2. Backend có log exception không?
3. Database connection OK không?

## ✅ Expected Results

### Visual Check
```
┌─────────────────────────────────────────────────────────┐
│  🎵 WebNhac                                      [Search]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🔥 Thịnh Hành                                          │
│                                                         │
│  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐│
│  │  🎵   │  │  🎵   │  │  🎵   │  │  🎵   │  │  🎵   ││
│  │       │  │       │  │       │  │       │  │       ││
│  │Anti-  │  │Bad    │  │Lavend │  │Shiver │  │Yet To ││
│  │Hero   │  │Habits │  │er Haze│  │s      │  │Come   ││
│  │       │  │       │  │       │  │       │  │       ││
│  │Taylor │  │Ed     │  │Taylor │  │Ed     │  │BTS    ││
│  │Swift  │  │Sheeran│  │Swift  │  │Sheeran│  │       ││
│  │       │  │       │  │       │  │       │  │       ││
│  │▶150M │  │▶145M │  │▶140M │  │▶135M │  │▶130M ││
│  │❤750K │  │❤720K │  │❤700K │  │❤680K │  │❤650K ││
│  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘│
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Console Output (Expected)
```
[Network] GET /api/songs/trending?page=0&size=10 → 200 OK (123ms)
```

### Console Output (NO errors like these)
```
❌ AxiosError: Network Error
❌ TypeError: Cannot read property 'map' of undefined
❌ GET http://localhost:8080/api/songs/trending net::ERR_INCOMPLETE_CHUNKED_ENCODING
```

## 📊 Performance Metrics

- Initial load: < 1s
- API response time: < 200ms
- Click response: < 100ms
- Memory usage: Stable (no leaks)

## 🎉 Success Criteria

Tất cả các điểm sau phải đạt ✅:

- [x] Backend API trả về `Page<SongDTO>` với artists/genres là arrays
- [x] Frontend render đúng tên bài hát và nghệ sĩ
- [x] Click vào card không có error
- [x] Play count tăng sau mỗi lần click
- [x] UI responsive và smooth
- [x] Console sạch sẽ, không có error

---

## 🚀 Quick Test Commands

### Test từ browser console
```javascript
// Fetch trending songs
fetch('http://localhost:8080/api/songs/trending?page=0&size=5')
  .then(r => r.json())
  .then(data => {
    console.log('✅ Artists type:', Array.isArray(data.data.content[0].artists));
    console.log('✅ Genres type:', Array.isArray(data.data.content[0].genres));
    console.log('Songs:', data.data.content.map(s => `${s.title} - ${s.artists.map(a => a.name).join(', ')}`));
  });

// Play a song
fetch('http://localhost:8080/api/songs/17/play', {method: 'POST'})
  .then(r => r.json())
  .then(data => console.log('✅ Play response:', data));
```

### Test từ PowerShell
```powershell
# Quick health check
$songs = (Invoke-RestMethod 'http://localhost:8080/api/songs/trending?page=0&size=5').data.content
$songs | ForEach-Object { 
    Write-Host "$($_.title) - $($_.artists.name -join ', ') - $($_.playCount) plays" 
}
```

---

**🎵 Happy Testing! Enjoy your music streaming app! 🎉**
