// therapistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Therapist {
  id: string;
  email: string | null;
  price: number | null;
  name: string | null;
  title: string | null;
  location: string | null;
  rating: number | null;
  reviews: number | null;
  verified: boolean | null;
  experience: string | null;
  userUID: string | null;
}

interface TherapistState {
  therapists: Therapist[];
}

const initialState: TherapistState = {
  therapists: [],
};

const therapistSlice = createSlice({
  name: 'therapists',
  initialState,
  reducers: {
    setTherapists(state, action: PayloadAction<Therapist[]>) {
      state.therapists = action.payload;
    },
  },
});

export const { setTherapists } = therapistSlice.actions;
export default therapistSlice.reducer;
