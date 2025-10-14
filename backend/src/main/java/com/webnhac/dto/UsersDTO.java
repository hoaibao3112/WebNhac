package com.webnhac.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersDTO {
    private Long id;              // Khóa chính
    private String username;      // Tên đăng nhập
    private String email;         // Email người dùng
    private String passwordHash;  // Mật khẩu mã hóa
    private String fullName;      // Họ tên đầy đủ
    private String avatarUrl;     // Ảnh đại diện
    private Boolean isPremium;    // Có phải tài khoản premium không
    private String createdAt;     // Ngày tạo (ISO String hoặc định dạng timestamp)
}
