"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Login() {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Data Login:", { identifier, password });
    window.location.href = "/dashboard";
  };

  return (
    <main className="w-screen h-screen min-h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-[#f8f7f2]">
      {/* SISI KIRI */}
      <motion.aside
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative hidden md:flex flex-col justify-between h-full bg-[#f4f2ea] border-r border-[#e6e2d8] shadow-[6px_0_25px_-5px_rgba(0,0,0,0.08)] z-10 overflow-hidden"
      >
        <div className="pt-10 lg:pt-12 px-8 flex flex-col items-center text-center z-20">
          <div className="relative w-24 h-16 mb-2">
            <Image alt="Logo Kampoeng Heritage" className="object-contain" fill priority src="/images/logo_login.png"/>
          </div>
          <h2 className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#2c3d25] uppercase">
            KAMPOENG HERITAGE
          </h2>
          <span
            className="text-4xl lg:text-5xl text-[#2c3d25] italic font-serif mt-1 font-normal tracking-wide"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
          >
            Kayutangan
          </span>
        </div>

        <div className="relative w-full h-[62%] mt-auto z-10">
          <Image alt="Sketsa Gereja Kayutangan" className="object-cover object-bottom pointer-events-none select-none" fill priority src="/images/gereja_kayutangan.png"/>
        </div>
      </motion.aside>

      {/* SISI KANAN */}
      <section className="relative flex flex-col justify-center items-center h-full px-8 sm:px-16 md:px-14 lg:px-20 bg-[#f8f7f2] z-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-lg relative z-20 pb-16"
        >
          <header className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#2a3821] tracking-tight">
              Login Admin
            </h1>
            <p className="text-base text-neutral-400 mt-2 font-normal">
              Masuk untuk mengakses dahboard admin.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative flex items-center">
              <label htmlFor="identifier" className="sr-only">Email atau Username</label>
              <span className="absolute left-5 text-neutral-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email atau Username"
                className="w-full pl-14 pr-5 py-3.5 bg-[#f3f4f6] border border-neutral-200/90 rounded-2xl text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition-all text-base shadow-sm"
              />
            </div>

            <div className="relative flex items-center">
              <label htmlFor="password" className="sr-only">Password</label>
              <span className="absolute left-5 text-neutral-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-14 pr-5 py-3.5 bg-[#f3f4f6] border border-neutral-200/90 rounded-2xl text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition-all text-base shadow-sm"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              type="submit"
              className="w-full py-3.5 px-6 bg-[#718255] hover:bg-[#607044] text-white font-semibold rounded-2xl transition duration-200 shadow-md shadow-[#718255]/25 text-base mt-2 cursor-pointer"
            >
              Login
            </motion.button>
          </form>
        </motion.div>

        <figure className="absolute bottom-0 left-0 right-0 w-full h-[28vh] sm:h-[32vh] pointer-events-none opacity-30 select-none z-10 flex items-end">
          <div className="relative w-full h-full">
            <Image alt="Pattern Heritage" className="object-contain object-bottom" fill priority src="/images/pattern.png"/>
          </div>
        </figure>
      </section>
    </main>
  );
}