package com.webnhac.service;

import com.webnhac.dto.RoomSyncMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class ListeningRoomService {

    private final RedisTemplate<String, Object> redisTemplate;
    
    private static final String ROOM_STATE_PREFIX = "room:state:";
    // Giữ trạng thái phòng trong 2 giờ
    private static final long ROOM_TIMEOUT_HOURS = 2;

    /**
     * Lưu trạng thái cuối cùng của một phòng (Host đang play bài nào, đến đâu).
     */
    public void saveRoomState(String roomId, RoomSyncMessage message) {
        String key = ROOM_STATE_PREFIX + roomId;
        // Ghi đè trạng thái cũ, và reset thời gian sống của phòng lên 2 tiếng
        redisTemplate.opsForValue().set(key, message);
        redisTemplate.expire(key, ROOM_TIMEOUT_HOURS, TimeUnit.HOURS);
        
        log.debug("Saved room state for roomId={}, action={}", roomId, message.getAction());
    }

    /**
     * Dành cho người dùng mới tham gia phòng, lấy trạng thái hiện tại để đồng bộ ngay.
     */
    public RoomSyncMessage getRoomState(String roomId) {
        String key = ROOM_STATE_PREFIX + roomId;
        Object state = redisTemplate.opsForValue().get(key);
        
        if (state instanceof RoomSyncMessage) {
            return (RoomSyncMessage) state;
        }
        return null; // Phòng chưa hoạt động hoặc đã hết hạn
    }
}
