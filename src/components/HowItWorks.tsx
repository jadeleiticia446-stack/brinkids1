import { Battery, BookOpen, MousePointerClick, Volume2, Smile } from "lucide-react";

const steps = [
  {
    icon: Battery,
    step: "1",
    title: "Coloque as pilhas",
    desc: "Insira 3 pilhas AAA no compartimento traseiro (não inclusas).",
  },
  {
    icon: BookOpen,
    step: "2",
    title: "Abra o livro",
    desc: "Escolha a página com o tema que a criança quer explorar.",
  },
  {
    icon: MousePointerClick,
    step: "3",
    title: "Aperte o botão",
    desc: "Cada página tem um botão interativo com áudio em dois idiomas.",
  },
  {
    icon: Volume2,
    step: "4",
    title: "Ouça e repita",
    desc: "A criança escuta a palavra em português e inglês e pode repetir.",
  },
  {
    icon: Smile,
    step: "5",
    title: "Divirta-se aprendendo",
    desc: "Repita quantas vezes quiser. Aprendizado natural e divertido!",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          Como Funciona
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-softYellow to-brand-softPink flex items-center justify-center mb-4">
                <s.icon className="text-brand-blue" size={28} />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-blue text-white text-xs font-bold flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
