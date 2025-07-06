import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

const api = axios.create({
  baseURL: 'http://localhost:8082/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: async (username: string, password: string) => {
        try {
          const response = await api.post('/auth/login', { username, password });
          const { token } = response.data;
          
          set({
            token,
            isAuthenticated: true,
            user: { username } // You might want to fetch more user details here
          });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },
      register: async (userData: RegisterData) => {
        try {
          await api.post('/auth/register', userData);
          // After successful registration, you might want to automatically log in the user
          await useAuthStore.getState().login(userData.username, userData.password);
        } catch (error) {
          console.error('Registration failed:', error);
          throw error;
        }
      },
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// Export the API instance for use in other services
export { api }; 