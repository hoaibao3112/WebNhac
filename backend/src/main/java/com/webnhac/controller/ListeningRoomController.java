package com.webnhac.controller;

import com.webnhac.dto.ApiResponse;
import com.webnhac.dto.RoomSyncMessage;
import com.webnhac.service.ListeningRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ListeningRoomController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ListeningRoomService roomService;

    /**
     * Lắng nghe Client nhắn qua WebSocket: /app/room/{roomId}/sync
     * Dùng STOMP (Simple Text Oriented Message Protocol).
     */
    @MessageMapping("/room/{roomId}/sync")
    public void syncRoomPlayback(@DestinationVariable String roomId, RoomSyncMessage message) {
        
        // 1. Gắn Timestamp của Server để loại bỏ sự sai lệch đồng hồ của Client.
        // Frontend sẽ dùng = Date.now() - message.timestamp = độ trễ ping
        message.setTimestamp(System.currentTimeMillis());
        
        log.debug("Received WS Sync from {} for room {}, action: {}, offset: {}", 
                 message.getSenderId(), roomId, message.getAction(), message.getCurrentTime());

        // 2. Lưu trạng thái này xuống Redis cho late joiners
        roomService.saveRoomState(roomId, message);

        // 3. Broadcast sự kiện tới toàn bộ người theo dõi (Subscriber) topic
        // Client sẽ nhận được qua việc subscribe url: /topic/room/{roomId}
        messagingTemplate.convertAndSend("/topic/room/" + roomId, message);
    }

    /**
     * REST API cho những người dùng VỪA MỚI VÀO PHÒNG lấy trạng thái cuối cùng ngay lập tức.
     */
    @GetMapping("/rooms/{roomId}/state")
    public ResponseEntity<ApiResponse<RoomSyncMessage>> getRoomState(@PathVariable String roomId) {
        log.info("GET /api/rooms/{}/state", roomId);
        RoomSyncMessage currentState = roomService.getRoomState(roomId);
        
        if (currentState != null) {
            return ResponseEntity.ok(ApiResponse.success(currentState));
        } else {
            return ResponseEntity.ok(ApiResponse.success(null));
        }
    }
}
