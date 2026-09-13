# Livro Falante Bilíngue™ — Landing Page + Checkout + Admin

Aplicação completa de alta conversão para o produto **Livro Falante Bilíngue™ - Português e Inglês**.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma
- Criptografia AES-256-GCM (Node.js crypto)

## Funcionalidades

- Landing page mobile-first com 10 seções de conversão
- Checkout embutido em modal (sem redirecionamento)
- Criptografia de CPF, número do cartão e CVV
- Painel admin com login, tabela de leads, revelar dados e export CSV

## Instalação

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` se necessário.

### 3. Subir o banco de dados

```bash
docker compose up -d
```

### 4. Rodar as migrations

```bash
npx prisma generate
npx prisma db push
```

### 5. Iniciar o projeto

```bash
npm run dev
```

Acesse:

- Landing page: http://localhost:3000
- Painel admin: http://localhost:3000/admin  
  (usuário: `admin` / senha: `admin123`)

## Aviso importante de segurança

Este projeto **armazena dados de cartão de crédito e CVV** de forma criptografada apenas para fins **demonstrativos / educacionais**.

Em um ambiente real:

- **Nunca** armazene CVV (proibido pelo PCI-DSS)
- Use um gateway de pagamento (Stripe, Pagar.me, Mercado Pago, etc.)
- Não processe dados de cartão no seu servidor

## Estrutura principal

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── admin/page.tsx        # Painel admin
│   └── api/
│       ├── checkout/         # API de compra
│       └── admin/            # APIs do painel
├── components/               # Componentes da landing + checkout
└── lib/
    ├── crypto.ts             # encrypt / decrypt
    └── prisma.ts
```

## Scripts úteis

| Comando              | Descrição                |
|----------------------|--------------------------|
| `npm run dev`        | Desenvolvimento          |
| `npm run build`      | Build de produção        |
| `npx prisma studio`  | Interface visual do banco|
| `npx prisma db push` | Sincronizar schema       |
