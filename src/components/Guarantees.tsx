import { Truck, RefreshCw, Headphones } from "lucide-react";

const guarantees = [
  {
    icon: Truck,
    title: "Frete Seguro",
    desc: "Embalagem reforçada e rastreamento completo. Entrega de 2 a 5 dias úteis.",
  },
  {
    icon: RefreshCw,
    title: "Troca Grátis em 7 dias",
    desc: "Não gostou? Devolve sem custo e sem burocracia. Satisfação garantida.",
  },
  {
    icon: Headphones,
    title: "Atendimento Humanizado",
    desc: "Fale com pessoas reais pelo WhatsApp. Estamos aqui para ajudar.",
  },
];

export default function Guarantees() {
  return (
    <section className="py-14 bg-brand-softYellow/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-6">
          {guarantees.map((g) => (
            <div
              key={g.title}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-50"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-brand-blue/15 to-brand-pink/15 flex items-center justify-center mb-4">
                <g.icon className="text-brand-blue" size={26} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1.5">{g.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
