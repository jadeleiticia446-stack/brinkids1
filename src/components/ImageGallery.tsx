"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const IMAGES = [
  { id: 1, src: "/hero.jpg", label: "Livro Falante Bilíngue" },
  { id: 2, src: "/produto-1.jpg", label: "Criança usando o livro" },
  { id: 3, src: "/produto-2.jpg", label: "Produto e embalagem" },
  { id: 4, src: "/produto-3.jpg", label: "Versão rosa" },
];

export default function ImageGallery() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? IMAGES.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === IMAGES.length - 1 ? 0 : c + 1));

  return (
    <section id="galeria" className="py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
          Veja o Livro de Perto
        </h2>

        <div className="relative">
          <div className="aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-lg bg-gray-100 relative">
            <Image
              src={IMAGES[current].src}
              alt={IMAGES[current].label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
              <p className="text-white text-sm font-medium">{IMAGES[current].label}</p>
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-5 flex-wrap">
          {IMAGES.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setCurrent(i)}
              className={`relative w-16 h-16 sm:w-20 sm:h-16 rounded-xl overflow-hidden transition-all ${
                current === i
                  ? "ring-2 ring-brand-blue ring-offset-2 scale-105"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}