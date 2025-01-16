"use client"

import React, { useState, useEffect } from 'react';
import { supabase } from '../db/supabase';
import { Bell, MessageSquare, Menu, Leaf, LogOut, User, Calendar, CreditCard, ChevronDown, PlusCircle , X, Settings, Route} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation"; // Importar useRouter

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null); // user state
  const [profile, setProfile] = useState<any>(null); // profile state (seller)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
const router = useRouter()


  useEffect(() => {
    const getUser = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Erro ao obter sessão:", sessionError);
        return;
      }
  
      console.log("Sessão recuperada:", session);
  
      if (session) {
        console.log("Usuário autenticado:", session.user.id);  // Log do ID do usuário
        setUser(session.user);
        setIsAuthenticated(true);
  
        // Verifique se o session.user.id não está undefined
        if (session.user.id) {
          // Fetch seller profile data using the user UUID
          const { data, error } = await supabase
          .from('seller')
          .select('name')
          .eq('id', session.user.id);
  
          console.log("Consulta à tabela seller feita com o user id:", session.user.id);
          console.log("data", session.user);
  
          if (error) {
            console.error("Erro na consulta à tabela seller:", error);
          } else if (data && Array.isArray(data) && data.length > 0) {
            console.log("Perfil do usuário encontrado:", data);
            setProfile(data[0]);
            console.log("Nome do usuário:", data[0].name); // Exibe o nome do usuário
          } else {
            console.error('Nenhum perfil encontrado para esse usuário!');
          }
        } else {
          console.error("ID do usuário não encontrado!");
        }
      } else {
        console.error("Sessão não encontrada!");
      }
    };
  
    // Verifique o estado da autenticação e inscreva-se em mudanças
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        console.log("Usuário autenticado:", session.user.id); // Exibe o id do usuário
        setUser(session.user);
        setIsAuthenticated(true);
        getUser(); // Chama a função para pegar os dados do perfil do seller
      } else {
        console.log("Usuário deslogado");
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
      }
    });
  
    getUser(); // Tenta pegar o usuário logo ao carregar
  
    return () => {
      authListener?.unsubscribe(); // Desinscreve-se ao desmontar o componente
    };
  }, []);
  
  

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error.message);
      } else {
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const userNavigation = [
    { name: 'My Account', href: '/myaccount', icon: User },
    { name: 'Schedule', href: '/schedule', icon: Calendar },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Billing', href: '/billing', icon: CreditCard },
  ];

  const renderUserMenu = () => (
    <div className="relative">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center space-x-3 focus:outline-none"
      >
        <div className="relative">
          <img
            src={user?.avatar_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80"}
            alt={user?.email || "Profile"}
            className="h-8 w-8 rounded-full object-cover border-2 border-[#7C9A92]"
          />
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-[#4A6670]">
            {profile?.name || user?.email}
          </p>
          <p className="text-xs text-[#7C9A92]">
            {user?.name}
          </p>
        </div>
        <ChevronDown className="h-4 w-4 text-[#4A6670]" />
      </button>

      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-[#E8DED1]">
          {userNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm text-[#4A6670] hover:bg-[#F8F5F1]"
              >
                <Icon className="h-4 w-4 mr-3 text-[#7C9A92]" />
                {item.name}
              </a>
            );
          })}
          <div className="border-t border-[#E8DED1] mt-1">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-[#F8F5F1]"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="bg-white shadow-sm border-b border-[#E8DED1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Leaf className="h-8 w-8 text-[#7C9A92]" />
                <span className="ml-2 text-2xl font-semibold text-[#4A6670]">Healing Path</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {isAuthenticated ? (
                <>
                  <a href="/dashboard" className="text-[#4A6670] hover:text-[#7C9A92]">
                    Dashboard
                  </a>
                  <a href="/sessions" className="text-[#4A6670] hover:text-[#7C9A92]">
                    My Sessions
                  </a>
                  <div className="flex items-center space-x-4">
                    <button className="relative p-2 text-[#4A6670] hover:text-[#7C9A92]">
                      <Bell className="h-6 w-6" />
                      <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                        3
                      </span>
                    </button>
                    <button className="relative p-2 text-[#4A6670] hover:text-[#7C9A92]">
                      <MessageSquare className="h-6 w-6" />
                      <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                        5
                      </span>
                    </button>
                    {renderUserMenu()}
                  </div>
                </>
              ) : (
                <>
                  <a href="/blog" className="text-[#4A6670] hover:text-[#7C9A92]">
                    Blog
                  </a>
                  <Link href="/eventos" className="text-[#4A6670] hover:text-[#7C9A92]">
                    Eventos
                  </Link>
                  <a href="/practitioners" className="text-[#4A6670] hover:text-[#7C9A92]">
                    Find Practitioners
                  </a>
                  <a href="/about" className="text-[#4A6670] hover:text-[#7C9A92]">
                    About
                  </a>
                  <a
                    href="/login"
                    className="bg-[#7C9A92] text-white px-4 py-2 rounded-lg hover:bg-[#6A8B83] transition-colors"
                  >
                    Sign In
                  </a>
                  <a
                    href="/register"
                    className="flex items-center bg-[#4A6670] text-white px-4 py-2 rounded-lg hover:bg-[#3A5660] transition-colors"
                  >
                    <PlusCircle className="h-5 w-5 mr-2" />
                    List Your Practice
                  </a>
                </>
              )}
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
            <div className="md:hidden py-4 space-y-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <img
                      src={user?.avatar_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80"}
                      alt={user?.email || "Profile"}
                      className="h-10 w-10 rounded-full object-cover border-2 border-[#7C9A92]"
                    />
                    <div>
                      <p className="font-medium text-[#4A6670]">{profile?.name || user?.email}</p>
                      <p className="text-sm text-[#7C9A92]">{user?.email}</p>
                    </div>
                  </div>
                  <div className="border-t border-[#E8DED1] pt-4">
                    {userNavigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center px-4 py-2 text-[#4A6670] hover:bg-[#F8F5F1]"
                        >
                          <Icon className="h-5 w-5 mr-3 text-[#7C9A92]" />
                          {item.name}
                        </a>
                      );
                    })}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-[#F8F5F1]"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <a href="/blog" className="block px-4 py-2 text-[#4A6670] hover:bg-[#F8F5F1]">
                    Blog
                  </a>
                  <a href="/explore" className="block px-4 py-2 text-[#4A6670] hover:bg-[#F8F5F1]">
                    Explore
                  </a>
                  <a href="/practitioners" className="block px-4 py-2 text-[#4A6670] hover:bg-[#F8F5F1]">
                    Find Practitioners
                  </a>
                  <a href="/about" className="block px-4 py-2 text-[#4A6670] hover:bg-[#F8F5F1]">
                    About
                  </a>
                  <div className="px-4 pt-4 space-y-2">
                    <a
                      href="/login"
                      className="block w-full text-center bg-[#7C9A92] text-white px-4 py-2 rounded-lg hover:bg-[#6A8B83] transition-colors"
                    >
                      Sign In
                    </a>
                    <a
                      href="/register"
                      className="block w-full text-center bg-[#4A6670] text-white px-4 py-2 rounded-lg hover:bg-[#3A5660] transition-colors"
                    >
                      List Your Practice
                    </a>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
