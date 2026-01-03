import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { AuthProvider } from "@/contexts/AuthContext";

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
          <PlayerProvider>
            <div className="flex h-screen bg-black">
              {/* Sidebar */}
              <Sidebar />
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <Header />
              
              {/* Main Content */}
              <main className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-800 to-zinc-900">
                {children}
              </main>
            </div>
          </div>
          </PlayerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
