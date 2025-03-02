import { supabase } from './supabase';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { Tables } from '../../supabase/database.types';

interface Availability {
  startTime: string;
  endTime: string;
}

interface LoginResponse {
  user?: SupabaseUser;
  session?: Session;
  error?: string;
}

export async function signupWithEmail(email: string, password: string): Promise<{ user?: SupabaseUser; error?: string }> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Erro no signup:", error.message);
      return { error: error.message };
    }

    return { user: data.user ?? undefined };
  } catch (error: unknown) {
    console.error("Erro inesperado ao tentar registrar:", error);
    return { error: error instanceof Error ? error.message : "Erro desconhecido" };
  }
}

export async function loginWithEmail(email: string, password: string): Promise<LoginResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    return { user: data.user ?? undefined, session: data.session ?? undefined };
  } catch (error: unknown) {
    console.error("Erro inesperado durante o login:", error);
    return { error: error instanceof Error ? error.message : "Erro inesperado durante o login" };
  }
}

export const addSeller = async (name: string, email: string, availability: Availability): Promise<Tables<'seller'> | { error: string }> => {
  try {
    const { data, error } = await supabase
      .from('seller')
      .insert([{ name, email, availability: [availability.startTime, availability.endTime] }]) // Ajuste para string[]
      .select()
      .single();

    if (error) {
      console.error("Erro ao adicionar vendedor:", error.message);
      return { error: error.message };
    }

    return data as Tables<'seller'>;
  } catch (error: unknown) {
    console.error("Erro inesperado ao adicionar vendedor:", error);
    return { error: error instanceof Error ? error.message : "Erro ao adicionar vendedor" };
  }
};