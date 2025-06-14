"use client";

import React, { useState, useEffect } from "react";
import {
  Bell, MessageSquare, Menu, Leaf, LogOut, User, Calendar, CreditCard, ChevronDown, PlusCircle, X, Settings, Search, Home
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@terapias/db/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Tables } from "../../../supabase/database.types";

type Seller = Tables<"seller">;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Seller | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Erro ao obter sessão:", sessionError);
        return;
      }

      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);

        if (session.user.id) {
          const { data, error } = await supabase
            .from("seller")
            .select("*")
            .eq("useruid", session.user.id)
            .single();

          if (error) {
            console.error("Erro na consulta à tabela seller:", error);
          } else if (data) {
            setProfile(data);
          }
        }
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
        getUser();
      } else {
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
      }
    });

    getUser();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
      router.push("/");
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const userNavigation = [
    { name: "My Account", href: "/myaccount", icon: User },
    { name: "Schedule", href: "/schedule", icon: Calendar },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Billing", href: "/billing", icon: CreditCard },
  ];

  const renderUserMenu = () => (
    <div className="relative">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center space-x-2 focus:outline-none"
        disabled={isLoggingOut}
      >
        <Image
          src={profile?.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80"}
          alt={profile?.name || "Profile"}
          className="h-8 w-8 rounded-full object-cover border-2 border-[#E8DED1]"
          width={32}
          height={32}
          sizes="32px"
        />
        <span className="hidden md:block text-sm font-medium text-[#E8DED1]">{profile?.name || user?.email || "User"}</span>
        <ChevronDown className="h-4 w-4 text-[#E8DED1]" />
      </button>

      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-[#E8DED1]">
          {userNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-2 text-sm text-[#4A6670] hover:bg-[#F8F5F1] transition-colors"
            >
              <item.icon className="h-4 w-4 mr-2 text-[#7C9A92]" />
              {item.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-[#7C9A92] hover:bg-[#F8F5F1] hover:text-red-600 transition-colors"
            disabled={isLoggingOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-[#4A6670] bg-opacity-95 text-white sticky top-0 z-50 shadow-md border-b border-[#E8DED1]/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-[#E8DED1]" />
              <span className="text-xl md:text-2xl font-semibold tracking-tight">Healing Path</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link href="/" className="flex items-center text-[#E8DED1] hover:text-[#E6B17E] transition-colors">
                  <Home className="h-5 w-5 mr-1" /> Home
                </Link>
                <Link href="/dashboard" className="flex items-center text-[#E8DED1] hover:text-[#E6B17E] transition-colors">
                  <Settings className="h-5 w-5 mr-1" /> Dashboard
                </Link>
                <Link href="/sessions" className="flex items-center text-[#E8DED1] hover:text-[#E6B17E] transition-colors">
                  <Calendar className="h-5 w-5 mr-1" /> My Sessions
                </Link>
                <Link href="/explore" className="flex items-center text-[#E8DED1] hover:text-[#E6B17E] transition-colors">
                  <Search className="h-5 w-5 mr-1" /> Explore
                </Link>
                <div className="flex items-center space-x-4">
                  <button className="relative p-2 text-[#E8DED1] hover:text-[#E6B17E] transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                  </button>
                  <button className="relative p-2 text-[#E8DED1] hover:text-[#E6B17E] transition-colors">
                    <MessageSquare className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">5</span>
                  </button>
                  {renderUserMenu()}
                </div>
              </>
            ) : (
              <>
                <Link href="/" className="flex items-center text-[#E8DED1] hover:text-[#E6B17E] transition-colors">
                  <Home className="h-5 w-5 mr-1" /> Home
                </Link>
                <Link href="/blog" className="flex items-center text-[#E8DED1] hover:text-[#E6B17E] transition-colors">
                  <MessageSquare className="h-5 w-5 mr-1" /> Blog
                </Link>
                <Link href="/eventos" className="flex items-center text-[#E8DED1] hover:text-[#E6B17E] transition-colors">
                  <Calendar className="h-5 w-5 mr-1" /> Eventos
                </Link>
                <Link href="/practitioners" className="flex items-center text-[#E8DED1] hover:text-[#E6B17E] transition-colors">
                  <User className="h-5 w-5 mr-1" /> Practitioners
                </Link>
                <Link href="/about" className="flex items-center text-[#E8DED1] hover:text-[#E6B17E] transition-colors">
                  <Leaf className="h-5 w-5 mr-1" /> About
                </Link>
                <Link href="/login" className="bg-[#E6B17E] text-white px-4 py-2 rounded-lg hover:bg-[#D9A066] transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="flex items-center bg-[#E8DED1] text-[#4A6670] px-4 py-2 rounded-lg hover:bg-[#D9A066] hover:text-white transition-colors">
                  <PlusCircle className="h-5 w-5 mr-1" /> List Your Practice
                </Link>
                <Link href="/forum" className="flex items-center bg-[#E8DED1] text-[#4A6670] px-4 py-2 rounded-lg hover:bg-[#D9A066] hover:text-white transition-colors">
                  Forum
                  </Link>
                  <Link href="/feed" className="flex items-center bg-[#E8DED1] text-[#4A6670] px-4 py-2 rounded-lg hover:bg-[#D9A066] hover:text-white transition-colors">
                  Feed
                  </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#E8DED1] hover:text-[#E6B17E] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-[#F8F5F1] text-[#4A6670] rounded-b-lg shadow-md">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 px-4 py-2 bg-white rounded-lg mx-4">
                  <Image
                    src={profile?.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80"}
                    alt={profile?.name || "Profile"}
                    className="h-10 w-10 rounded-full object-cover border-2 border-[#7C9A92]"
                    width={40}
                    height={40}
                    sizes="40px"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#4A6670]">{profile?.name || user?.email || "User"}</p>
                    <p className="text-xs text-[#7C9A92]">{user?.email || "No email"}</p>
                  </div>
                </div>
                <Link href="/" className="flex items-center px-4 py-2 hover:bg-[#E6B17E]/10 transition-colors">
                  <Home className="h-5 w-5 mr-2 text-[#7C9A92]" /> Home
                </Link>
                <Link href="/dashboard" className="flex items-center px-4 py-2 hover:bg-[#E6B17E]/10 transition-colors">
                  <Settings className="h-5 w-5 mr-2 text-[#7C9A92]" /> Dashboard
                </Link>
                <Link href="/sessions" className="flex items-center px-4 py-2 hover:bg-[#E6B17E]/10 transition-colors">
                  <Calendar className="h-5 w-5 mr-2 text-[#7C9A92]" /> My Sessions
                </Link>
                <Link href="/explore" className="flex items-center px-4 py-2 hover:bg-[#E6B17E]/10 transition-colors">
                  <Search className="h-5 w-5 mr-2 text-[#7C9A92]" /> Explore
                </Link>
                {userNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-4 py-2 hover:bg-[#E6B17E]/10 transition-colors"
                  >
                    <item.icon className="h-5 w-5 mr-2 text-[#7C9A92]" />
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-[#7C9A92] hover:bg-[#E6B17E]/10 hover:text-red-600 transition-colors"
                  disabled={isLoggingOut}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  {isLoggingOut ? "Signing out..." : "Sign out"}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link href="/" className="flex items-center px-4 py-2 hover:bg-[#E6B17E]/10 transition-colors">
                  <Home className="h-5 w-5 mr-2 text-[#7C9A92]" /> Home
                </Link>
                <Link href="/blog" className="flex items-center px-4 py-2 hover:bg-[#E6B17E]/10 transition-colors">
                  <MessageSquare className="h-5 w-5 mr-2 text-[#7C9A92]" /> Blog
                </Link>
                <Link href="/eventos" className="flex items-center px-4 py-2 hover:bg-[#E6B17E]/10 transition-colors">
                  <Calendar className="h-5 w-5 mr-2 text-[#7C9A92]" /> Eventos
                </Link>
                <Link href="/practitioners" className="flex items-center px-4 py-2 hover:bg-[#E6B17E]/10 transition-colors">
                  <User className="h-5 w-5 mr-2 text-[#7C9A92]" /> Practitioners
                </Link>
                <Link href="/about" className="flex items-center px-4 py-2 hover:bg-[#E6B17E]/10 transition-colors">
                  <Leaf className="h-5 w-5 mr-2 text-[#7C9A92]" /> About
                </Link>
                <div className="px-4 pt-2 space-y-2">
                  <Link href="/login" className="block w-full text-center bg-[#7C9A92] text-white px-4 py-2 rounded-lg hover:bg-[#6A8B83] transition-colors">
                    Sign In
                  </Link>
                  <Link href="/register" className="block w-full text-center bg-[#4A6670] text-white px-4 py-2 rounded-lg hover:bg-[#3A5660] transition-colors">
                    List Your Practice
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;