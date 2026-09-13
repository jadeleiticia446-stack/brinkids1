import { Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-pink flex items-center justify-center text-white font-bold text-xs">
                BK
              </div>
              <span className="font-bold text-white">BRINKIDS</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Brinquedos educativos que estimulam o aprendizado sem telas. Feito com carinho para as criancas brasileiras.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Sobre nos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Politica de privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trocas e devolucoes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de uso</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li>WhatsApp: (31) 98367-526</li>
              <li>E-mail: brinkids@gmail.com</li>
              <li>Seg a Sex: 9h as 18h</li>
            </ul>
          </div>

          {/* Payment + Social */}
          <div>
            <h4 className="font-semibold text-white mb-3">Pagamento</h4>
            <div className="flex flex-wrap gap-2 mb-5">
              {["Visa", "Master", "Elo", "Amex", "Hipercard"].map((card) => (
                <span
                  key={card}
                  className="px-2.5 py-1 bg-gray-800 rounded text-xs font-medium text-gray-300"
                >
                  {card}
                </span>
              ))}
            </div>
            <h4 className="font-semibold text-white mb-3">Redes sociais</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500 space-y-1">
          <p>© 2026 BRINKIDS. Todos os direitos reservados.</p>
          <p>CNPJ: 12.345.678/0001-99 · Rua das Flores, 123 – Sao Paulo/SP – CEP 01234-000</p>
        </div>
      </div>
    </footer>
  );
}