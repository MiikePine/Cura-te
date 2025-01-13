"use client";

import React, { useState } from 'react';
import { Users, Bell, MessageSquare, Menu, Leaf, PlusCircle, X } from 'lucide-react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Se você exportou RootState
import { logout } from '../redux/slices/authSlice'; // Importando a ação de logout
import { supabase } from '../db/supabase'; // A importação do cliente do supabase

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Função para realizar o logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut(); // Realizando o logout no Supabase
      if (error) {
        console.error("Erro ao fazer logout:", error.message);
      } else {
        dispatch(logout()); // Despacha a ação de logout no Redux
        console.log("Logout bem-sucedido");
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="bg-white shadow-sm border-b border-[#E8DED1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
  <Link href="/">
    <p className="flex items-center">
      <Leaf className="h-8 w-8 text-[#7C9A92]" />
      <span className="ml-2 text-2xl font-semibold text-[#4A6670]">Healing Path</span>
    </p>
  </Link>
</div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/blog" className="text-[#4A6670] hover:text-[#7C9A92]">
                Blog
              </Link>

              <Link href="/explore" className="text-[#4A6670] hover:text-[#7C9A92]">
                Explore
              </Link>

              <Link href="/practitioners" className="text-[#4A6670] hover:text-[#7C9A92]">
                Find Practitioners
              </Link>
              <Link href="/about" className="text-[#4A6670] hover:text-[#7C9A92]">
                About
              </Link>

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="bg-[#7C9A92] text-white px-4 py-2 rounded-lg hover:bg-[#6A8B83] transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="bg-[#7C9A92] text-white px-4 py-2 rounded-lg hover:bg-[#6A8B83] transition-colors"
                >
                  Sign In
                </Link>
              )}

              <button className="flex items-center bg-[#4A6670] text-white px-4 py-2 rounded-lg hover:bg-[#3A5660] transition-colors">
                <PlusCircle className="h-5 w-5 mr-2" />
                List Your Practice
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-[#4A6670]" />
              ) : (
                <Menu className="h-6 w-6 text-[#4A6670]" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4">
              <div className="space-y-4">
                <Link href="/explore" className="block text-[#4A6670] hover:text-[#7C9A92]">
                  Explore
                </Link>
                <Link href="/practitioners" className="block text-[#4A6670] hover:text-[#7C9A92]">
                  Find Practitioners
                </Link>
                <Link href="/about" className="block text-[#4A6670] hover:text-[#7C9A92]">
                  About
                </Link>

                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full bg-[#7C9A92] text-white px-4 py-2 rounded-lg hover:bg-[#6A8B83] transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="w-full bg-[#7C9A92] text-white px-4 py-2 rounded-lg hover:bg-[#6A8B83] transition-colors"
                  >
                    Sign In
                  </Link>
                )}

                <button className="w-full flex items-center justify-center bg-[#4A6670] text-white px-4 py-2 rounded-lg hover:bg-[#3A5660] transition-colors">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  List Your Practice
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Exibição de usuário autenticado */}
      {isAuthenticated ? (
        <div>
        <p className="text-center mt-2">Bem-vindo, {user?.email} {user?.price}</p>
        <p>{user?.experience}</p>
        </div>
      ) : (
        <p className="text-center mt-2">Você não está logado</p>
      )}
    </header>
  );
};

export default Header;
