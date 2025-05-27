import { create } from 'zustand';
import { IUserState } from '@/interfaces/IGlobal';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  user: IUserState | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: IUserState, accessToken: string) => void;
  clearAuth: () => void;
  setAccessToken: (accessToken: string) => void;
}
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
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
        setAccessToken: (accessToken: string) => set((state) => ({ ...state, accessToken })),
      }),
      {
        name: 'auth-storage', // key name in localStorage
        // optionally serialize/deserialize or blacklist sensitive keys here
      },
    ),
    { name: 'AuthStore' },
  ),
);
