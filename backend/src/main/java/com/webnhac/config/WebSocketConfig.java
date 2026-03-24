package com.webnhac.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Cho phép frontend nextjs connect tới endpoint này (hỗ trợ fallback nếu websocket bị chặn)
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*") 
                // Có thể lock down setAllowedOrigins("http://localhost:3000") trong production
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Prefix cho các message client gửi LÊN server
        registry.setApplicationDestinationPrefixes("/app");
        // Prefix cho các message server GỬI XUỐNG clients đang đăng ký
        registry.enableSimpleBroker("/topic");
    }
}
