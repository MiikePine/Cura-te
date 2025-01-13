import { supabase } from './supabase';

// Function to fetch therapists with "Shamanic Journeying" in specialties
export const fetchShamanicTherapists = async () => {
  try {
    // Realizando a consulta para terapeutas e suas especialidades
    const { data, error } = await supabase
      .from('specialties')
      .select('therapist_id, name')  // Seleciona o ID do terapeuta e o nome da especialidade
      .in('name', ['Shamanic Journeying', 'Ancestral Healing', 'Soul Recovery']); // Filtra as especialidades

    if (error) {
      console.error('Erro ao buscar terapeutas shamanic:', error.message);
      return { data: null, error };
    }

    // Coletando os IDs dos terapeutas com essas especialidades
    const therapistIds = data.map(item => item.therapist_id);

    // Buscando os terapeutas com base nos IDs coletados
    const { data: therapistsData, error: therapistsError } = await supabase
      .from('therapists')
      .select('*')
      .in('id', therapistIds);  // Filtra terapeutas que possuem as especialidades selecionadas

    if (therapistsError) {
      console.error('Erro ao buscar terapeutas:', therapistsError.message);
      return { data: null, error: therapistsError };
    }

    return { data: therapistsData, error: null };
  } catch (error) {
    console.error('Erro ao buscar terapeutas shamanic:', error);
    return { data: null, error };
  }
};