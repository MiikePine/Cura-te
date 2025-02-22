// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Dados do usuário (login)
  sellers: [], // Dados da tabela 'seller'
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.sellers = [];
    },
    setSellers: (state, action) => {
      state.sellers = action.payload; // Expects action.payload to be Seller[]
    },
  },
});

export const { setUser, logout, setSellers } = userSlice.actions;
export default userSlice.reducer;
