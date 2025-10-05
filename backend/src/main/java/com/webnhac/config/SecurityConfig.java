package com.webnhac.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Tắt CSRF cho development
            .cors(cors -> {}) // Sử dụng CORS config từ CorsConfig
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // Cho phép TẤT CẢ request (development mode)
            )
            .httpBasic(httpBasic -> httpBasic.disable()) // Tắt HTTP Basic Auth
            .formLogin(form -> form.disable()); // Tắt Form Login
        
        return http.build();
    }
}
