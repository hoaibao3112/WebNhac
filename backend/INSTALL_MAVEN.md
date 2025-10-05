# Hướng dẫn cài đặt Maven trên Windows

## Cách 1: Dùng Chocolatey (Nhanh nhất)

### Bước 1: Cài Chocolatey (nếu chưa có)
Mở PowerShell **AS ADMINISTRATOR** và chạy:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### Bước 2: Cài Maven
```powershell
choco install maven -y
```

### Bước 3: Kiểm tra
Đóng PowerShell và mở lại, chạy:
```powershell
mvn --version
```

## Cách 2: Download thủ công

### Bước 1: Download Maven
1. Truy cập: https://maven.apache.org/download.cgi
2. Download file: **apache-maven-3.9.5-bin.zip**

### Bước 2: Giải nén
1. Giải nén vào: `C:\Program Files\Apache\Maven`
2. Đường dẫn cuối cùng: `C:\Program Files\Apache\Maven\apache-maven-3.9.5`

### Bước 3: Thêm vào PATH
1. Mở **System Properties**:
   - Windows + R
   - Gõ: `sysdm.cpl`
   - Enter

2. **Advanced** tab > **Environment Variables**

3. Trong **System variables**:
   - Tìm biến **Path**
   - Click **Edit**
   - Click **New**
   - Thêm: `C:\Program Files\Apache\Maven\apache-maven-3.9.5\bin`
   - Click **OK** cho tất cả

4. Tạo biến mới **MAVEN_HOME**:
   - Click **New** trong System variables
   - Variable name: `MAVEN_HOME`
   - Variable value: `C:\Program Files\Apache\Maven\apache-maven-3.9.5`
   - Click **OK**

### Bước 4: Kiểm tra
Mở PowerShell MỚI:
```powershell
mvn --version
```

Kết quả mong đợi:
```
Apache Maven 3.9.5
Maven home: C:\Program Files\Apache\Maven\apache-maven-3.9.5
Java version: 17.0.x
```

## Sau khi cài Maven thành công

```powershell
cd C:\WebNhac\backend
mvn spring-boot:run
```

## Nếu lỗi "JAVA_HOME not found"

### Bước 1: Cài Java JDK 17
```powershell
# Dùng Chocolatey
choco install openjdk17 -y

# HOẶC download từ:
# https://www.oracle.com/java/technologies/downloads/#java17
```

### Bước 2: Thêm JAVA_HOME
1. Mở Environment Variables (như trên)
2. Tạo biến mới **JAVA_HOME**:
   - Variable name: `JAVA_HOME`
   - Variable value: `C:\Program Files\Java\jdk-17`
3. Thêm vào **Path**: `%JAVA_HOME%\bin`

### Bước 3: Kiểm tra
```powershell
java -version
```

## TÓM TẮT: Lệnh cài nhanh (PowerShell as Admin)

```powershell
# Cài Chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Cài Java và Maven
choco install openjdk17 maven -y

# Đóng và mở lại PowerShell, kiểm tra
java -version
mvn --version

# Chạy backend
cd C:\WebNhac\backend
mvn spring-boot:run
```

Xong! 🎉
