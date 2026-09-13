/** Client-safe masking utilities (no Node crypto) */

export function maskCard(card: string): string {
  const clean = card.replace(/\D/g, "");
  if (clean.length < 4) return "**** **** **** ****";
  return `**** **** **** ${clean.slice(-4)}`;
}

export function maskCpf(cpf: string): string {
  const clean = cpf.replace(/\D/g, "");
  if (clean.length < 5) return "***.***.***-**";
  return `***.***.***-${clean.slice(-2)}`;
}

export function maskCvv(): string {
  return "***";
}
