"use client";

import { useState, useEffect } from "react";
import { X, Lock, CreditCard, MapPin, User, CheckCircle2, Loader2 } from "lucide-react";
import { formatCurrency, calculateInstallment } from "@/lib/utils";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  color: string;
  quantity: number;
}

const PRICE = 9.99;
const COLOR_LABELS: Record<string, string> = {
  amarela: "Amarela",
  azul: "Azul",
  rosa: "Rosa",
};

export default function CheckoutModal({ open, onClose, color, quantity }: CheckoutModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [installments, setInstallments] = useState(1);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    numeroCartao: "",
    nomeCartao: "",
    validade: "",
    cvv: "",
  });

  const total = PRICE * quantity;

  useEffect(() => {
    if (open) {
      setStep("form");
      setError("");
      setLoading(false);
    }
  }, [open]);

  // Simulated CEP lookup
  const handleCepBlur = () => {
    const clean = form.cep.replace(/\D/g, "");
    if (clean.length === 8) {
      setForm((f) => ({
        ...f,
        endereco: "Rua Exemplo das Flores",
        bairro: "Centro",
        cidade: "São Paulo",
        estado: "SP",
      }));
    }
  };

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          corSelecionada: color,
          quantidade: quantity,
          totalPago: total,
          enderecoCompleto: `${form.endereco}, ${form.numero}${form.complemento ? ` - ${form.complemento}` : ""}, ${form.bairro}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao processar pedido");
      }

      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg max-h-[95vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="font-bold text-lg text-gray-900">
            {step === "success" ? "Pedido Confirmado!" : "Finalizar Compra"}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {step === "success" ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="text-green-600" size={36} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Compra realizada com sucesso!</h3>
            <p className="text-sm text-gray-500">
              Você receberá um e-mail de confirmação em breve. Obrigado pela preferência!
            </p>
            <button
              onClick={onClose}
              className="mt-4 w-full py-3 bg-brand-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
            >
              Voltar à loja
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-6">
            {/* Order summary */}
            <div className="bg-brand-softBlue/50 rounded-2xl p-4 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Livro Falante Bilíngue — Cor {COLOR_LABELS[color] || color}</span>
                <span className="font-medium">x{quantity}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base mt-2">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Personal data */}
            <fieldset className="space-y-3">
              <legend className="flex items-center gap-2 font-semibold text-gray-900 mb-1">
                <User size={16} /> Dados Pessoais
              </legend>
              <input
                required
                placeholder="Nome completo"
                value={form.nome}
                onChange={(e) => update("nome", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
              />
              <input
                required
                type="email"
                placeholder="E-mail"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  placeholder="CPF"
                  value={form.cpf}
                  onChange={(e) => update("cpf", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
                />
                <input
                  required
                  placeholder="Telefone"
                  value={form.telefone}
                  onChange={(e) => update("telefone", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
                />
              </div>
            </fieldset>

            {/* Address */}
            <fieldset className="space-y-3">
              <legend className="flex items-center gap-2 font-semibold text-gray-900 mb-1">
                <MapPin size={16} /> Entrega
              </legend>
              <input
                required
                placeholder="CEP"
                value={form.cep}
                onChange={(e) => update("cep", e.target.value)}
                onBlur={handleCepBlur}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
              />
              <input
                required
                placeholder="Endereço (rua)"
                value={form.endereco}
                onChange={(e) => update("endereco", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
              />
              <div className="grid grid-cols-3 gap-3">
                <input
                  required
                  placeholder="Número"
                  value={form.numero}
                  onChange={(e) => update("numero", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
                />
                <input
                  placeholder="Compl."
                  value={form.complemento}
                  onChange={(e) => update("complemento", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm col-span-2"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <input
                  required
                  placeholder="Bairro"
                  value={form.bairro}
                  onChange={(e) => update("bairro", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
                />
                <input
                  required
                  placeholder="Cidade"
                  value={form.cidade}
                  onChange={(e) => update("cidade", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
                />
                <input
                  required
                  placeholder="UF"
                  value={form.estado}
                  onChange={(e) => update("estado", e.target.value)}
                  maxLength={2}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
                />
              </div>
            </fieldset>

            {/* Payment */}
            <fieldset className="space-y-3">
              <legend className="flex items-center gap-2 font-semibold text-gray-900 mb-1">
                <CreditCard size={16} /> Pagamento (Cartão de Crédito)
              </legend>
              <input
                required
                placeholder="Número do cartão"
                value={form.numeroCartao}
                onChange={(e) => update("numeroCartao", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
              />
              <input
                required
                placeholder="Nome impresso no cartão"
                value={form.nomeCartao}
                onChange={(e) => update("nomeCartao", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  placeholder="Validade (MM/AA)"
                  value={form.validade}
                  onChange={(e) => update("validade", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
                />
                <input
                  required
                  placeholder="CVV"
                  value={form.cvv}
                  onChange={(e) => update("cvv", e.target.value)}
                  maxLength={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
                />
              </div>

              {/* Installments */}
              <select
                value={installments}
                onChange={(e) => setInstallments(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm bg-white"
              >
                {[...Array(12)].map((_, i) => {
                  const n = i + 1;
                  const value = calculateInstallment(total, n);
                  return (
                    <option key={n} value={n}>
                      {n}x de {formatCurrency(value)} {n === 1 ? "(à vista)" : "sem juros"}
                    </option>
                  );
                })}
              </select>
            </fieldset>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processando...
                </>
              ) : (
                <>
                  <Lock size={18} />
                  Finalizar Compra — {formatCurrency(total)}
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
              <Lock size={12} /> Seus dados estão protegidos com criptografia
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
