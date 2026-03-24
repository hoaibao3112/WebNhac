"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuth } from './AuthContext';

interface RoomSyncMessage {
  roomId: string;
  songId?: number;
  currentTime: number;
  action: 'PLAY' | 'PAUSE' | 'SEEK' | 'CHANGE_SONG';
  senderId: string;
  timestamp: number;
}

interface ListeningRoomContextType {
  roomId: string | null;
  isHost: boolean;
  isConnected: boolean;
  createRoom: () => void;
  joinRoom: (id: string) => void;
  leaveRoom: () => void;
  broadcastAction: (action: 'PLAY' | 'PAUSE' | 'SEEK' | 'CHANGE_SONG', currentTime: number, songId?: number) => void;
  incomingAction: RoomSyncMessage | null; // Dùng để AudioPlayer phản ứng
}

const ListeningRoomContext = createContext<ListeningRoomContextType | undefined>(undefined);

export const ListeningRoomProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [incomingAction, setIncomingAction] = useState<RoomSyncMessage | null>(null);
  
  const stompClientRef = useRef<Client | null>(null);
  // Tạo 1 sender ID random nếu user không login
  const senderId = useRef(user?.id ? user.id.toString() : Math.random().toString(36).substring(7)).current;

  // Cleanup effect
  useEffect(() => {
    return () => {
      leaveRoom();
    };
  }, []);

  const connectToRoom = (id: string, hostMode: boolean) => {
    if (stompClientRef.current?.connected) {
      stompClientRef.current.deactivate();
    }

    const client = new Client({
      // WebSocket endpoint từ BE Spring Boot
      webSocketFactory: () => new SockJS('http://localhost:8080/api/ws'),
      debug: (str) => {
        console.log('STOMP: ' + str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected to Listening Room:', id);
        setIsConnected(true);
        setRoomId(id);
        setIsHost(hostMode);

        // Subscribe vào Topic của Room
        client.subscribe(`/topic/room/${id}`, (message) => {
          const syncData: RoomSyncMessage = JSON.parse(message.body);
          
          // Không phản ứng với tín hiệu do chính mình gửi đi
          if (syncData.senderId !== senderId) {
             setIncomingAction(syncData);
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        setIsConnected(false);
      },
      onWebSocketClose: () => {
        setIsConnected(false);
      }
    });

    client.activate();
    stompClientRef.current = client;
  };

  const createRoom = () => {
    // Generate random room ID (có thể đẩy lên BE sinh sau)
    const newRoomId = Math.random().toString(36).substring(2, 9).toUpperCase();
    connectToRoom(newRoomId, true);
  };

  const joinRoom = (id: string) => {
    connectToRoom(id.toUpperCase(), false);
  };

  const leaveRoom = () => {
    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
      stompClientRef.current = null;
    }
    setRoomId(null);
    setIsHost(false);
    setIsConnected(false);
    setIncomingAction(null);
  };

  const broadcastAction = (action: 'PLAY' | 'PAUSE' | 'SEEK' | 'CHANGE_SONG', currentTime: number, songId?: number) => {
    // Chỉ Host gửi đi action tới mọi người (ngoại trừ ai cũng có quyền điều khiển thì bỏ điều kiện `!isHost` này)
    if (!roomId || !isConnected || !stompClientRef.current || !stompClientRef.current.connected) return;

    const message: RoomSyncMessage = {
      roomId,
      songId: songId,
      currentTime,
      action,
      senderId,
      timestamp: Date.now()
    };

    stompClientRef.current.publish({
      destination: `/app/room/${roomId}/sync`,
      body: JSON.stringify(message)
    });
  };

  return (
    <ListeningRoomContext.Provider value={{ 
      roomId, 
      isHost, 
      isConnected, 
      createRoom, 
      joinRoom, 
      leaveRoom,
      broadcastAction,
      incomingAction
    }}>
      {children}
    </ListeningRoomContext.Provider>
  );
};

export const useListeningRoom = () => {
  const context = useContext(ListeningRoomContext);
  if (context === undefined) {
    throw new Error('useListeningRoom must be used within ListeningRoomProvider');
  }
  return context;
};
