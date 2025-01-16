// store.ts ou redux store setup
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Importando seu slice de usuários

export const store = configureStore({
  reducer: {
    user: userReducer, // Certificando-se de que o estado do usuário está correto
  },
});

export type RootState = ReturnType<typeof store.getState>; // Define o tipo do estado global
export type AppDispatch = typeof store.dispatch; // 