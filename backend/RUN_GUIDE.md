# Hướng dẫn chạy Spring Boot Backend

## ⚡ Cách 1: Dùng Maven Wrapper (Không cần cài Maven)

### Windows PowerShell:
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

### Hoặc ngắn gọn hơn:
```powershell
cd backend
.\mvnw spring-boot:run
```

## 📦 Cách 2: Cài đặt Maven và chạy

### Bước 1: Cài Maven
1. Download Maven từ: https://maven.apache.org/download.cgi
2. Giải nén vào thư mục (ví dụ: `C:\Program Files\Apache\maven`)
3. Thêm vào PATH:
   - Mở System Properties > Environment Variables
   - Thêm `C:\Program Files\Apache\maven\bin` vào PATH
4. Khởi động lại PowerShell
5. Kiểm tra: `mvn --version`

### Bước 2: Chạy project
```powershell
cd backend
mvn spring-boot:run
```

## 🎯 Cách 3: Dùng IDE (IntelliJ IDEA / Eclipse)

### IntelliJ IDEA:
1. File > Open > Chọn folder `backend`
2. Đợi Maven import dependencies
3. Tìm file `WebNhacApplication.java`
4. Click chuột phải > Run 'WebNhacApplication'

### Eclipse:
1. File > Import > Maven > Existing Maven Projects
2. Chọn folder `backend`
3. Right-click project > Run As > Spring Boot App

## 🔧 Cách 4: Build JAR và chạy

```powershell
# Build
cd backend
.\mvnw clean package -DskipTests

# Chạy JAR file
java -jar target\webnhac-backend-0.0.1-SNAPSHOT.jar
```

## ✅ Kiểm tra Backend đã chạy

Sau khi chạy thành công, bạn sẽ thấy:
```
Started WebNhacApplication in X.XXX seconds
```

Test API:
- Browser: http://localhost:8080/api/songs
- Swagger UI: http://localhost:8080/swagger-ui.html

## ⚠️ Lỗi thường gặp

### 1. "Port 8080 is already in use"
```powershell
# Tìm và kill process đang dùng port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### 2. "Could not connect to database"
- Kiểm tra MySQL đang chạy
- Kiểm tra password trong `application.properties`
- Test connection: `mysql -u root -p`

### 3. Maven dependencies download lỗi
```powershell
# Xóa cache và tải lại
.\mvnw clean install -U
```

## 🚀 Recommend: Dùng Maven Wrapper

Chạy lệnh này là đơn giản nhất:
```powershell
cd C:\WebNhac\backend
.\mvnw.cmd spring-boot:run
```

Không cần cài Maven, nó sẽ tự động download! 🎉
