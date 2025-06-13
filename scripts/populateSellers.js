import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file in project root
dotenv.config({ path: '../.env' });

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://iahnomwrnwnbuyswfzas.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY is not set in .env file');
  process.exit(1);
}
if (!supabaseUrl) {
  console.error('SUPABASE_URL is not set in .env file');
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to generate random data
function generateRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Dummy data pools
const names = [
  'Ana Silva', 'João Pereira', 'Maria Santos', 'Pedro Costa', 'Sofia Oliveira',
  'Lucas Ferreira', 'Beatriz Almeida', 'Miguel Souza', 'Carolina Lima', 'Rafael Mendes',
  'Laura Martins', 'Gabriel Rocha', 'Isabela Dias', 'Felipe Correia', 'Juliana Barbosa',
  'André Carvalho', 'Camila Ribeiro', 'Daniel Castro', 'Fernanda Gomes', 'Thiago Araujo',
  'Clara Vieira', 'Bruno Lopes', 'Mariana Freire', 'Gustavo Pinto', 'Letícia Duarte'
];

const locations = [
  'Zurich, Switzerland', 'Geneva, Switzerland', 'Lausanne, Switzerland',
  'Bern, Switzerland', 'Basel, Switzerland', 'Lugano, Switzerland',
  'Lucerne, Switzerland', 'St. Gallen, Switzerland', 'Fribourg, Switzerland',
  'Winterthur, Switzerland'
];

const languages = ['Português', 'Inglês', 'Espanhol', 'Francês', 'Alemão'];
const certifications = [
  'Reiki Nível I', 'Reiki Nível II', 'Reiki Nível III', 'Yoga 200h',
  'Yoga 500h', 'Meditação Mindfulness', 'Terapia Holística',
  'Aromaterapia Certificada', 'Reflexologia Nível I',
  'Terapia de Som com Taças Tibetanas', 'Certificação em Ayurveda',
  'Prática de Qigong', 'Massagem Terapêutica'
];
const availability = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
const teachingStyles = ['Gentil e Intuitivo', 'Estruturado e Técnico', 'Energético e Dinâmico', 'Calmo e Meditativo'];
const sessionTypes = [
  { name: 'Sessão Individual', duration: '60 minutos', price: '50 CHF', description: 'Sessão personalizada de terapia.' },
  { name: 'Sessão em Grupo', duration: '90 minutos', price: '30 CHF', description: 'Sessão de terapia em grupo.' }
];

// Function to retrieve therapies from the database
async function getTherapies() {
  try {
    const { data: therapies, error: fetchError } = await supabase
      .from('therapies')
      .select('id, name');

    if (fetchError) throw fetchError;

    if (!therapies || therapies.length === 0) {
      console.warn('Nenhuma terapia encontrada na tabela therapies. Usando fallback.');
      return [{ id: 'fallback-uuid', name: 'Terapia Genérica' }]; // Fallback to avoid errors
    }

    return therapies;
  } catch (error) {
    console.error('Erro ao buscar terapias:', error);
    throw error;
  }
}

// Function to generate a single seller profile
function generateSeller(index) {
  const email = `${index + 1}@w.h`;
  return {
    name: generateRandomItem(names),
    email: email,
    title: `${generateRandomItem(['Terapeuta de Reiki', 'Instrutor de Yoga', 'Guia de Meditação', 'Terapeuta Holístico'])}`,
    image: 'https://via.placeholder.com/150',
    rating: Math.random() * 2 + 3, // Rating between 3 and 5
    reviews: Math.floor(Math.random() * 50),
    location: generateRandomItem(locations),
    languages: [generateRandomItem(languages), generateRandomItem(languages)].filter((v, i, a) => a.indexOf(v) === i),
    experience: `${Math.floor(Math.random() * 10) + 1} anos de experiência em práticas holísticas.`,
    certifications: [generateRandomItem(certifications), generateRandomItem(certifications)].filter((v, i, a) => a.indexOf(v) === i),
    availability: [generateRandomItem(availability), generateRandomItem(availability)].filter((v, i, a) => a.indexOf(v) === i),
    price: '50 CHF/hora',
    bio: `Apaixonado por ajudar pessoas a encontrar equilíbrio e bem-estar através de ${generateRandomItem(['Reiki', 'Yoga', 'Meditação', 'Terapias Holísticas'])}.`,
    teaching_style: generateRandomItem(teachingStyles),
    next_available: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    verified: Math.random() > 0.5,
    featured: Math.random() > 0.8,
    student_count: Math.floor(Math.random() * 100),
    session_types: sessionTypes,
    lat: 46.8 + Math.random() * 1.5, // Latitude aproximada para Suíça
    lng: 6.6 + Math.random() * 2.5,  // Longitude aproximada para Suíça
  };
}

// Main function to create 50 seller profiles
async function populateSellers() {
  try {
    // Retrieve therapies from the therapies table
    const therapies = await getTherapies();
    const therapyIds = therapies.map(t => t.id);

    // Generate 50 sellers
    for (let i = 0; i < 50; i++) {
      const seller = generateSeller(i);

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: seller.email,
        password: '999999999',
        email_confirm: true,
        user_metadata: { name: seller.name }
      });

      if (authError) {
        console.error(`Erro ao criar usuário ${seller.email}:`, authError);
        continue;
      }

      const userId = authData.user.id;
      console.log(`Usuário criado: ${seller.email}, ID: ${userId}`);

      // Insert into seller table
      const { error: sellerError } = await supabase.from('seller').insert({
        useruid: userId,
        name: seller.name,
        email: seller.email,
        title: seller.title,
        image: seller.image,
        rating: seller.rating,
        reviews: seller.reviews,
        location: seller.location,
        languages: seller.languages,
        experience: seller.experience,
        certifications: seller.certifications,
        availability: seller.availability,
        price: seller.price,
        bio: seller.bio,
        teaching_style: seller.teaching_style,
        next_available: seller.next_available,
        verified: seller.verified,
        featured: seller.featured,
        student_count: seller.student_count,
        session_types: sessionTypes,
        lat: seller.lat,
        lng: seller.lng,
        created_at: new Date().toISOString()
      });

      if (sellerError) {
        console.error(`Erro ao inserir vendedor ${seller.email}:`, sellerError);
        continue;
      }

      // Associate seller with 1-3 therapies randomly
      const numTherapies = Math.floor(Math.random() * 3) + 1;
      const selectedTherapyIds = [];
      for (let j = 0; j < numTherapies; j++) {
        selectedTherapyIds.push(generateRandomItem(therapyIds));
      }
      const uniqueTherapyIds = [...new Set(selectedTherapyIds)];

      const sellerTherapies = uniqueTherapyIds.map(therapyId => ({
        seller_id: userId,
        therapy_id: therapyId
      }));

      const { error: sellerTherapiesError } = await supabase
        .from('seller_therapies')
        .insert(sellerTherapies);

      if (sellerTherapiesError) {
        console.error(`Erro ao associar terapias para ${seller.email}:`, sellerTherapiesError);
        continue;
      }

      console.log(`Vendedor ${seller.name} (${seller.email}) inserido com sucesso com ${uniqueTherapyIds.length} terapias.`);
    }

    console.log('População de 50 vendedores concluída com sucesso.');
  } catch (error) {
    console.error('Erro durante a população dos vendedores:', error);
  }
}

// Execute the function
populateSellers().then(() => process.exit(0)).catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});