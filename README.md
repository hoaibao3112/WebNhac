# WebNhac - Nền tảng nghe nhạc trực tuyến

Dự án web nghe nhạc được xây dựng với Next.js, TypeScript và Tailwind CSS.

## 📁 Cấu trúc thư mục

```
WebNhac/
├── src/
│   ├── app/                      # App Router (Next.js 13+)
│   │   ├── layout.tsx           # Layout chính cho toàn bộ app
│   │   ├── page.tsx             # Trang chủ
│   │   └── globals.css          # Global styles
│   │
│   └── components/              # Các React Components
│       ├── layout/              # Components cho layout
│       │   ├── Sidebar.tsx      # Menu bên trái
│       │   ├── Header.tsx       # Header trên cùng
│       │   └── Footer.tsx       # Footer
│       │
│       └── home/                # Components cho trang chủ
│           ├── Greeting.tsx     # Lời chào theo thời gian
│           ├── BannerCarousel.tsx # Banner slide
│           ├── CategoryGrid.tsx  # Lưới danh mục nhạc
│           └── ChartSection.tsx  # Bảng xếp hạng
│
├── public/                      # Static files
├── .github/                     # GitHub configs
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind CSS config
└── next.config.ts              # Next.js config
```

## 🎨 Các tính năng chính

### Layout
- **Sidebar trái**: Logo, menu điều hướng (Khám Phá, Dành Cho Bạn, Của Tôi), thư viện, nút đăng nhập
- **Header**: Nút back/next, thanh tìm kiếm, nút upload, badge FREE/VIP, đăng nhập, cài đặt
- **Footer**: Thông tin công ty, cộng đồng, liên kết hữu ích, chính sách

### Trang chủ
1. **Lời chào động**: Tự động thay đổi theo thời gian trong ngày
2. **Banner Carousel**: Slide show tự động với các banner quảng cáo
3. **Danh mục nhạc**: Grid 10 danh mục với màu sắc và icon riêng:
   - Gen Z Hits
   - TikTok Thịnh Hành
   - K-Pop
   - Indie Việt
   - Yêu
   - V-Pop Thịnh Hành
   - Remix Việt
   - Hip-Hop Việt
   - Chill
   - Hip-Hop/R&B

4. **Bảng xếp hạng**: 6 bảng xếp hạng khác nhau:
   - Top 50 Nhạc Việt
   - Top 50 Nhạc Âu Mỹ
   - Top 50 Nhạc Hàn
   - Top 50 Nhạc Hoa
   - Top 50 Nhạc Trẻ
   - Top 50 Rap Việt

## 🚀 Cài đặt và chạy dự án

### Yêu cầu
- Node.js 18.17 trở lên
- npm hoặc yarn

### Các bước cài đặt

1. **Cài đặt dependencies**:
```bash
npm install
```

2. **Chạy development server**:
```bash
npm run dev
```

3. **Mở trình duyệt**:
Truy cập [http://localhost:3000](http://localhost:3000)

### Các lệnh khác

```bash
# Build production
npm run build

# Chạy production server
npm start

# Kiểm tra lỗi ESLint
npm run lint
```

## 🎨 Màu sắc chính

- **Primary**: #1DB954 (Xanh lá - màu chủ đạo)
- **Secondary**: #191414 (Đen - nền)
- **Accent**: #535353 (Xám - phụ trợ)
- **Background**: #121212 (Đen tối)
- **Text**: #FFFFFF (Trắng)

## 🛠️ Công nghệ sử dụng

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: React 18.3.1
- **Linting**: ESLint

## 📝 Component Details

### Layout Components

#### Sidebar (`components/layout/Sidebar.tsx`)
- Client component với routing động
- Menu items có highlight khi active
- Responsive design

#### Header (`components/layout/Header.tsx`)
- Thanh tìm kiếm với state management
- Navigation buttons
- User actions (upload, login, settings)

#### Footer (`components/layout/Footer.tsx`)
- 4 cột thông tin
- Links đến các trang quan trọng

### Home Components

#### Greeting (`components/home/Greeting.tsx`)
- Hiển thị lời chào theo thời gian
- Update động với useEffect

#### BannerCarousel (`components/home/BannerCarousel.tsx`)
- Auto-slide mỗi 5 giây
- Indicators để chuyển banner thủ công
- Smooth transition

#### CategoryGrid (`components/home/CategoryGrid.tsx`)
- Grid 5 cột responsive
- Hover effects
- Gradient backgrounds

#### ChartSection (`components/home/ChartSection.tsx`)
- Grid 3 cột
- Card layout với hover effects

## 📄 License

Copyright © 2024 WebNhac. All rights reserved.

## 👥 Đóng góp

Dự án đang trong giai đoạn phát triển. Mọi đóng góp đều được hoan nghênh!
