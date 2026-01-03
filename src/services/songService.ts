import { api } from '@/lib/api';

export interface Song {
  id: number;
  title: string;
  duration: number;
  fileUrl: string;
  coverImageUrl: string;
  playCount: number;
  likeCount: number;
  releaseDate: string;
  isPremium: boolean;
  lyrics?: string;
  syncedLyrics?: string;
  artists: Artist[];
  genres: Genre[];
  album?: Album;
}

export interface Artist {
  id: number;
  name: string;
  avatarUrl: string;
  verified: boolean;
}

export interface Genre {
  id: number;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface Album {
  id: number;
  title: string;
  coverImageUrl: string;
  releaseDate: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: string;
}

export const songService = {
  // Lấy danh sách bài hát
  getAll: async (params?: {
    page?: number;
    size?: number;
    sortBy?: string;
    direction?: 'ASC' | 'DESC';
  }): Promise<PageResponse<Song>> => {
    const response = await api.get<any, ApiResponse<PageResponse<Song>>>('/songs', { params });
    return response.data;
  },

  // Lấy chi tiết bài hát
  getById: async (id: number): Promise<Song> => {
    const response = await api.get<any, ApiResponse<Song>>(`/songs/${id}`);
    return response.data;
  },

  // Tìm kiếm bài hát
  search: async (query: string, page = 0, size = 20): Promise<PageResponse<Song>> => {
    const response = await api.get<any, ApiResponse<PageResponse<Song>>>('/songs/search', {
      params: { q: query, page, size }
    });
    return response.data;
  },

  // Lấy bài hát trending
  getTrending: async (page = 0, size = 20): Promise<PageResponse<Song>> => {
    const response = await api.get<any, ApiResponse<PageResponse<Song>>>('/songs/trending', {
      params: { page, size }
    });
    return response.data;
  },

  // Phát bài hát (tăng play count)
  play: async (id: number): Promise<void> => {
    await api.post(`/songs/${id}/play`);
  },

  // Like bài hát
  like: async (id: number): Promise<void> => {
    await api.post(`/songs/${id}/like`);
  },

  // Unlike bài hát
  unlike: async (id: number): Promise<void> => {
    await api.delete(`/songs/${id}/like`);
  },

  // Lấy danh sách bài hát yêu thích
  getFavorites: async (userId: number = 1, page = 0, size = 20): Promise<PageResponse<Song>> => {
    const response = await api.get<any, ApiResponse<PageResponse<Song>>>('/songs/favorites', {
      params: { userId, page, size }
    });
    return response.data;
  },

  // Unlike bài hát
  unlike: async (id: number): Promise<void> => {
    await api.delete(`/songs/${id}/like`);
  },
};
