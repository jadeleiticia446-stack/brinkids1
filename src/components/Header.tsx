"use client";

import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Início", href: "#" },
    { label: "Sobre", href: "#beneficios" },
    { label: "Produtos", href: "#galeria" },
    { label: "Por Idade", href: "#specs" },
    { label: "Contato", href: "#footer" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between min-h-16 md:h-18 gap-2">

          {/* Logo BRINKIDS */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight whitespace-nowrap">
              <span className="text-blue-500">B</span>
              <span className="text-pink-500">R</span>
              <span className="text-yellow-400">I</span>
              <span className="text-green-500">N</span>
              <span className="text-purple-500">K</span>
              <span className="text-orange-500">I</span>
              <span className="text-blue-600">D</span>
              <span className="text-pink-500">S</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-brand-blue transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-0.5 sm:gap-2 shrink-0">

            <button
              className="p-2 text-gray-500 hover:text-brand-blue transition-colors"
              aria-label="Buscar"
            >
              <Search size={19} />
            </button>

            <button
              className="hidden sm:block p-2 text-gray-500 hover:text-brand-blue transition-colors"
              aria-label="Login"
            >
              <User size={20} />
            </button>

            <button
              className="p-2 text-gray-500 hover:text-brand-blue transition-colors relative"
              aria-label="Carrinho"
            >
              <ShoppingCart size={19} />

              <span className="absolute top-0 right-0 w-4 h-4 bg-brand-pink text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-brand-blue transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 pt-3 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-3 text-sm font-medium text-gray-700 hover:bg-brand-softBlue rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}