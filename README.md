# 🖼️ Gallery Plus

## Visão Geral

Aplicação Full Stack para upload, organização e visualização de imagens, com frontend em React/Vite consumindo uma API REST própria construída em Fastify. O projeto inclui uma coleção Postman documentando os endpoints da API, facilitando testes e integração.

## Problema Resolvido

Gerenciar coleções de imagens de forma simples e rápida exige uma API capaz de lidar com upload de arquivos (multipart), servir esses arquivos com performance e uma interface que organize e exiba o conteúdo de forma fluida. Este projeto resolve isso ao oferecer:

- Upload de imagens via `multipart/form-data`.
- Servimento eficiente dos arquivos enviados.
- Interface reativa para navegação e organização da galeria.
- API documentada e testável via Postman, facilitando a colaboração entre frontend e backend.

## Solução Implementada

O projeto é dividido em duas camadas dentro do mesmo repositório (monorepo simples):

- **Frontend (`src/`):** SPA em **React 19** com **Vite**, roteamento via **React Router 7**, gerenciamento de estado assíncrono com **TanStack Query**, formulários com **React Hook Form + Zod**, e UI construída com **Tailwind CSS 4** e **Radix UI**.
- **Backend (`server/`):** API REST em **Fastify**, com suporte a upload de arquivos via `@fastify/multipart`, servimento de arquivos estáticos via `@fastify/static` e CORS configurado via `@fastify/cors`. O build do servidor é feito com `tsup`.

Principais funcionalidades:

- **Upload de Imagens:** endpoint dedicado para receber arquivos multipart e armazená-los.
- **Listagem e Visualização:** interface React consome a API via Axios/TanStack Query para listar e exibir as imagens.
- **Sincronização de Estado na URL:** uso do `nuqs` para refletir filtros/paginção diretamente na URL, permitindo compartilhar links de estados específicos da galeria.
- **Validação de Formulários:** Zod + React Hook Form garantem integridade dos dados antes do envio à API.
- **Documentação da API:** coleção Postman (`Gallery+.postman_collection.json`) incluída no repositório para teste manual dos endpoints.

## Stack Tecnológica

**Frontend**
- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router 7](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/)
- [Axios](https://axios-http.com/)
- [nuqs](https://nuqs.47ng.com/) (estado sincronizado com a URL)

**Backend**
- [Fastify](https://fastify.dev/)
- `@fastify/multipart` (upload de arquivos)
- `@fastify/static` (servimento de arquivos)
- `@fastify/cors`
- Build com [tsup](https://tsup.egoist.dev/)

**Outros**
- TypeScript em todo o projeto
- ESLint para padronização de código
- Deploy na [Vercel](https://vercel.com/)
- [Persistência de dados: complete aqui — ex.: banco de dados utilizado ou armazenamento em disco/serviço externo]

## Design e Experiência do Usuário

Interface construída com Tailwind CSS e Radix UI, priorizando:

- **Feedback visual** com notificações (`Sonner`).
- **Formulários validados** com mensagens de erro claras (Zod + React Hook Form).
- **Navegação fluida** entre páginas via React Router.
- **Estado compartilhável**, já que filtros/parâmetros refletem na URL.

## Como Rodar o Projeto Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) `>=20`
- [pnpm](https://pnpm.io/)

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/ElFabrica/gallery-plus.git
cd gallery-plus
```

### Passo 2: Instalar Dependências

```bash
pnpm install
```

### Passo 3: Configurar Variáveis de Ambiente

```bash
VITE_API_URL=http://localhost:5799
VITE_IMAGES_URL=http://localhost:5799/images
```

### Passo 4: Executar o Backend

```bash
pnpm dev-server
```

### Passo 5: Executar o Frontend

Em outro terminal:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173` (padrão do Vite), consumindo a API rodando via Fastify.

### Testando a API

Importe o arquivo `Gallery+.postman_collection.json` no [Postman](https://www.postman.com/) para testar os endpoints diretamente.

## 🛠️ Scripts Disponíveis

- `pnpm dev` — inicia o frontend (Vite)
- `pnpm dev-server` — builda e inicia o backend em modo watch
- `pnpm build` — builda backend e frontend para produção
- `pnpm build-server` — builda apenas o backend (type-check + tsup)
- `pnpm run-server` — executa o backend já buildado
- `pnpm preview` — pré-visualiza o build do frontend
- `pnpm lint` — executa o ESLint

## Demo

[Gallery Plus na Vercel](https://gallery-plus-beige.vercel.app/)
