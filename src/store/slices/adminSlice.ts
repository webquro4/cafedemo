import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
  lastLogin?: string;
}

interface AdminState {
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
  sidebarOpen: boolean;
  activeTab: string;
  stats: {
    totalReservations: number;
    todayReservations: number;
    totalGuests: number;
    weeklyRevenue: number;
  };
}

const initialState: AdminState = {
  isAuthenticated: false,
  currentUser: null,
  sidebarOpen: true,
  activeTab: 'dashboard',
  stats: {
    totalReservations: 0,
    todayReservations: 0,
    totalGuests: 0,
    weeklyRevenue: 0,
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AdminUser>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    updateStats: (state, action: PayloadAction<Partial<AdminState['stats']>>) => {
      state.stats = { ...state.stats, ...action.payload };
    },
  },
});

export const {
  login,
  logout,
  toggleSidebar,
  setActiveTab,
  updateStats,
} = adminSlice.actions;

export default adminSlice.reducer;