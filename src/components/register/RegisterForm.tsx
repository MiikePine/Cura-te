"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@terapias/db/supabase";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PersonalInfoStep from "./PersonalInfoStep";
import ProfessionalProfileStep from "./ProfessionalProfileStep";
import PracticeDetailsStep from "./PracticeDetailsStep";
import Link from "next/link";

// Variantes de animação
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    title: "",
    location: "",
    bio: "" as string | null,
    experience: "" as string | null,
    languages: [] as string[],
    certifications: [] as string[],
    availability: [] as string[],
    image: "" as string | null,
    session_types: [] as { name: string; duration: string; price: string; description: string }[],
    lat: null as number | null,
    lng: null as number | null,
    next_available: null as string | null,
    price: "CHF 10/month" as string | null,
    rating: null as number | null,
    reviews: null as number | null,
    student_count: null as number | null,
    teaching_style: null as string | null,
    verified: false,
    featured: false,
    selectedTherapies: [] as string[],
  });
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Sincronizar estado com a sessão do Supabase
  useEffect(() => {
    const checkSession = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Erro ao verificar sessão inicial:", error);
        return;
      }
      if (sessionData.session) {
        setUserId(sessionData.session.user.id);
        setIsAuthenticated(true);
        console.log("Sessão inicial ativa:", sessionData.session.user.id);
      } else {
        console.log("Nenhuma sessão ativa no carregamento inicial.");
      }
    };
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUserId(session.user.id);
        setIsAuthenticated(true);
        console.log("AuthStateChange: Sessão ativa, userId:", session.user.id);
      } else {
        setUserId(null);
        setIsAuthenticated(false);
        console.log("AuthStateChange: Nenhuma sessão ativa.");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Funções para avançar/retroceder passos
  const nextStep = () => {
    console.log("Avançando para passo:", step + 1);
    setStep((prev) => Math.min(prev + 1, 3));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Atualizar formData
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: unknown } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(`formData atualizado - ${name}:`, value);
  };

  // Passo 1: Dados Pessoais e Autenticação
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("As passwords não coincidem.");
      return;
    }

    try {
      console.log("Iniciando signUp com email:", formData.email);
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { name: formData.name },
        },
      });

      if (signUpError) {
        console.error("Erro no signUp:", signUpError);
        throw signUpError;
      }

      if (!signUpData.user) {
        throw new Error("Nenhum utilizador retornado após registo.");
      }

      console.log("signUp bem-sucedido, user ID:", signUpData.user.id);

      // Login automático após signUp
      console.log("Tentando login automático...");
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (loginError) {
        console.error("Erro no login automático:", loginError);
        throw loginError;
      }

      if (!loginData.session) {
        throw new Error("Nenhuma sessão retornada após login automático.");
      }

      setUserId(loginData.session.user.id);
      setIsAuthenticated(true);
      console.log("Login automático bem-sucedido, user ID:", loginData.session.user.id);

      nextStep();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao criar conta";
      console.error("Erro no handleStep1Submit:", err);
      setError(errorMessage);
    }
  };

  // Passo 3: Finalizar o registo e inserir na tabela seller
  const handleStep3Submit = async () => {
    console.log("Iniciando handleStep3Submit...");
    console.log("Estado atual - userId:", userId, "isAuthenticated:", isAuthenticated);
    console.log("formData completo:", formData);

    if (!formData.image || formData.session_types.length === 0) {
      setError("Por favor, adicione uma foto de perfil e pelo menos um tipo de sessão.");
      console.log("Validação falhou: imagem ou session_types estão vazios.");
      return;
    }

    if (!userId || !isAuthenticated) {
      setError("Utilizador não autenticado. Por favor, complete o Passo 1 primeiro.");
      console.log("Autenticação falhou: userId ou isAuthenticated estão inválidos.");
      return;
    }

    try {
      // Inserir na tabela seller
      console.log("Inserindo dados na tabela seller para useruid:", userId);
      const { error: sellerError } = await supabase.from("seller").insert({
        useruid: userId,
        name: formData.name,
        email: formData.email,
        title: formData.title,
        location: formData.location,
        bio: formData.bio || null,
        experience: formData.experience || null,
        languages: formData.languages.length > 0 ? formData.languages : null,
        certifications: formData.certifications.length > 0 ? formData.certifications : null,
        availability: formData.availability.length > 0 ? formData.availability : null,
        image: formData.image,
        session_types: formData.session_types.length > 0 ? formData.session_types : null,
        lat: formData.lat,
        lng: formData.lng,
        next_available: formData.next_available,
        price: formData.price,
        rating: formData.rating,
        reviews: formData.reviews,
        student_count: formData.student_count,
        teaching_style: formData.teaching_style,
        verified: formData.verified,
        featured: formData.featured,
        created_at: new Date().toISOString(),
      });

      if (sellerError) {
        console.error("Erro ao inserir na tabela seller:", sellerError);
        throw sellerError;
      }

      console.log("Dados inseridos na tabela seller com sucesso para useruid:", userId);

      // Inserir terapias na tabela seller_therapies
      if (formData.selectedTherapies && formData.selectedTherapies.length > 0) {
        console.log("Processando terapias selecionadas:", formData.selectedTherapies);

        // Preparar os dados para inserção na tabela seller_therapies
        const sellerTherapies = formData.selectedTherapies.map((therapyId) => ({
          seller_id: userId,
          therapy_id: therapyId,
        }));

        console.log("Inserindo em seller_therapies:", sellerTherapies);

        const { error: sellerTherapiesError } = await supabase
          .from("seller_therapies")
          .insert(sellerTherapies);

        if (sellerTherapiesError) {
          console.error("Erro ao inserir em seller_therapies:", sellerTherapiesError);
          throw sellerTherapiesError;
        }

        console.log("Terapias inseridas com sucesso em seller_therapies.");
      }

      console.log("Registo concluído com sucesso para useruid:", userId);
      router.push("/myaccount");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao finalizar o registo";
      console.error("Erro no handleStep3Submit:", err);
      setError(errorMessage);
    }
  };

  useEffect(() => {
    console.log("Renderizando passo atual:", step);
    console.log("Estado atual - userId:", userId, "isAuthenticated:", isAuthenticated);
  }, [step, userId, isAuthenticated]); // Added userId and isAuthenticated to dependencies

  return (
    <div className="min-h-screen bg-[#F8F5F1] py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white rounded-xl p-8 shadow-lg border border-[#E8DED1]"
        >
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-1/3 h-2 rounded-full ${s <= step ? "bg-[#E6B17E]" : "bg-[#E8DED1]"}`}
              />
            ))}
          </div>

          {step === 1 && (
            <PersonalInfoStep
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleStep1Submit}
              error={error}
              setError={setError}
            />
          )}
          {step === 2 && (
            <ProfessionalProfileStep
              formData={formData}
              handleInputChange={handleInputChange}
              nextStep={nextStep}
              prevStep={prevStep}
              userId={userId}
              isAuthenticated={isAuthenticated}
              error={error}
              setError={setError}
            />
          )}
          {step === 3 && (
            <PracticeDetailsStep
              formData={formData}
              handleInputChange={handleInputChange}
              nextStep={handleStep3Submit}
              prevStep={prevStep}
              userId={userId}
              isAuthenticated={isAuthenticated}
              error={error}
              setError={setError}
            />
          )}
        </motion.div>

        <p className="text-center mt-6 text-[#7C9A92]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#E6B17E] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}