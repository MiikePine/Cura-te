export interface Seller {
    id: number;
    name: string;
    branch: string;
    image: string;
  }
  
  export interface UserState {
    sellers: Seller[];
    // Outros dados do usuário que você possa ter
  }
  
  export interface RootState {
    user: UserState;
    // Outros slices de estado globais, se houver
  }