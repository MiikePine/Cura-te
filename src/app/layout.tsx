"use client"; // Necessário para usar hooks e provider no cliente

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@terapias/app/layout/Header";
import Footer from "@terapias/app/layout/Footer";
import { Provider } from "react-redux";
import { store } from "../store/store"; // Importando a store

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html >
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
