# Hướng dẫn cấu hình Database Connection

## Cách 1: Sửa trực tiếp application.properties (Đơn giản nhất)

1. Mở file: `backend/src/main/resources/application.properties`
2. Tìm dòng:
   ```properties
   spring.datasource.password=your_password_here
   ```
3. Thay `your_password_here` bằng password MySQL của bạn
4. Lưu file

## Cách 2: Sử dụng biến môi trường (Recommended cho Production)

### Windows PowerShell:

```powershell
# Set biến môi trường tạm thời (chỉ trong session hiện tại)
$env:DB_PASSWORD="your_mysql_password"
$env:DB_USERNAME="root"
$env:DB_NAME="webnhac"

# Chạy Spring Boot với biến môi trường
cd backend
mvn spring-boot:run
```

### Hoặc sử dụng file .env:

1. Sửa file `backend/.env`:
   ```env
   DB_PASSWORD=your_mysql_password
   ```

2. Cài đặt dotenv cho Maven (thêm vào pom.xml):
   ```xml
   <dependency>
       <groupId>io.github.cdimascio</groupId>
       <artifactId>dotenv-java</artifactId>
       <version>3.0.0</version>
   </dependency>
   ```

### Hoặc dùng IntelliJ IDEA / Eclipse:

**IntelliJ IDEA:**
1. Run > Edit Configurations
2. Chọn Spring Boot Application
3. Environment variables: `DB_PASSWORD=your_password;DB_USERNAME=root`
4. Apply > OK

**Eclipse:**
1. Run > Run Configurations
2. Environment tab
3. New > Name: DB_PASSWORD, Value: your_password
4. Apply > Run

## Cách 3: Tạo file application-local.properties

Tạo file `backend/src/main/resources/application-local.properties`:

```properties
spring.datasource.password=your_mysql_password
spring.datasource.username=root
```

Chạy với profile local:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## Kiểm tra kết nối

Sau khi cấu hình, chạy backend:

```bash
cd backend
mvn spring-boot:run
```

Nếu thành công, bạn sẽ thấy log:
```
Started WebNhacApplication in X.XXX seconds
HikariPool-1 - Starting...
HikariPool-1 - Start completed.
```

## Troubleshooting

### Lỗi "Access denied for user 'root'@'localhost'":
- Kiểm tra lại password MySQL
- Thử reset password MySQL

### Lỗi "Unknown database 'webnhac'":
- Kiểm tra database đã tạo chưa: `SHOW DATABASES;`
- Tạo lại: `CREATE DATABASE webnhac;`

### Lỗi "Communications link failure":
- Kiểm tra MySQL service đang chạy
- Kiểm tra port 3306 có đúng không

## Test Connection

Sau khi backend chạy thành công, test API:

```bash
# Test health check
curl http://localhost:8080/api/songs

# Hoặc mở browser:
# http://localhost:8080/api/songs
```

Bạn sẽ thấy danh sách bài hát từ database! 🎉
