import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  mobileMenuOpen: boolean;
  selectedGalleryImage: string | null;
  lightboxOpen: boolean;
  isLoading: boolean;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
    timestamp: number;
  }>;
}

const initialState: UiState = {
  mobileMenuOpen: false,
  selectedGalleryImage: null,
  lightboxOpen: false,
  isLoading: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    openLightbox: (state, action: PayloadAction<string>) => {
      state.selectedGalleryImage = action.payload;
      state.lightboxOpen = true;
    },
    closeLightbox: (state) => {
      state.lightboxOpen = false;
      state.selectedGalleryImage = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addNotification: (state, action: PayloadAction<{ type: 'success' | 'error' | 'info'; message: string }>) => {
      const notification = {
        id: Date.now().toString(),
        ...action.payload,
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  openLightbox,
  closeLightbox,
  setLoading,
  addNotification,
  removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;