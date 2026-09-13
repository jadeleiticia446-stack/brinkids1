"use client";

import { useState } from "react";
import { Star, Check } from "lucide-react";
import Image from "next/image";
import { formatCurrency, calculateInstallment } from "@/lib/utils";

interface HeroProps {
  onBuyClick: (color: string, quantity: number) => void;
}

const COLORS = [
  {
    id: "amarela",
    label: "Amarela",
    hex: "#F7D774",
    ring: "ring-yellow-400",
  },
  {
    id: "azul",
    label: "Azul",
    hex: "#5B9BD5",
    ring: "ring-blue-400",
  },
  {
    id: "rosa",
    label: "Rosa",
    hex: "#F4A6C4",
    ring: "ring-pink-400",
  },
];

const PRICE = 9.99;
const OLD_PRICE = 134.99;

export default function Hero({ onBuyClick }: HeroProps) {
  const [selectedColor, setSelectedColor] = useState("azul");
  const [quantity, setQuantity] = useState(1);

  const total = PRICE * quantity;

  return (
    <section className="bg-gradient-to-b from-brand-softBlue/60 to-white py-6 sm:py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">

          {/* Imagem do produto */}
          <div className="relative">
            <div className="aspect-square w-full max-w-sm sm:max-w-md mx-auto rounded-3xl overflow-hidden shadow-xl bg-gray-100 relative">
              <Image
                src="/hero.jpg"
                alt="Livro Falante Bilíngue"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>

            <div className="absolute -top-3 -right-1 sm:top-4 sm:right-8 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              OFERTA ESPECIAL
            </div>
          </div>

          {/* Informações do produto */}
          <div className="space-y-5">

            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                Livro Falante Bilíngue

                <span className="block text-brand-blue mt-1">
                  Português e Inglês
                </span>
              </h1>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="currentColor"
                    />
                  ))}
                </div>

                <span className="text-sm font-semibold text-gray-700">
                  4.9
                </span>

                <span className="text-sm text-gray-500">
                  (148 avaliações)
                </span>
              </div>
            </div>

            {/* Benefícios */}
            <div className="flex flex-col gap-2">
              {[
                "Menos telas, mais diversão",
                "Desenvolve habilidades motoras",
                "Estímulo essencial na infância",
              ].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </span>

                  {badge}
                </div>
              ))}
            </div>

            {/* Preço */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-sm text-gray-400 line-through">
                  {formatCurrency(OLD_PRICE)}
                </span>

                <span className="text-3xl font-extrabold text-gray-900">
                  {formatCurrency(PRICE)}
                </span>

                <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  OFERTA ESPECIAL
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                ou em até 12x de{" "}
                {formatCurrency(calculateInstallment(PRICE, 12))}
              </p>
            </div>

            {/* Escolha de cor */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Cor:
              </p>

              <div className="flex gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.id
                        ? `ring-2 ${color.ring} ring-offset-2 border-transparent scale-110`
                        : "border-gray-200 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                    aria-label={`Selecionar cor ${color.label}`}
                  />
                ))}
              </div>
            </div>

            {/* Quantidade */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Quantidade:
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-lg font-medium hover:bg-gray-50"
                  aria-label="Diminuir quantidade"
                >
                  -
                </button>

                <span className="w-12 text-center font-semibold text-lg">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-lg font-medium hover:bg-gray-50"
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botão de compra */}
            <button
              type="button"
              onClick={() => onBuyClick(selectedColor, quantity)}
              className="w-full py-4 px-4 sm:px-6 bg-gradient-to-r from-brand-blue to-blue-600 text-white font-bold text-base sm:text-lg rounded-2xl shadow-lg"
            >
              Comprar Agora — {formatCurrency(total)}
            </button>

            <p className="text-xs text-center text-gray-400">
              Compra 100% segura
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}