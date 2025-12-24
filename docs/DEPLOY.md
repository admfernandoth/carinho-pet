# Guia de Deploy - Carinho Pet

## Visão Geral da Estratégia

O Carinho Pet utiliza uma estratégia de deploy automatizada com:

- **GitHub Actions** para CI/CD
- **Vercel** para hospedagem
- **Dependabot** para atualizações de segurança

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Develop   │────▶│    Main     │────▶│  Production │
│   Branch    │ PR  │   Branch    │ Auto│   (Vercel)  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       │ CI                │ CI + Deploy
       ▼                   ▼
  ┌─────────┐        ┌─────────┐
  │ Preview │        │  Prod   │
  │ Deploy  │        │ Deploy  │
  └─────────┘        └─────────┘
```

---

## Ambientes

| Ambiente | Branch | URL | Trigger |
|----------|--------|-----|---------|
| Preview | PR para main | `*.vercel.app` | Pull Request |
| Production | main | `carinhopet.com.br` | Push/Merge |

---

## Pré-requisitos

### 1. Secrets do GitHub

Configure os seguintes secrets no repositório:

```
Settings > Secrets and variables > Actions > New repository secret
```

| Secret | Descrição | Como Obter |
|--------|-----------|------------|
| `VERCEL_TOKEN` | Token de API da Vercel | Vercel Dashboard > Settings > Tokens |
| `VERCEL_ORG_ID` | ID da organização | `vercel link` e ver `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | ID do projeto | `vercel link` e ver `.vercel/project.json` |

### 2. Variáveis de Ambiente na Vercel

Configure no Dashboard da Vercel:

```
Project Settings > Environment Variables
```

| Variável | Produção | Preview | Descrição |
|----------|----------|---------|-----------|
| `DATABASE_URL` | ✅ | ✅ | URL do banco PostgreSQL |
| `ADMIN_EMAIL` | ✅ | ✅ | Email do administrador |
| `ADMIN_PASSWORD_HASH` | ✅ | ✅ | Hash bcrypt da senha |
| `NEXT_PUBLIC_SITE_URL` | ✅ | - | URL do site (SEO) |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | ✅ | - | ID do Google AdSense |

---

## Fluxo de Deploy

### Deploy de Preview (Pull Request)

1. Abra um PR para a branch `main`
2. CI roda automaticamente (lint, typecheck, build)
3. Se CI passar, deploy de preview é criado
4. URL do preview é comentada no PR
5. Revise as mudanças no preview
6. Após aprovação, faça merge

### Deploy de Produção

1. Merge do PR para `main`
2. CI roda novamente
3. Deploy automático para produção
4. Release tag é criada no GitHub
5. Verifique o site em produção

---

## Comandos Locais

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar banco local
npx prisma db push
npx prisma db seed

# Iniciar servidor dev
npm run dev
```

### Build e Preview

```bash
# Build de produção
npm run build

# Iniciar build localmente
npm start

# Verificar types
npx tsc --noEmit

# Rodar lint
npm run lint
```

### Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Linkar projeto
vercel link

# Deploy de preview
vercel

# Deploy de produção
vercel --prod

# Ver logs
vercel logs
```

---

## Banco de Dados

### Migração para PostgreSQL (Produção)

Para produção, recomendamos migrar de SQLite para PostgreSQL:

1. **Criar banco PostgreSQL**
   - Supabase, Neon, Railway ou Render

2. **Atualizar schema.prisma**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Migrar dados**
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

### Backup

```bash
# SQLite (desenvolvimento)
cp prisma/dev.db prisma/backup.db

# PostgreSQL (produção)
pg_dump $DATABASE_URL > backup.sql
```

---

## Monitoramento

### Logs da Vercel

```bash
# Via CLI
vercel logs --follow

# Via Dashboard
Vercel > Project > Deployments > Functions
```

### Analytics

- **Vercel Analytics**: Habilitado automaticamente
- **Google Analytics**: Configurar `NEXT_PUBLIC_GA_ID`
- **Dashboard interno**: `/admin/analytics`

---

## Rollback

### Via Vercel Dashboard

1. Acesse `Vercel > Project > Deployments`
2. Encontre o deploy anterior funcionando
3. Clique nos três pontos > "Promote to Production"

### Via CLI

```bash
# Listar deploys
vercel ls

# Promover deploy específico
vercel promote <deployment-url>
```

---

## Troubleshooting

### Build falha no CI

1. Verifique os logs do GitHub Actions
2. Rode `npm run build` localmente
3. Verifique se todas as env vars estão configuradas

### Deploy falha na Vercel

1. Verifique os logs no dashboard
2. Confirme que `prisma generate` está no build command
3. Verifique limites do plano (Hobby: 100 deploys/dia)

### Banco não conecta

1. Verifique `DATABASE_URL` na Vercel
2. Confirme que o IP da Vercel tem acesso ao banco
3. Teste conexão localmente com a URL de produção

### Rate limiting em produção

1. Verifique logs de auditoria em `/api/admin/analytics`
2. Ajuste limites em `src/lib/rate-limit.ts`
3. Considere usar Redis para rate limiting distribuído

---

## Checklist de Deploy

### Antes do Deploy

- [ ] Todos os testes passam localmente
- [ ] Build passa sem erros
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados migrado
- [ ] Assets otimizados

### Após o Deploy

- [ ] Site carrega corretamente
- [ ] Login admin funciona
- [ ] Avaliações podem ser enviadas
- [ ] Analytics registra cliques
- [ ] SEO tags corretas (verificar com dev tools)
- [ ] Performance aceitável (Lighthouse > 80)

---

## Contatos

- **Desenvolvedor**: Fernando (admfernandoth@gmail.com)
- **Repositório**: https://github.com/admfernandoth/carinho-pet
- **Produção**: https://carinhopet.com.br (a configurar)
