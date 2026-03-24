package com.webnhac.controller;

import com.webnhac.dto.*;
import com.webnhac.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    /**
     * POST /api/auth/register
     * Tạo tài khoản mới, trả về access token ngay
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request) {
        log.info("POST /api/auth/register - username: {}", request.getUsername());
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response));
    }

    /**
     * POST /api/auth/login
     * Đăng nhập, trả về access token + refresh token
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request) {
        log.info("POST /api/auth/login - username: {}", request.getUsername());
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * POST /api/auth/refresh
     * Đổi refresh token lấy access token mới
     */
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(
            @Valid @RequestBody RefreshTokenRequest request) {
        log.info("POST /api/auth/refresh");
        AuthResponse response = authService.refreshToken(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * GET /api/auth/me
     * Lấy thông tin user đang đăng nhập (cần Bearer token)
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<AuthResponse>> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        log.info("GET /api/auth/me - username: {}", username);
        AuthResponse response = authService.getCurrentUser(username);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * POST /api/auth/logout
     * Client-side logout: frontend xóa token khỏi storage.
     * Server không cần làm gì thêm (stateless JWT).
     * Nếu muốn blacklist token, cần thêm Redis.
     */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        log.info("POST /api/auth/logout");
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully"));
    }
}
