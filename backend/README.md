# WebNhac Backend API - Spring Boot

## 📋 Mô tả
Backend API cho dự án WebNhac - nền tảng nghe nhạc trực tuyến, được xây dựng với Spring Boot.

## 🛠️ Công nghệ sử dụng
- **Java**: 17+
- **Spring Boot**: 3.2+
- **Spring Data JPA**: Quản lý database
- **Spring Security**: Authentication & Authorization
- **MySQL/PostgreSQL**: Database
- **JWT**: Token-based authentication
- **Lombok**: Giảm boilerplate code
- **MapStruct**: Object mapping
- **Swagger/OpenAPI**: API documentation

## 📁 Cấu trúc thư mục

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/webnhac/
│   │   │   ├── config/          # Configuration classes
│   │   │   ├── controller/      # REST Controllers
│   │   │   ├── dto/            # Data Transfer Objects
│   │   │   ├── entity/         # JPA Entities
│   │   │   ├── repository/     # JPA Repositories
│   │   │   ├── service/        # Business Logic
│   │   │   ├── security/       # Security configs
│   │   │   ├── exception/      # Custom exceptions
│   │   │   └── util/           # Utility classes
│   │   └── resources/
│   │       ├── application.properties
│   │       └── application-dev.properties
│   └── test/
├── pom.xml
└── README.md
```

## 🚀 API Endpoints

### Authentication
```
POST   /api/auth/register        - Đăng ký tài khoản
POST   /api/auth/login           - Đăng nhập
POST   /api/auth/refresh         - Refresh token
GET    /api/auth/me              - Thông tin user hiện tại
```

### Songs (Bài hát)
```
GET    /api/songs                - Danh sách bài hát (phân trang, filter)
GET    /api/songs/{id}           - Chi tiết bài hát
GET    /api/songs/search         - Tìm kiếm bài hát
GET    /api/songs/trending       - Bài hát thịnh hành
POST   /api/songs/{id}/play      - Tăng lượt nghe
POST   /api/songs/{id}/like      - Like bài hát
DELETE /api/songs/{id}/like      - Unlike bài hát
```

### Artists (Nghệ sĩ)
```
GET    /api/artists              - Danh sách nghệ sĩ
GET    /api/artists/{id}         - Chi tiết nghệ sĩ
GET    /api/artists/{id}/songs   - Bài hát của nghệ sĩ
POST   /api/artists/{id}/follow  - Follow nghệ sĩ
DELETE /api/artists/{id}/follow  - Unfollow nghệ sĩ
```

### Albums
```
GET    /api/albums               - Danh sách album
GET    /api/albums/{id}          - Chi tiết album
GET    /api/albums/{id}/songs    - Bài hát trong album
```

### Playlists
```
GET    /api/playlists            - Danh sách playlist công khai
GET    /api/playlists/my         - Playlist của tôi
GET    /api/playlists/{id}       - Chi tiết playlist
POST   /api/playlists            - Tạo playlist mới
PUT    /api/playlists/{id}       - Cập nhật playlist
DELETE /api/playlists/{id}       - Xóa playlist
POST   /api/playlists/{id}/songs - Thêm bài hát vào playlist
DELETE /api/playlists/{id}/songs/{songId} - Xóa bài hát khỏi playlist
```

### Genres (Thể loại)
```
GET    /api/genres               - Danh sách thể loại
GET    /api/genres/{id}          - Chi tiết thể loại
GET    /api/genres/{id}/songs    - Bài hát theo thể loại
```

### Charts (Bảng xếp hạng)
```
GET    /api/charts               - Danh sách bảng xếp hạng
GET    /api/charts/{id}          - Chi tiết bảng xếp hạng
GET    /api/charts/{id}/songs    - Bài hát trong bảng xếp hạng
```

### User
```
GET    /api/user/favorites       - Bài hát yêu thích
GET    /api/user/history         - Lịch sử nghe nhạc
GET    /api/user/following       - Nghệ sĩ đang follow
PUT    /api/user/profile         - Cập nhật profile
```

### Banners
```
GET    /api/banners              - Danh sách banner active
```

## 🔧 Cài đặt và chạy

### Yêu cầu
- Java JDK 17+
- Maven 3.8+
- MySQL 8.0+ hoặc PostgreSQL 14+

### Bước 1: Clone và cấu hình database

```bash
# Tạo database
CREATE DATABASE webnhac;

# Import schema và data
mysql -u root -p webnhac < database/schema.sql
mysql -u root -p webnhac < database/mock-data.sql
```

### Bước 2: Cấu hình application.properties

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/webnhac
spring.datasource.username=root
spring.datasource.password=yourpassword

# JPA
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true

# JWT
jwt.secret=your-secret-key-here
jwt.expiration=86400000
```

### Bước 3: Build và chạy

```bash
# Build project
mvn clean install

# Run application
mvn spring-boot:run

# Hoặc chạy jar file
java -jar target/webnhac-backend-0.0.1-SNAPSHOT.jar
```

Server sẽ chạy tại: http://localhost:8080

### API Documentation
Swagger UI: http://localhost:8080/swagger-ui.html

## 🔐 Authentication

API sử dụng JWT (JSON Web Token) cho authentication.

**Headers cần thiết:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2024-10-04T10:00:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_CODE",
  "timestamp": "2024-10-04T10:00:00Z"
}
```

## 🎯 Tính năng nâng cao

### 1. Pagination
```
GET /api/songs?page=0&size=20&sort=playCount,desc
```

### 2. Filtering
```
GET /api/songs?genre=vpop&year=2024&isPremium=false
```

### 3. Search
```
GET /api/songs/search?q=lac+troi&type=song,artist,album
```

## 🧪 Testing

```bash
# Chạy tests
mvn test

# Chạy với coverage
mvn test jacoco:report
```

## 📝 Environment Variables

```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=webnhac
DB_USERNAME=root
DB_PASSWORD=password

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000

# Server
SERVER_PORT=8080

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 🔄 Integration với Frontend

Frontend Next.js sẽ gọi API thông qua axios hoặc fetch:

```typescript
// Example: Lấy danh sách bài hát
const response = await fetch('http://localhost:8080/api/songs?page=0&size=20');
const data = await response.json();
```

## 📦 Dependencies chính

```xml
<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Boot Starter Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- Spring Boot Starter Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- MySQL Driver -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    
    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt</artifactId>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

## 📄 License
Copyright © 2024 WebNhac. All rights reserved.
