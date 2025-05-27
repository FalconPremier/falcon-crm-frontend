import { create } from 'zustand';
import { IUserState } from '@/interfaces/IGlobal';

interface AuthState {
  user: IUserState | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: IUserState, accessToken: string) => void;
  clearAuth: () => void;
  setAccessToken: (accessToken: string) => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setAuth: (user, accessToken) =>
    set({
      user,
      accessToken,
      isAuthenticated: true,
    }),
  clearAuth: () => set({ user: null, accessToken: null, isAuthenticated: false }),
  setAccessToken: (accessToken: string) => set((state) => ({ ...state, accessToken: accessToken })),
}));
