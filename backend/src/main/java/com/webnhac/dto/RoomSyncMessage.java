package com.webnhac.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomSyncMessage {
    private String roomId;
    private Long songId;
    private Double currentTime; // Tiến độ bài hát (giây)
    private String action;      // PLAY, PAUSE, SEEK, CHANGE_SONG
    private String senderId;    // Id/Username của người gửi action này
    private Long timestamp;     // System time của Backend lúc nhận message, dùng cho frontend để tính latency bù trừ.
}
