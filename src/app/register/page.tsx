"use client";

import React, { useState } from 'react';
import { Globe, Plus, Minus } from 'lucide-react';
import { addSeller, signupWithEmail } from '../../db/dbFetch'; // Importando as funções de dbFetch

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    availability: {
      timezone: '',
      hours: [{ day: '', time: '' }],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

 


  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      setIsSubmitting(false);
      return;
    }

    try {
      // Registrar o usuário
      const user = await signupWithEmail(formData.email, formData.password);
      if (user.error) {
        throw new Error(user.error);
      }

      // Enviar dados do vendedor para o Supabase
      await addSeller(formData.name, formData.email, formData.availability);
      alert('Registro efetuado com sucesso!');
    } catch (error) {
      alert('Erro ao registrar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#4A6670] mb-8">Registration & Availability</h2>

      <div className="space-y-6">
        {/* Nome */}
        <div>
          <label className="block text-[#4A6670] mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-[#4A6670] mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-[#4A6670] mb-2">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label className="block text-[#4A6670] mb-2">Confirm Password</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full px-4 py-3 bg-white rounded-lg text-[#4A6670] placeholder-[#7C9A92] border border-[#E8DED1] focus:outline-none focus:ring-2 focus:ring-[#7C9A92]"
            placeholder="Confirm your password"
          />
        </div>

       
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-[#7C9A92] text-white px-6 py-3 rounded-lg hover:bg-[#6A8B83] transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
