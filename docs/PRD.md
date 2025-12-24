# PRD - Carinho Pet
## Product Requirements Document

**Versão:** 1.0
**Data:** 24 de Dezembro de 2024
**Autor:** Equipe de Desenvolvimento
**Status:** Em Desenvolvimento

---

## 1. Executive Summary

### 1.1 Visão do Produto
O **Carinho Pet** é um diretório digital de serviços pet focado na região de Três Lagoas-MS e cidades vizinhas (raio de 100km). A plataforma conecta tutores de animais de estimação com empresas e prestadores de serviços especializados, facilitando a descoberta de pet shops, clínicas veterinárias, adestradores, pet sitters e outros profissionais do segmento pet.

### 1.2 Problema
- Donos de pets em Três Lagoas e região têm dificuldade em encontrar serviços pet confiáveis
- Informações sobre empresas pet estão dispersas em redes sociais e boca-a-boca
- Empresas e prestadores locais têm baixa visibilidade digital
- Não existe uma plataforma centralizada para avaliações e contatos

### 1.3 Solução
Uma plataforma web responsiva que:
- Centraliza informações de empresas e prestadores de serviços pet
- Permite avaliações de clientes para construir confiança
- Rastreia engajamento (cliques em contatos) para demonstrar valor aos anunciantes
- Oferece painel administrativo para gestão de conteúdo

### 1.4 Objetivos SMART
| Objetivo | Métrica | Prazo |
|----------|---------|-------|
| Cadastrar 50 empresas/prestadores | Número de cadastros ativos | 3 meses |
| Atingir 1.000 visitantes únicos/mês | Google Analytics | 6 meses |
| Gerar 500 cliques em contatos/mês | Dashboard Analytics | 6 meses |
| Obter 100 avaliações aprovadas | Sistema de avaliações | 6 meses |

---

## 2. Product Overview

### 2.1 Escopo do Produto (MVP)
**Incluído:**
- Página inicial com busca e destaques
- Listagem de empresas com filtros
- Listagem de prestadores com filtros
- Páginas de detalhes individuais
- Sistema de avaliações com moderação
- Tracking de cliques em contatos
- Painel administrativo completo
- SEO otimizado para buscas locais
- Integração Google AdSense (preparado)

**Fora do Escopo (v1.0):**
- Cadastro de usuários (clientes)
- Sistema de agendamento online
- Chat/mensagens diretas
- Aplicativo mobile nativo
- Pagamentos online

### 2.2 Stakeholders

| Stakeholder | Função | Interesse |
|-------------|--------|-----------|
| Administrador | Gerencia o conteúdo e modera avaliações | Manter qualidade e crescer a base |
| Empresas Pet | Anunciantes | Visibilidade e novos clientes |
| Prestadores | Anunciantes individuais | Visibilidade e novos clientes |
| Tutores de Pets | Usuários finais | Encontrar serviços confiáveis |

### 2.3 Métricas de Sucesso
- **Engajamento:** Taxa de cliques em "Ver Contato"
- **Retenção:** Visitantes recorrentes
- **Qualidade:** Avaliações positivas (4-5 estrelas)
- **Cobertura:** Número de cidades atendidas
- **Receita:** Cliques em anúncios AdSense (futuro)

---

## 3. User Personas

### 3.1 Persona 1: Maria - Tutora de Pet
**Demografia:**
- 32 anos, mulher, moradora de Três Lagoas-MS
- Classe média, renda familiar R$ 8.000/mês
- Tem um cachorro (Golden Retriever, 3 anos)

**Comportamento:**
- Busca serviços pet no Google e Instagram
- Valoriza avaliações de outros clientes
- Prefere contato via WhatsApp
- Prioriza proximidade geográfica

**Necessidades:**
- Encontrar veterinário de confiança rapidamente
- Comparar preços e avaliações de pet shops
- Descobrir adestradores na região

**Frustrações:**
- Informações desatualizadas em redes sociais
- Não saber se a empresa ainda está ativa
- Dificuldade em encontrar horários de funcionamento

---

### 3.2 Persona 2: João - Dono de Pet Shop
**Demografia:**
- 45 anos, homem, empresário
- Proprietário do "Pet Shop Amigo Fiel"
- 8 anos no mercado pet de Três Lagoas

**Comportamento:**
- Anuncia no Instagram e Facebook
- Depende de indicações boca-a-boca
- Não tem site próprio

**Necessidades:**
- Aumentar visibilidade online
- Atrair novos clientes da região
- Mostrar diferencial através de avaliações

**Frustrações:**
- Custo alto de anúncios digitais
- Dificuldade em medir retorno de marketing
- Competir com grandes redes

---

### 3.3 Persona 3: Ana - Adestradora Autônoma
**Demografia:**
- 28 anos, mulher, profissional autônoma
- Formação em comportamento animal
- Atende em domicílio em Três Lagoas e região

**Comportamento:**
- Trabalha principalmente por indicação
- Usa Instagram para divulgação
- Agenda via WhatsApp

**Necessidades:**
- Ampliar base de clientes
- Construir reputação online
- Ser encontrada por quem busca adestramento

**Frustrações:**
- Poucos canais de divulgação acessíveis
- Clientes não encontram seu contato facilmente
- Dificuldade em demonstrar qualificação

---

## 4. Functional Requirements

### 4.1 Módulo Público - Home

| ID | Requisito | Prioridade | Status |
|----|-----------|------------|--------|
| FR-001 | Exibir hero section com busca | Alta | Implementado |
| FR-002 | Mostrar estatísticas (empresas, cidades, cobertura) | Média | Implementado |
| FR-003 | Listar empresas em destaque | Alta | Implementado |
| FR-004 | Listar prestadores em destaque | Alta | Implementado |
| FR-005 | Exibir seção de categorias | Média | Implementado |
| FR-006 | FAQ com Schema markup | Média | Implementado |

### 4.2 Módulo Público - Empresas

| ID | Requisito | Prioridade | Status |
|----|-----------|------------|--------|
| FR-010 | Listar todas as empresas ativas | Alta | Implementado |
| FR-011 | Filtrar por tipo de empresa | Alta | Implementado |
| FR-012 | Filtrar por cidade | Alta | Implementado |
| FR-013 | Buscar por nome | Alta | Implementado |
| FR-014 | Exibir cards com informações resumidas | Alta | Implementado |
| FR-015 | Página de detalhes da empresa | Alta | Implementado |
| FR-016 | Botão "Ver Contato" com tracking | Alta | Implementado |
| FR-017 | Links para WhatsApp, telefone, email | Alta | Implementado |
| FR-018 | Exibir avaliações aprovadas | Alta | Implementado |
| FR-019 | Formulário para nova avaliação | Alta | Implementado |

### 4.3 Módulo Público - Prestadores

| ID | Requisito | Prioridade | Status |
|----|-----------|------------|--------|
| FR-020 | Listar todos os prestadores ativos | Alta | Implementado |
| FR-021 | Filtrar por tipo de serviço | Alta | Implementado |
| FR-022 | Filtrar por cidade | Alta | Implementado |
| FR-023 | Buscar por nome | Alta | Implementado |
| FR-024 | Página de detalhes do prestador | Alta | Implementado |
| FR-025 | Tracking de cliques em contatos | Alta | Implementado |

### 4.4 Módulo Admin - Autenticação

| ID | Requisito | Prioridade | Status |
|----|-----------|------------|--------|
| FR-030 | Login com email e senha | Alta | Implementado |
| FR-031 | Proteção de rotas admin | Alta | Implementado |
| FR-032 | Rate limiting no login | Alta | Implementado |
| FR-033 | Logout com invalidação de sessão | Alta | Implementado |
| FR-034 | Auditoria de tentativas de login | Alta | Implementado |

### 4.5 Módulo Admin - Gestão

| ID | Requisito | Prioridade | Status |
|----|-----------|------------|--------|
| FR-040 | Dashboard com métricas gerais | Alta | Implementado |
| FR-041 | CRUD de empresas | Alta | Parcial |
| FR-042 | CRUD de prestadores | Alta | Parcial |
| FR-043 | Moderação de avaliações | Alta | Implementado |
| FR-044 | Analytics de cliques por período | Alta | Implementado |
| FR-045 | Busca no analytics | Média | Implementado |

### 4.6 Módulo SEO

| ID | Requisito | Prioridade | Status |
|----|-----------|------------|--------|
| FR-050 | Meta tags dinâmicas por página | Alta | Implementado |
| FR-051 | Sitemap.xml dinâmico | Alta | Implementado |
| FR-052 | Robots.txt configurado | Alta | Implementado |
| FR-053 | Schema.org (Organization, LocalBusiness) | Alta | Implementado |
| FR-054 | Open Graph para redes sociais | Média | Implementado |

---

## 5. Technical Specifications

### 5.1 Stack Tecnológico

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| Frontend | Next.js (App Router) | 16.1.1 |
| UI Framework | React | 19.2.3 |
| Estilização | Tailwind CSS | 4.x |
| Componentes | shadcn/ui | - |
| Banco de Dados | SQLite (Prisma) | - |
| ORM | Prisma Client | 6.1.0 |
| Validação | Zod | 4.2.1 |
| Autenticação | Cookies + bcrypt | - |
| Rate Limiting | LRU Cache | 11.2.4 |

### 5.2 Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                      Cliente (Browser)                   │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Next.js Server                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │   Pages     │  │  API Routes │  │   Middleware    │  │
│  │  (SSR/SSG)  │  │   (REST)    │  │  (Auth/Security)│  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Prisma ORM                            │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    SQLite Database                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐  │
│  │ Empresa  │ │Prestador │ │Avaliacao │ │CliqueContato│ │
│  └──────────┘ └──────────┘ └──────────┘ └────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 5.3 Estrutura de Diretórios

```
src/
├── app/                    # App Router pages
│   ├── (public)/          # Rotas públicas
│   │   ├── page.tsx       # Home
│   │   ├── empresas/      # Listagem e detalhes
│   │   ├── prestadores/   # Listagem e detalhes
│   │   └── sobre/         # Página sobre
│   ├── admin/             # Área administrativa
│   │   ├── page.tsx       # Dashboard
│   │   ├── login/         # Autenticação
│   │   ├── analytics/     # Relatórios
│   │   ├── avaliacoes/    # Moderação
│   │   ├── empresas/      # Gestão
│   │   └── prestadores/   # Gestão
│   └── api/               # API Routes
│       ├── auth/          # Login/Logout
│       ├── avaliacoes/    # CRUD avaliações
│       ├── contato-click/ # Tracking
│       └── admin/         # APIs admin
├── components/            # Componentes React
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Header, Footer
│   └── home/             # Componentes da home
├── lib/                   # Utilitários
│   ├── db.ts             # Prisma client
│   ├── auth.ts           # Autenticação
│   ├── security.ts       # Validação Zod
│   ├── rate-limit.ts     # Rate limiting
│   ├── csrf.ts           # Proteção CSRF
│   └── audit.ts          # Auditoria
└── middleware.ts          # Security headers
```

### 5.4 Modelo de Dados

#### Empresa
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| nome | String | Nome da empresa |
| slug | String (unique) | URL amigável |
| tipo | String | Categoria (Pet Shop, Veterinária, etc.) |
| descricao | String | Descrição detalhada |
| logo | String | URL da imagem |
| telefone | String | Telefone principal |
| whatsapp | String? | WhatsApp (opcional) |
| email | String? | Email (opcional) |
| website | String? | Site (opcional) |
| instagram | String? | Instagram (opcional) |
| cidade | String | Cidade de atuação |
| bairro | String? | Bairro (opcional) |
| endereco | String | Endereço completo |
| horarioFunc | String? | Horário de funcionamento |
| destaque | Boolean | Empresa em destaque |
| ativo | Boolean | Empresa ativa |

#### Prestador
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| nome | String | Nome do prestador |
| slug | String (unique) | URL amigável |
| tipo | String | Tipo de serviço |
| descricao | String | Descrição do serviço |
| foto | String | Foto do prestador |
| telefone | String | Telefone principal |
| whatsapp | String? | WhatsApp |
| email | String? | Email |
| instagram | String? | Instagram |
| cidade | String | Cidade de atuação |
| bairro | String? | Bairro |
| endereco | String? | Endereço |
| destaque | Boolean | Em destaque |
| ativo | Boolean | Ativo |

#### Avaliacao
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| nota | Int (1-5) | Nota em estrelas |
| comentario | String? | Comentário (opcional) |
| nomeAutor | String | Nome de quem avaliou |
| aprovada | Boolean | Moderação |
| empresaId | String? | FK Empresa |
| prestadorId | String? | FK Prestador |

#### CliqueContato
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (CUID) | Identificador único |
| tipoContato | String | reveal/whatsapp/telefone/email |
| empresaId | String? | FK Empresa |
| prestadorId | String? | FK Prestador |
| ip | String? | IP do visitante |
| userAgent | String? | User agent |
| createdAt | DateTime | Data/hora do clique |

### 5.5 APIs

#### Autenticação
```
POST /api/auth/login
Body: { email: string, password: string }
Response: { success: boolean }
Headers: Set-Cookie (admin_session)

POST /api/auth/logout
Response: { success: boolean }

GET /api/auth/check
Response: { authenticated: boolean }
```

#### Avaliações
```
GET /api/avaliacoes?empresaId=xxx|prestadorId=xxx
Response: Avaliacao[]

POST /api/avaliacoes
Body: { nota, nomeAutor, comentario?, empresaId?, prestadorId? }
Response: { success: boolean }

PATCH /api/avaliacoes/[id] (Auth required)
Body: { aprovada: boolean }
Response: Avaliacao

DELETE /api/avaliacoes/[id] (Auth required)
Response: { success: boolean }
```

#### Analytics
```
GET /api/admin/analytics?periodo=30&tipo=todos (Auth required)
Response: {
  periodo: number,
  totais: { cliques, reveal, whatsapp, telefone, email },
  porDia: [{ data, cliques }],
  empresas: [{ id, nome, reveal, whatsapp, telefone, email, total }],
  prestadores: [{ id, nome, reveal, whatsapp, telefone, email, total }]
}
```

#### Tracking
```
POST /api/contato-click
Body: { tipoContato, empresaId?, prestadorId? }
Response: { success: boolean }
```

---

## 6. User Stories

### Epic 1: Descoberta de Serviços

#### US-001: Buscar empresa por nome
**Como** tutor de pet
**Quero** buscar empresas pelo nome
**Para** encontrar rapidamente uma empresa específica

**Critérios de Aceitação:**
- [ ] Campo de busca visível na home e listagem
- [ ] Resultados filtrados em tempo real
- [ ] Busca case-insensitive
- [ ] Exibe mensagem quando não há resultados

---

#### US-002: Filtrar por categoria
**Como** tutor de pet
**Quero** filtrar empresas por tipo (Pet Shop, Veterinária, etc.)
**Para** ver apenas serviços relevantes

**Critérios de Aceitação:**
- [ ] Dropdown/chips com categorias disponíveis
- [ ] Contagem de resultados por categoria
- [ ] Filtro aplicado instantaneamente
- [ ] Possibilidade de limpar filtros

---

#### US-003: Ver detalhes da empresa
**Como** tutor de pet
**Quero** ver informações completas de uma empresa
**Para** decidir se vou entrar em contato

**Critérios de Aceitação:**
- [ ] Página com nome, descrição, fotos
- [ ] Endereço com link para Google Maps
- [ ] Horário de funcionamento
- [ ] Todos os canais de contato
- [ ] Avaliações de outros clientes

---

#### US-004: Contatar via WhatsApp
**Como** tutor de pet
**Quero** clicar no WhatsApp e abrir conversa
**Para** entrar em contato facilmente

**Critérios de Aceitação:**
- [ ] Botão WhatsApp visível
- [ ] Abre app WhatsApp com número preenchido
- [ ] Mensagem pré-formatada (opcional)
- [ ] Clique registrado no analytics

---

### Epic 2: Avaliações

#### US-010: Enviar avaliação
**Como** cliente de uma empresa
**Quero** deixar uma avaliação com nota e comentário
**Para** ajudar outros tutores na decisão

**Critérios de Aceitação:**
- [ ] Formulário com nome, nota (1-5 estrelas), comentário
- [ ] Validação de campos obrigatórios
- [ ] Feedback de sucesso após envio
- [ ] Avaliação fica pendente de moderação

---

#### US-011: Ver avaliações
**Como** tutor de pet
**Quero** ver avaliações de outros clientes
**Para** ter confiança na empresa

**Critérios de Aceitação:**
- [ ] Lista de avaliações aprovadas
- [ ] Nota média calculada
- [ ] Nome do avaliador e data
- [ ] Ordenação por mais recentes

---

### Epic 3: Administração

#### US-020: Login seguro
**Como** administrador
**Quero** fazer login com credenciais
**Para** acessar o painel administrativo

**Critérios de Aceitação:**
- [ ] Formulário com email e senha
- [ ] Feedback de erro para credenciais inválidas
- [ ] Redirecionamento para dashboard após login
- [ ] Proteção contra brute force (rate limit)

---

#### US-021: Moderar avaliações
**Como** administrador
**Quero** aprovar ou rejeitar avaliações
**Para** manter a qualidade do conteúdo

**Critérios de Aceitação:**
- [ ] Lista de avaliações pendentes
- [ ] Botões para aprovar/rejeitar
- [ ] Visualização do conteúdo completo
- [ ] Registro de ação no log

---

#### US-022: Visualizar analytics
**Como** administrador
**Quero** ver estatísticas de cliques
**Para** demonstrar valor aos anunciantes

**Critérios de Aceitação:**
- [ ] Filtro por período (7, 30, 90 dias)
- [ ] Gráfico de evolução diária
- [ ] Tabela por empresa/prestador
- [ ] Detalhamento por tipo de contato

---

## 7. Wireframes

### 7.1 Home Page
```
┌──────────────────────────────────────────────────────────┐
│  [Logo]                    Home | Empresas | Prestadores │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   ┌────────────────────────────────────────────────┐    │
│   │  HERO: "Encontre o melhor cuidado para seu pet"│    │
│   │  [_____________Buscar..._______________][🔍]   │    │
│   │  25+ Empresas | 7 Cidades | 100km cobertura    │    │
│   └────────────────────────────────────────────────┘    │
│                                                          │
│   ━━━━━━━━━━ Empresas em Destaque ━━━━━━━━━━            │
│   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                       │
│   │Card1│ │Card2│ │Card3│ │Card4│                       │
│   └─────┘ └─────┘ └─────┘ └─────┘                       │
│                                                          │
│   ━━━━━━━━━━ Prestadores em Destaque ━━━━━━━━━━         │
│   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                       │
│   │Card1│ │Card2│ │Card3│ │Card4│                       │
│   └─────┘ └─────┘ └─────┘ └─────┘                       │
│                                                          │
│   ━━━━━━━━━━ FAQ ━━━━━━━━━━                              │
│   [+] O que é o Carinho Pet?                            │
│   [+] Como faço para cadastrar minha empresa?           │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  © 2024 Carinho Pet | Três Lagoas-MS                    │
└──────────────────────────────────────────────────────────┘
```

### 7.2 Listagem de Empresas
```
┌──────────────────────────────────────────────────────────┐
│  [Logo]                    Home | Empresas | Prestadores │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Empresas Pet em Três Lagoas e Região                   │
│                                                          │
│  ┌─────────────────┐ ┌──────────────┐ ┌──────────────┐  │
│  │ [🔍 Buscar...  ]│ │[Tipo ▼     ] │ │[Cidade ▼   ] │  │
│  └─────────────────┘ └──────────────┘ └──────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ [Logo] Pet Shop Amigo Fiel                    ⭐4.5 │ │
│  │        Pet Shop • Três Lagoas-MS                    │ │
│  │        Rua das Flores, 123                          │ │
│  │        [📱 WhatsApp] [📞 Telefone] [Ver mais →]    │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ [Logo] Clínica VetAmor                        ⭐4.8 │ │
│  │        Hospital Veterinário • Três Lagoas-MS        │ │
│  │        Av. Principal, 456                           │ │
│  │        [📱 WhatsApp] [📞 Telefone] [Ver mais →]    │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 7.3 Detalhes da Empresa
```
┌──────────────────────────────────────────────────────────┐
│  [Logo]                    Home | Empresas | Prestadores │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────┐  Pet Shop Amigo Fiel                       │
│  │  LOGO   │  ⭐ 4.5 (12 avaliações)                    │
│  │         │  Pet Shop • Três Lagoas-MS                 │
│  └─────────┘                                            │
│                                                          │
│  ━━━━━━━━━━ Sobre ━━━━━━━━━━                            │
│  Lorem ipsum dolor sit amet, consectetur adipiscing...   │
│                                                          │
│  ━━━━━━━━━━ Contato ━━━━━━━━━━                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 📍 Rua das Flores, 123 - Centro                   │  │
│  │ 🕐 Seg-Sáb: 8h às 18h                             │  │
│  │                                                    │  │
│  │ [👁️ Ver Contato]                                  │  │
│  │                                                    │  │
│  │ [📱 WhatsApp]  [📞 Telefone]  [📧 Email]          │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ━━━━━━━━━━ Avaliações ━━━━━━━━━━                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Maria S. ⭐⭐⭐⭐⭐                     há 3 dias  │  │
│  │ "Excelente atendimento! Recomendo muito."         │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ━━━━━━━━━━ Deixe sua Avaliação ━━━━━━━━━━              │
│  Nome: [___________________]                             │
│  Nota: ☆ ☆ ☆ ☆ ☆                                       │
│  Comentário: [____________________]                      │
│  [Enviar Avaliação]                                      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 7.4 Admin Dashboard
```
┌──────────────────────────────────────────────────────────┐
│  Carinho Pet Admin           [Fernando] [Sair]           │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ━━━━━━━━━━ Métricas Gerais ━━━━━━━━━━                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │   26    │ │    5    │ │   150   │ │    8    │        │
│  │Empresas │ │Prestador│ │ Cliques │ │Avaliaçõe│        │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│                                                          │
│  ━━━━━━━━━━ Ações Rápidas ━━━━━━━━━━                    │
│  [+ Nova Empresa]  [+ Novo Prestador]                    │
│  [📊 Analytics]    [⭐ Avaliações Pendentes (3)]        │
│                                                          │
│  ━━━━━━━━━━ Últimas Avaliações ━━━━━━━━━━               │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Pet Shop Amigo Fiel - Maria S. ⭐⭐⭐⭐⭐ [Pendente]│  │
│  │ "Excelente!"  [✓ Aprovar] [✗ Rejeitar]            │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 8. Testing Criteria

### 8.1 Testes Funcionais

| Cenário | Entrada | Resultado Esperado |
|---------|---------|-------------------|
| Busca válida | "Pet Shop" | Lista empresas com "Pet Shop" no nome |
| Busca vazia | "" | Mostra todas as empresas |
| Busca sem resultado | "XYZ123" | Mensagem "Nenhum resultado" |
| Login válido | admin@email, senha123 | Redireciona para /admin |
| Login inválido | admin@email, senhaerrada | Mensagem "Credenciais inválidas" |
| Rate limit | 6 tentativas de login | Bloqueio temporário 429 |
| Avaliação válida | nota: 5, nome: "João" | Sucesso, pendente moderação |
| Avaliação inválida | nota: 0 | Erro validação |

### 8.2 Testes de Segurança

| Teste | Método | Resultado Esperado |
|-------|--------|-------------------|
| XSS em avaliação | `<script>alert(1)</script>` | Texto sanitizado |
| SQL Injection | `'; DROP TABLE--` | Query parametrizada segura |
| Acesso admin sem login | GET /admin | Redirect para /admin/login |
| API admin sem auth | GET /api/admin/analytics | 401 Unauthorized |
| CSRF token inválido | POST sem token | 403 Forbidden |

### 8.3 Testes de Performance

| Métrica | Alvo | Ferramenta |
|---------|------|------------|
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse |
| FID (First Input Delay) | < 100ms | Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| TTFB (Time to First Byte) | < 600ms | WebPageTest |
| Tamanho do bundle JS | < 200KB | next build |

### 8.4 Testes de Acessibilidade

| Critério | Padrão | Status |
|----------|--------|--------|
| Contraste de cores | WCAG 2.1 AA | Pendente |
| Navegação por teclado | Tab order lógica | Pendente |
| Textos alternativos | Todas as imagens | Implementado |
| Labels em formulários | Todos os campos | Implementado |
| Responsividade | Mobile-first | Implementado |

---

## 9. Timeline & Roadmap

### 9.1 Fase 1: MVP (Concluído)
**Duração:** 4 semanas

- [x] Configuração do projeto (Next.js, Prisma, Tailwind)
- [x] Design system com shadcn/ui
- [x] Página inicial com hero e destaques
- [x] Listagem de empresas e prestadores
- [x] Páginas de detalhes
- [x] Sistema de avaliações
- [x] Tracking de cliques
- [x] Painel administrativo básico
- [x] Seed com dados reais de Três Lagoas

### 9.2 Fase 2: Segurança e SEO (Concluído)
**Duração:** 2 semanas

- [x] Implementação de autenticação segura
- [x] Rate limiting e proteção CSRF
- [x] Auditoria de segurança
- [x] Headers de segurança
- [x] SEO on-page (meta tags, Schema.org)
- [x] Sitemap dinâmico
- [x] Configuração robots.txt

### 9.3 Fase 3: Analytics e Melhorias (Em Andamento)
**Duração:** 2 semanas

- [x] Dashboard de analytics
- [x] Filtros por período
- [x] Busca no analytics
- [ ] Gráficos interativos
- [ ] Exportação de relatórios
- [ ] Notificações de novas avaliações

### 9.4 Fase 4: Lançamento (Próximo)
**Duração:** 2 semanas

- [ ] Deploy em produção (Vercel)
- [ ] Configuração de domínio
- [ ] SSL/HTTPS
- [ ] Integração Google Analytics
- [ ] Integração Google AdSense
- [ ] Configuração Google Search Console
- [ ] Testes finais de produção

### 9.5 Fase 5: Pós-Lançamento (Futuro)
**Duração:** Contínuo

- [ ] Cadastro de novas empresas
- [ ] Coleta de feedback de usuários
- [ ] Otimizações de performance
- [ ] Expansão para novas cidades
- [ ] Funcionalidades premium (destaque pago)

---

## 10. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Baixa adesão de empresas | Média | Alto | Oferecer cadastro gratuito inicial |
| Avaliações spam/falsas | Alta | Médio | Moderação manual + rate limiting |
| Performance em escala | Baixa | Alto | Migrar para PostgreSQL se necessário |
| Concorrência de plataformas | Média | Médio | Foco regional e atendimento personalizado |
| Falta de conteúdo | Média | Alto | Seed com dados reais + busca ativa |

---

## 11. Checklist de Aprovação

### Requisitos de Negócio
- [x] Objetivos SMART definidos
- [x] Personas documentadas
- [x] Proposta de valor clara
- [x] Métricas de sucesso estabelecidas

### Requisitos Funcionais
- [x] User stories completas
- [x] Critérios de aceitação definidos
- [x] Fluxos de usuário mapeados
- [x] Wireframes/mockups criados

### Requisitos Técnicos
- [x] Stack tecnológico definido
- [x] Arquitetura documentada
- [x] Modelo de dados especificado
- [x] APIs documentadas
- [x] Requisitos de segurança atendidos

### Planejamento
- [x] Timeline realista
- [x] Riscos identificados
- [x] Dependências mapeadas

---

## Aprovações

| Papel | Nome | Data | Assinatura |
|-------|------|------|------------|
| Product Owner | Fernando | ___/___/___ | ___________ |
| Tech Lead | - | ___/___/___ | ___________ |
| Stakeholder | - | ___/___/___ | ___________ |

---

*Documento gerado automaticamente em 24/12/2024*
