"use client";

import { Star } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "Pipo Novaes",
    rating: 5,
    text: "O livro é lindo!!! As páginas são de papel tipo catálogo. Ele tem um som muito bom e claro. A entrega foi no prazo. Só veio sem o mini parafuso que fecha a caixa das pilhas, mas vou arrumar uma por aqui.",
    images: ["/avaliacao-1.jpg", "/avaliacao-2.jpg"],
  },
  {
    name: "Flor Trindade",
    rating: 5,
    text: "Ótimo! Amei! Lindas ilustrações! O som é ótimo, tem até a opção diminuir, esse e-livro é um professor. Se viesse as pilhas inclusas seria muito bom também, já quero comprar outros. Já ia esquecer, veio junto um livro de pintura, gostei!",
    images: ["/avaliacao-3.jpg", "/avaliacao-4.jpg", "/avaliacao-5.jpg", "/avaliacao-6.jpg"],
  },
  {
    name: "Nita Trindade",
    rating: 5,
    text: "Muito melhor do que imaginei, entrega realizada no prazo previsto, produto bem embalado. Vou comprar mais vezes nessa loja!!!!!",
    images: ["/avaliacao-7.jpg", "/avaliacao-8.jpg", "/avaliacao-9.jpg"],
  },
  {
    name: "Quirino Cunha",
    rating: 5,
    text: "Gente que livro perfeito eu estou encantada, muito didático e interativo.",
    images: ["/avaliacao-10.jpg"],
  },
];

const distribution = [
  { stars: 5, percent: 82 },
  { stars: 4, percent: 12 },
  { stars: 3, percent: 4 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

export default function SocialProof() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
          O Que os Pais Estão Dizendo
        </h2>

        {/* Resumo da nota */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
          <div className="text-center">
            <div className="text-5xl font-extrabold text-gray-900">4.9</div>
            <div className="flex justify-center text-yellow-400 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-gray-500">148 avaliações</p>
          </div>

          <div className="w-full max-w-xs space-y-1.5">
            {distribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-2 text-sm">
                <span className="w-3 text-gray-600">{d.stars}</span>
                <Star size={12} className="text-yellow-400" fill="currentColor" />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${d.percent}%` }}
                  />
                </div>
                <span className="w-8 text-right text-gray-500 text-xs">{d.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de avaliações */}
        <div className="space-y-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-gray-50 rounded-2xl p-5 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-full bg-brand-blue/20 flex items-center justify-center text-sm font-bold text-brand-blue">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                  <div className="flex text-yellow-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                {r.text}
              </p>

              {/* Fotos da avaliação */}
              {r.images && r.images.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {r.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200"
                    >
                      <Image
                        src={img}
                        alt={`Foto avaliação ${r.name}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}