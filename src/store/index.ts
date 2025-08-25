import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './slices/reservationSlice';
import menuReducer from './slices/menuSlice';
import adminReducer from './slices/adminSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    reservation: reservationReducer,
    menu: menuReducer,
    admin: adminReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;