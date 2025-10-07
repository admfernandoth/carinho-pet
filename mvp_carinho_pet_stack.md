# Plano de Stack Tecnológico — MVP CARINHO PET (Web2.5)

## 1. Resumo da Arquitetura

Usuário (web/mobile) → Frontend React (Vite) → API REST (Node/TypeScript) → Banco (Postgres) + IA (LangChain/OpenAI) + Custody/Payments (Magic.link, PSP/Pix) → Background Workers (Queue) → Storage (S3) → Observability & CI/CD

**Principais domínios:** Autenticação/Perfil, Profissionais, Pets, Bookings, Payments, Points (Token off-chain), Insurance (simulado), AI Agents (match, risk, claim), Admin/KPIs

## 2. Stack recomendado

### Frontend
- **Framework:** React + TypeScript (Vite)
- **UI:** Bootstrap 5 + style.css + componentes reutilizáveis
- **State Management:** React Query + Zustand ou Jotai
- **Forms & Validation:** React Hook Form + Zod
- **Routing:** React Router
- **Auth UI:** Magic.link (custodial login via email/OTP) — fallback JWT
- **i18n:** react-intl / i18next
- **Build:** Vite + esbuild

### Backend
- **Linguagem:** Node.js LTS (v20) + TypeScript
- **Framework:** Fastify (recomendado) ou Express
- **ORM:** Prisma (Postgres)
- **Queue/Workers:** BullMQ (Redis) ou Bee-Queue
- **Auth:** JWT + Magic.link, RBAC simples
- **AI integration:** LangChainJS + OpenAI (PetMatch, RiskAgent, ClaimEvaluator)
- **Payments:** Gateway Pix (Gerencianet, Pagar.me) + Stripe, abstração futura Solana Pay
- **Storage:** S3-compatible (DigitalOcean Spaces, AWS S3)
- **Image processing:** Sharp
- **Validation & Security:** Zod, helmet, rate-limit, express-slow-down

### Database
- **Primary:** Postgres (managed)
- **Cache/Session:** Redis (managed)
- **Vector DB (AI):** Pinecone, Weaviate ou FAISS local

### DevOps / Infra
- **Containerization:** Docker + docker-compose
- **Hosting:**
  - Opção rápida: Vercel (frontend) + Railway/Render/Heroku (backend, Postgres, Redis)
  - Opção controlada: AWS (ECS/Fargate + RDS + ElastiCache + S3 + CloudFront)
- **CI/CD:** GitHub Actions
- **Secrets management:** GitHub Secrets / Vault
- **Domain & SSL:** Cloudflare (DNS + WAF + SSL)

### Observabilidade & Segurança
- **Logging:** pino → LogDNA / Datadog / Papertrail
- **Metrics:** Prometheus + Grafana
- **Error tracking:** Sentry
- **Monitoring:** UptimeRobot / Pingdom
- **Backups:** automated RDS backups (30 dias)
- **Secrets/PCI:** tokenização via PSP

### Testing
- **Unit:** Jest + ts-node
- **Integration:** Supertest
- **E2E:** Playwright
- **AI test harness:** deterministic seeds + mocked LLM

## 3. Componentes / Micro-serviços

Monorepo modular:
- `frontend/` — React app
- `backend/` — API (Fastify), jobs, libs
- `worker/` — background jobs
- `infra/` — docker-compose, terraform
- `scripts/` — seed data, migrations, test runners

## 4. Esquema de dados (resumo)

**User:** id, name, email, phone, role, verified, createdAt

**Caregiver:** id, userId, bio, skills, photos, city, ratingAvg, vetCert, kycStatus

**Pet:** id, ownerId, name, species, breed, dob, healthNotes, vaccines

**Booking:** id, petId, caregiverId, startDate, endDate, priceCents, currency, status, insurancePolicyId, escrowRef

**TokenBalance:** userId, balancePoints, lockedAmount, stakedAmount, lastUpdated

**InsurancePolicy:** id, bookingId, provider, coverageCents, premiumCents, status

**Claim:** id, policyId, bookingId, status, evidenceUrls, recommendedAction, resolutionAmount

**Transaction:** id, userId, type, amountCents, currency, meta, createdAt

## 5. API Endpoints essenciais

- `POST /auth/register` — {name,email,phone,password} → 201 + user
- `POST /auth/login` — Magic.link token → JWT
- `GET /professionals` — filters, pagination
- `GET /professionals/:id`
- `POST /bookings` — {petId, caregiverId, start, end, usePoints?, includeInsurance?}
- `POST /payments/checkout` — paymentIntent (pix/card) ou point purchase link
- `POST /payments/webhook` — PSP webhook
- `POST /points/buy` — fiat → points
- `POST /points/apply` — apply points to booking
- `POST /ai/match` — pet + preferences → ranked caregivers
- `POST /claims` — {policyId, bookingId, evidenceUrls, description}
- `GET /admin/kpis` — protected

## 6. IA: design e integração

**Agentes:**
- PetMatch Agent
- RiskAgent
- ClaimEvaluator

**Infra IA:**
- Embeddings: OpenAI / local → Pinecone/Weaviate
- LLM: GPT-4o-mini / GPT-4
- Pipeline: LangChainJS
- Custos: monitorar token usage

## 7. UX / Product constraints

- Abstrair cripto: mostrar "Carinho Points" e "Comprar pontos R$"
- Onboarding: Magic.link, email+OTP
- Checkout: 1 page, toggles (insurance, use points, payment)
- Receipts: gerar PDF via Puppeteer/wkhtmltopdf

## 8. Segurança e Compliance

- KYC: caregivers upload RG/CPF + comprovante
- LGPD compliance
- PCI scope minimizado via PSP
- TLS everywhere, S3 encryption, DB at rest
- Rate limiting & brute force protection

## 9. Observabilidade e SLA

- SLA MVP: API 99.5%, frontend 99.9%
- Alertas: erro >1% 5min, queue backlog alto, CPU/memory high
- Runbooks: incident triage, rollback, contatos

## 10. CI/CD e Releases

- CI: GitHub Actions (PR: lint+tests, merge: full integration + deploy staging)
- Deploy production: manual approval
- Release: feature branches + trunk-based, flags para features

## 11. Custos estimados (mês 1–6)

- Hosting & infra: US$200–$1,000
- OpenAI: US$200–$2,000
- Payments fees: ~2.5–5%
- Observability: US$50–$500
- Domain/SSL: US$20–$100
- Total estimado: R$5k–R$35k / mês

## 12. Time necessário e papéis (MVP 10–12 semanas)

- 1 Product Owner / PM
- 1 Tech Lead / Fullstack
- 2 Backend Engineers
- 1 Frontend Engineer
- 1 ML/AI Engineer (meio período)
- 1 DevOps / SRE (meio período)
- 1 QA (opcional part-time)

**Sprints:**
- Sprint 1–2: infra + CI + auth + frontend shell + DB schema + basic APIs
- Sprint 3–4: professionals CRUD + booking flow + AI stub
- Sprint 5–6: payments flow + points logic + claims UI + worker queue
- Sprint 7–8: AI productionization, analytics, e2e tests
- Sprint 9–10: hardening, security, load testing, launch prep

## 13. Riscos técnicos & mitigação

- Custodial risk: segregação fundos, auditoria, KYC/AML
- IA falhas: fallback humano
- Escalabilidade IA: cache resultados, limitar calls
- Regulação de seguros: iniciar como serviço de proteção + consultoria jurídica

## 14. Tarefas imediatas (primeiros 7 dias)

- Criar repositório monorepo + README
- Configurar CI pipeline básico
- Setup infra dev (docker-compose)
- Gerar Prisma schema + migrations
- Converter index.html + style.css para React Home
- Implementar endpoints stub GET /professionals e POST /ai/match
- Implementar fluxo checkout mock + POST /points/buy

## 15. Checklist antes do lançamento beta

- Onboarding e compra de pontos testado
- IA PetMatch com qualidade aceitável
- Payments integrados (Pix sandbox)
- Admin dashboard para monitoramento
- Testes e e2e cobrindo fluxos principais
- Política de privacidade e termos de uso (LGPD compliant)

