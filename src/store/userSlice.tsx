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
      state.user = action.payload; // Altera os dados do usuário
    },
    logout: (state) => {
      state.user = null; // Limpa os dados do usuário no logout
    },
    setSellers: (state, action) => {
      state.sellers = action.payload; // Altera os dados dos vendedores
    },
  },
});

export const { setUser, logout, setSellers } = userSlice.actions;
export default userSlice.reducer;
