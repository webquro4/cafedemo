import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ReservationData {
  id?: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

interface ReservationState {
  isModalOpen: boolean;
  reservations: ReservationData[];
  currentReservation: Partial<ReservationData>;
  isSubmitting: boolean;
}

const initialState: ReservationState = {
  isModalOpen: false,
  reservations: [],
  currentReservation: {},
  isSubmitting: false,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    openReservationModal: (state) => {
      state.isModalOpen = true;
      state.currentReservation = {};
    },
    closeReservationModal: (state) => {
      state.isModalOpen = false;
      state.currentReservation = {};
    },
    updateReservationData: (state, action: PayloadAction<Partial<ReservationData>>) => {
      state.currentReservation = { ...state.currentReservation, ...action.payload };
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    addReservation: (state, action: PayloadAction<ReservationData>) => {
      state.reservations.push(action.payload);
    },
    updateReservation: (state, action: PayloadAction<ReservationData>) => {
      const index = state.reservations.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.reservations[index] = action.payload;
      }
    },
    removeReservation: (state, action: PayloadAction<string>) => {
      state.reservations = state.reservations.filter(r => r.id !== action.payload);
    },
  },
});

export const {
  openReservationModal,
  closeReservationModal,
  updateReservationData,
  setSubmitting,
  addReservation,
  updateReservation,
  removeReservation,
} = reservationSlice.actions;

export default reservationSlice.reducer;