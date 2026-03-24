import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ListeningRoomProvider } from "@/contexts/ListeningRoomContext";

export const metadata: Metadata = {
  title: "WebNhac - Nghe nhạc trực tuyến",
  description: "Nền tảng nghe nhạc trực tuyến hàng đầu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
          <ListeningRoomProvider>
            <PlayerProvider>
              <div className="flex h-screen bg-[#050505] text-white selection:bg-purple-500/30">
                {/* Sidebar */}

                <Sidebar />
              
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <Header />
                
                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-zinc-900/50 via-[#0a0a0a] to-black relative">
                  {/* Blurred background accents for immersive feel */}
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

                  <div className="relative z-0">
                    {children}
                  </div>
                </main>
              </div>
            </div>
            </PlayerProvider>
          </ListeningRoomProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
