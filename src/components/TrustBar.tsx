export default function TrustBar() {
  return (
    <div className="bg-gradient-to-r from-brand-blue via-brand-pink to-brand-yellow text-white text-center py-2 px-4 text-xs sm:text-sm font-medium tracking-wide">
      <span className="inline-flex items-center gap-1.5 sm:gap-3 flex-wrap justify-center">
        <span>Estoque nacional</span>
        <span className="hidden sm:inline opacity-60">•</span>
        <span>Envio em 24h</span>
        <span className="hidden sm:inline opacity-60">•</span>
        <span>Entrega 2 a 5 dias úteis</span>
      </span>
    </div>
  );
}
