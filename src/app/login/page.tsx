"use client";

import React, { useState } from "react";
import { supabase } from "../../db/supabase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import Link from "next/link";
import Image from "next/image";
import { Lock, User, ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (data?.user) {
        dispatch(
          loginSuccess({
            id: data.user.id,
            email: data.user.email!,
            price: data.user.price
          })
        );
      }
    } catch (error) {
      setErrorMessage("Erro ao tentar fazer login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F5F1] to-[#E8DED1]">
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C9A92]/10 to-[#4A6670]/10 pattern-grid-lg opacity-30" />
        
        <div className="relative w-full max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center gap-12">
          {/* Left Side - Hero Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-[#4A6670] mb-6 leading-tight">
              Bem-vindo de volta à sua
              <span className="text-[#7C9A92] block">jornada de bem-estar</span>
            </h1>
            <p className="text-lg text-gray-600 md:max-w-md">
              Continue sua jornada para uma vida mais saudável e equilibrada. Estamos aqui para apoiar cada passo seu.
            </p>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-[450px]">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold text-[#4A6670] mb-6">Login</h2>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  {/* Email Input */}
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#7C9A92] transition-colors group-focus-within:text-[#4A6670]" />
                    <input
                      type="email"
                      placeholder="Seu email"
                      className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl text-[#4A6670] placeholder-[#7C9A92]/60 border border-[#7C9A92]/20 focus:outline-none focus:ring-2 focus:ring-[#7C9A92]/50 transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#7C9A92] transition-colors group-focus-within:text-[#4A6670]" />
                    <input
                      type="password"
                      placeholder="Sua senha"
                      className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl text-[#4A6670] placeholder-[#7C9A92]/60 border border-[#7C9A92]/20 focus:outline-none focus:ring-2 focus:ring-[#7C9A92]/50 transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {errorMessage}
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#7C9A92] to-[#4A6670] text-white px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {/* Register Link */}
                <p className="text-center text-[#4A6670]/80 mt-6">
                  Não tem uma conta?{' '}
                  <Link 
                    href="/register" 
                    className="text-[#7C9A92] hover:text-[#4A6670] font-medium transition-colors"
                  >
                    Registre-se aqui
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}