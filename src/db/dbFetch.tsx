import { supabase } from './supabase';  // A importação do seu cliente Supabase

// Função para registro de usuário
export async function signupWithEmail(email: string, password: string) {
  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Erro no signup:", error.message);

      throw error;
    }

    return user; // Retorna o usuário registrado
  } catch (error: any) {
    console.error("Erro inesperado ao tentar registrar:", error.message);

    return { error: error.message };
  }
}

// Função para login com email e senha
export async function loginWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    return { error: error.message };
  }
}

// Função para adicionar vendedor
export const addSeller = async (name: string, email: string, availability: any) => {
  try {
    const { data, error } = await supabase
      .from('seller')
      .insert([{ name, email, availability }]);

    if (error) {
      console.error("Erro ao adicionar vendedor:", error.message);
      throw new Error(error.message);
    }

    return data; // Dados retornados do Supabase, se necessário
  } catch (error) {
    console.error("Erro inesperado ao adicionar vendedor:", error);
    throw new Error('Erro ao adicionar vendedor');
  }
};