# Gerador de Artigos para WordPress com IA

Sistema completo de geração de artigos para WordPress utilizando Inteligência Artificial através da API da OpenAI. Permite criar artigos otimizados para SEO de forma rápida e eficiente.

##  Funcionalidades

-  **Autenticação Completa**: Sistema de registro e login com JWT
-  **Geração de Artigos com IA**: Criação automática de artigos utilizando OpenAI GPT
-  **Gerenciamento de Artigos**: Visualize, edite e exclua seus artigos
-  **Interface Moderna**: Design limpo e responsivo com Bootstrap 5
-  **Banco de Dados SQLite**: Armazenamento local para testes (fácil migração)

##  Stack Tecnológica

### Backend
- **Node.js** + **Express** - Servidor REST API
- **SQLite** - Banco de dados (inicialmente para testes)
- **JWT** - Autenticação segura
- **OpenAI API** - Geração de conteúdo com IA (GPT-3.5-turbo)
- **bcryptjs** - Hash de senhas

### Frontend
- **React** - Interface de usuário moderna
- **Bootstrap 5** - Estilização e componentes responsivos
- **React Router** - Navegação entre páginas
- **Axios** - Comunicação com API

##  Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta na OpenAI com API Key

##  Instalação

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd article_generator
```

### 2. Instale as dependências
```bash
npm run install-all
```

Isso instalará as dependências do backend e frontend automaticamente.

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

Edite o arquivo `.env` e configure:

```env
PORT=5000
JWT_SECRET=sua_chave_secreta_aleatoria_aqui
OPENAI_API_KEY=sua_chave_da_openai_aqui
DB_PATH=./database/articles.db
```

** IMPORTANTE:**
- Gere uma chave JWT_SECRET aleatória e segura
- Obtenha sua chave da OpenAI em: https://platform.openai.com/api-keys
- Nunca compartilhe ou commite o arquivo `.env`

### 4. Execute o projeto

```bash
npm run dev
```

Isso iniciará o backend e frontend simultaneamente:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

Ou execute separadamente:

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run client
```

##  Estrutura do Projeto

```
article_generator/
├── server/                  # Backend (Express)
│   ├── config/             # Configurações (database, jwt)
│   ├── controllers/        # Lógica de negócio
│   ├── models/             # Modelos de dados (User, Article)
│   ├── routes/             # Rotas da API
│   ├── middleware/         # Middlewares (autenticação)
│   ├── services/           # Serviços externos (OpenAI)
│   └── index.js            # Entry point do servidor
├── client/                  # Frontend (React)
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── services/       # Serviços de API
│   │   └── App.js          # Componente principal
│   └── public/             # Arquivos públicos
├── database/                # Banco de dados SQLite (criado automaticamente)
└── .env                     # Variáveis de ambiente (não commitado)
```

##  Segurança

-  Senhas são criptografadas com bcrypt
-  Autenticação JWT para proteger rotas
-  Variáveis sensíveis em `.env` (não commitado)
-  Validação de entrada nos endpoints
-  Middleware de autenticação em rotas protegidas

##  API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login

### Artigos (requer autenticação)
- `POST /api/articles/generate` - Gerar novo artigo
- `GET /api/articles` - Listar todos os artigos do usuário
- `GET /api/articles/:id` - Buscar artigo específico
- `PUT /api/articles/:id` - Atualizar artigo
- `DELETE /api/articles/:id` - Excluir artigo

##  Como Usar

1. **Crie uma conta**: Acesse http://localhost:3000 e registre-se
2. **Faça login**: Entre com suas credenciais
3. **Gere artigos**: Vá em "Gerar Artigo" e informe o tópico desejado
4. **Gerencie artigos**: Visualize e edite seus artigos em "Meus Artigos"

##  Scripts Disponíveis

```bash
npm run dev          # Inicia backend e frontend simultaneamente
npm run server       # Inicia apenas o backend
npm run client       # Inicia apenas o frontend
npm run install-all  # Instala todas as dependências
```
