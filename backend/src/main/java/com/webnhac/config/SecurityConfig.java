package com.webnhac.config;

import com.webnhac.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Tắt CSRF (dùng JWT nên không cần)
            .csrf(csrf -> csrf.disable())

            // CORS từ CorsConfig
            .cors(cors -> {})

            // Stateless - không dùng session
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // Phân quyền endpoint
            .authorizeHttpRequests(auth -> auth

                // ── Public endpoints ─────────────────────────────────────────
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/ping").permitAll()
                .requestMatchers("/ws/**").permitAll() // WebSocket endpoint
                .requestMatchers("/rooms/**").permitAll() // REST Room endpoints

                // Songs: GET public, POST/DELETE cần auth
                .requestMatchers(HttpMethod.GET, "/songs/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/artists/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/comments/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/songs/*/play").permitAll()

                // ── Authenticated endpoints ──────────────────────────────────
                // Like, comment cần đăng nhập
                .requestMatchers(HttpMethod.POST, "/songs/*/like").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/songs/*/like").authenticated()
                .requestMatchers(HttpMethod.POST, "/comments/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/comments/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/comments/**").authenticated()

                // Tất cả request còn lại cần auth
                .anyRequest().authenticated()
            )

            // Tắt HTTP Basic và Form Login
            .httpBasic(httpBasic -> httpBasic.disable())
            .formLogin(form -> form.disable())

            // Đăng ký authentication provider
            .authenticationProvider(authenticationProvider())

            // Thêm JWT filter TRƯỚC UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // ─── Beans ───────────────────────────────────────────────────────────────

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
