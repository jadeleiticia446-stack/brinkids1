import { Gift, Package, Ruler, Battery, Baby, Languages, BookOpen, Sparkles } from "lucide-react";

const specs = [
  { icon: Package, label: "Material", value: "Papel cartao resistente + plastico ABS" },
  { icon: Ruler, label: "Dimensoes", value: "22 x 18 x 2,5 cm" },
  { icon: Battery, label: "Alimentacao", value: "3 pilhas AAA (nao inclusas)" },
  { icon: Baby, label: "Idade recomendada", value: "+1 ano" },
  { icon: Languages, label: "Idiomas", value: "Portugues e Ingles" },
  { icon: BookOpen, label: "Paginas", value: "12 paginas interativas" },
];

export default function Specs() {
  return (
    <section id="specs" className="py-16 bg-gradient-to-b from-pink-50/60 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
            Especificacoes Tecnicas
          </h2>
          <p className="text-gray-500 text-sm">
            Tudo o que voce precisa saber sobre o produto
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden mb-6">
          <div className="divide-y divide-gray-100">
            {specs.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between px-5 sm:px-6 py-4 gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                    <s.icon className="text-brand-blue" size={18} />
                  </div>
                  <span className="text-sm font-medium text-gray-500">{s.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 text-right">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brinde em destaque */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-pink-400 to-rose-400 p-[2px] shadow-lg">
          <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center shrink-0 shadow-md">
              <Gift className="text-white" size={32} />
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <Sparkles size={16} className="text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Brinde exclusivo
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-1">
                36 Canetas Coloridas Inclusas!
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Em todo pedido voce recebe um kit com 36 canetas coloridas para a crianca colorir e desenhar. Um presente extra que as criancas amam!
              </p>
            </div>
            <div className="shrink-0 bg-gradient-to-r from-amber-400 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow">
              GRATIS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}