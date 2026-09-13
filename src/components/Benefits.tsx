import { BookOpen, Brain, Heart, Sparkles, Volume2, Hand } from "lucide-react";

const benefits = [
  {
    icon: Volume2,
    title: "Audio em dois idiomas",
    desc: "Aperte o botao e ouca as palavras em portugues e ingles com pronuncia clara.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Brain,
    title: "Desenvolvimento cognitivo",
    desc: "Estimula a memoria, atencao e o aprendizado precoce de uma segunda lingua.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Hand,
    title: "Habilidades motoras",
    desc: "Virar paginas e apertar botoes desenvolve a coordenacao motora fina.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Sparkles,
    title: "Sem telas",
    desc: "Diversao analogica que tira a crianca do celular e da TV de forma saudavel.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: BookOpen,
    title: "Historias interativas",
    desc: "Paginas coloridas com animais, numeros e objetos do dia a dia.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Heart,
    title: "Presente especial",
    desc: "Ideal para aniversarios, Natal e datas especiais. Encanta pais e filhos.",
    color: "from-red-500 to-red-600",
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-16 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-brand-blue bg-blue-100 px-3 py-1 rounded-full mb-3">
            Por que escolher
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Um Presente Que Diverte e Ensina
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Mais do que um brinquedo: uma ferramenta de aprendizado que acompanha o crescimento da crianca.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                <b.icon className="text-white" size={26} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{b.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}