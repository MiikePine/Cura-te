import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a interface para os dados do terapeuta (practitioner)
interface SessionType {
  name: string;
  duration: string;
  price: string;
  description: string;
}

interface Availability {
  timezone: string;
  hours: { day: string; time: string }[];
}

interface Testimonial {
  name: string;
  image: string;
  rating: number;
  date: string;
  text: string;
}

interface AuthState {
  user: {
    id: string;
    email: string;
    name: string | null;
    title: string | null;
    location: string | null;
    rating: number | null;
    reviews: number | null;
    verified: boolean | null;
    experience: string | null;
    image: string | null;
    cover_image: string | null;
    price: string | null;
    next_available: string | null;
    languages: string[] | null; // Alterado para um array de strings
    specialties: string[] | null; // Especialidades agora são um array de strings
    certifications: string[] | null; // Certificações agora são um array de strings
    about: string | null;
    approach: string | null;
    session_types: SessionType[] | null; // Agora um array de objetos de tipo SessionType
    availability: Availability | null;
    testimonials: Testimonial[] | null; // Agora um array de objetos de tipo Testimonial
    userUID: string | null;
  } | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        name: string | null;
        title: string | null;
        location: string | null;
        rating: number | null;
        reviews: number | null;
        verified: boolean | null;
        experience: string | null;
        image: string | null;
        cover_image: string | null;
        price: string | null;
        next_available: string | null;
        languages: string[] | null; // Alterado para um array de strings
        specialties: string[] | null; // Alterado para um array de strings
        certifications: string[] | null; // Alterado para um array de strings
        about: string | null;
        approach: string | null;
        session_types: SessionType[] | null; // Agora um array de objetos de tipo SessionType
        availability: Availability | null;
        testimonials: Testimonial[] | null; // Agora um array de objetos de tipo Testimonial
        userUID: string | null;
      }>
    ) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { setLoading, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
