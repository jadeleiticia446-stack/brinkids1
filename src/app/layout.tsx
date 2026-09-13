import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Livro Falante Bilíngue™ - Português e Inglês | Menos telas, mais diversão",
  description:
    "Livro falante bilíngue que ensina português e inglês de forma divertida. Ideal para crianças a partir de 1 ano. Frete rápido e 36 canetas coloridas de brinde.",
  keywords: "livro falante, bilíngue, português inglês, brinquedo educativo, criança",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
