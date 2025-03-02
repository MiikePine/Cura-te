import React from 'react';
import {   Leaf,  Mail, Phone } from 'lucide-react';
import Link from 'next/link'; // Substituir pelo Link do Next.js

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#4A6670] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8" />
              <span className="text-2xl font-bold">Healing Path</span>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Connecting seekers with authentic healers for transformative experiences.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Practitioners</h4>
            <ul className="space-y-2 opacity-80">
              <li>
                <Link href="#" className="hover:opacity-100">
                  List Your Practice
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Seekers</h4>
            <ul className="space-y-2 opacity-80">
              <li>
                <Link href="#" className="hover:opacity-100">
                  Find Practitioners
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 opacity-80">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                support@healingpath.com
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                1-888-HEALING
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-sm opacity-80">
          <p>&copy; 2024 Healing Path. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
