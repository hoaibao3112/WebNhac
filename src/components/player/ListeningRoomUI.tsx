"use client";

import { useState } from "react";
import { useListeningRoom } from "@/contexts/ListeningRoomContext";
import { Headphones, Users, Check, Copy, LogOut, Radio } from "lucide-react";

export default function ListeningRoomUI() {
  const { roomId, isHost, isConnected, createRoom, joinRoom, leaveRoom } = useListeningRoom();
  const [isOpen, setIsOpen] = useState(false);
  const [joinId, setJoinId] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinId.trim()) {
      joinRoom(joinId.trim());
      setJoinId("");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center p-2 rounded-full transition-colors ${
          isConnected ? "text-green-400 bg-green-400/10" : "text-gray-400 hover:text-white"
        }`}
        title="Listening Room"
      >
        <Headphones className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-4 w-72 bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-[60]">
          <div className="p-4 bg-zinc-800/80 border-b border-zinc-700">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Radio className="w-4 h-4 text-purple-400" />
              Party Stream
            </h3>
            <p className="text-xs text-zinc-400 mt-1">Nghe nhạc đồng bộ cùng bạn bè</p>
          </div>

          <div className="p-4">
            {isConnected ? (
              <div className="space-y-4">
                <div className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-700/50">
                  <div className="text-xs text-zinc-400 mb-1">Room ID</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-mono text-white tracking-widest">{roomId}</span>
                    <button
                      onClick={handleCopy}
                      className="p-1.5 hover:bg-zinc-700 rounded-md text-zinc-400 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-zinc-400" />
                  <span className={isHost ? "text-purple-400 font-medium" : "text-zinc-300"}>
                    {isHost ? "Bạn là Trưởng phòng" : "Bạn đang nghe ké"}
                  </span>
                </div>

                <button
                  onClick={leaveRoom}
                  className="w-full py-2 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Rời phòng
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={createRoom}
                  className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
                >
                  <Radio className="w-4 h-4" /> Tạo phòng mới
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-zinc-700"></div>
                  <span className="flex-shrink-0 mx-4 text-zinc-500 text-xs uppercase">hoặc</span>
                  <div className="flex-grow border-t border-zinc-700"></div>
                </div>

                <form onSubmit={handleJoin} className="flex gap-2">
                  <input
                    type="text"
                    value={joinId}
                    onChange={(e) => setJoinId(e.target.value.toUpperCase())}
                    placeholder="Nhập Room ID..."
                    className="flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors uppercase"
                    maxLength={10}
                  />
                  <button
                    type="submit"
                    disabled={!joinId.trim()}
                    className="px-4 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Vào
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
