
# 🐾 CARINHO PET WEB3 HUB – Documento de Contexto e Modelo de Negócios

## 🌍 1. Visão Geral do Projeto

**Carinho Pet Web3 Hub** é uma plataforma que conecta **tutores** (donos de pets) e **cuidadores/adestradores** de confiança, utilizando **inteligência artificial** para matchmaking inteligente e **tecnologia Web3** (via Solana, futuramente) para pagamentos, cashback e seguros, **com experiência 100% Web2-like**.

O objetivo é oferecer **segurança, confiança e benefícios reais** a quem precisa de hospedagem ou cuidado para pets — sem exigir do usuário qualquer conhecimento técnico sobre blockchain.

---

## 💡 2. Proposta de Valor

| Público | Benefício principal |
|----------|--------------------|
| **Tutor (cliente)** | Segurança, cashback e seguro automático para seu pet, com cuidadores verificados. |
| **Cuidador (prestador)** | Nova fonte de renda, reputação validada por IA e cashback em pontos. |
| **Plataforma** | Receita com comissões, seguros e economia interna baseada em token ($PETLOVE). |

---

## 🧠 3. Inteligência Artificial Integrada

### 🤖 PetMatch Agent
- Recomendação personalizada de cuidadores conforme perfil do tutor e do pet.
- Analisa raça, idade, comportamento, histórico e preferências.
- Retorna *Top 3* cuidadores com **score de afinidade (0–100)**.

### 🩺 RiskAgent
- Avalia risco de cada hospedagem com base no histórico do cuidador e tipo de pet.
- Sugere prêmio de seguro proporcional ao risco.
- Analisa evidências (imagens, descrições) em caso de sinistro.

### 💬 Concierge AI
- Chat interativo guia o usuário: “Quer incluir seguro?”, “Deseja ativar cashback?”.
- Interface amigável e humanizada substitui jargões técnicos.

---

## 💰 4. Modelo de Negócio

### Fontes de Receita
1. Comissão por serviço (15–25%)
2. Prêmios de seguro
3. Taxa de compra de tokens/pontos
4. Parcerias com clínicas, petshops e marcas
5. Programa de fidelidade $PETLOVE

### Ticket médio
- Hospedagem: R$ 150–300  
- Adestramento: R$ 200–400  
- Seguro: R$ 5–15 (por reserva)

---

## 🛡️ 5. Seguro PetCare Shield

### Coberturas
1. Acidentes durante hospedagem
2. Danos a terceiros
3. Furto ou fuga

### Funcionamento no MVP
- Tutor escolhe “Incluir seguro” no checkout
- Backend calcula prêmio via IA
- Tutor abre sinistro com evidências
- IA analisa e recomenda “Aprovar / Negar”
- Backend reembolsa ou gera crédito em pontos

---

## 💎 6. Token $PETLOVE (Carinho Points)

### Ciclo do Token
```
Usuário compra $PETLOVE → habilita cashback
Faz reservas → recebe cashback em $PETLOVE
Usa tokens em novos serviços → parte queimada
Token circula → fidelização aumenta
```

### Regras e Parâmetros
| Item | Valor |
|------|-------|
| Cashback padrão | 3–5% |
| Compra mínima | R$ 50 |
| Queima | 10% dos tokens usados |
| Staking | bônus e status PetGold |
| Exibição | “Carinho Points” |
| Conversão | 1 Point = 1 $PETLOVE |

---

## 🧍 7. Usuários e Perfis

### Tutores
- Cadastro simples (email, celular)
- Informam pets e preferências
- Podem optar por seguro e cashback

### Cuidadores
- Cadastro com verificação
- Informam experiência, animais aceitos, disponibilidade
- Ganham pontos e reputação pública

### Administradores
- Monitoram KPIs e cuidadores
- Configuram taxas e políticas

---

## ⚙️ 8. Arquitetura Técnica do MVP (sem Anchor)

| Camada | Tecnologia | Função |
|---------|-------------|--------|
| Frontend | React + Vite + Bootstrap | UI principal |
| Backend | Node.js + TypeScript + Fastify | API REST |
| Banco | Postgres + Prisma | Dados persistentes |
| IA Layer | LangChain + OpenAI | Match e risco |
| Auth | JWT + Magic.link | Login Web2 |
| Payments | Pix/Card mock (Solana Pay futura) | Pagamentos e cashback |

---

## 📊 9. Métricas-Chave

| Indicador | Meta (Ano 1) |
|------------|---------------|
| Usuários ativos | 10.000 |
| Reservas | 8.000 |
| Seguros | 2.000 |
| Fidelização | 60% |
| Retenção | 40% |
| NPS | >70 |

---

## 🚀 10. Roadmap

| Fase | Entregas |
|------|-----------|
| MVP Web2.5 | Frontend + Backend + IA + Cashback mock |
| Token real | Integração Solana Pay + $PETLOVE real |
| Seguro descentralizado | Contratos on-chain |
| App Mobile | iOS/Android + Chat IA |
| Expansão LATAM | Internacionalização |

---

## 📈 11. Valuation (5 anos)

| Indicador | Estimativa |
|------------|-------------|
| Receita (ano 5) | R$ 32 milhões |
| Lucro líquido | R$ 6–10 milhões |
| Valuation | R$ 100–250 milhões |

---

## ⚠️ 12. Riscos Principais

| Risco | Mitigação |
|--------|------------|
| Adoção baixa | UX Web2-first |
| Regulação | Estrutura híbrida e compliance |
| Concorrência | IA e cashback diferenciados |
| Custos | Escala automatizada e cashback controlado |

---

## 💼 13. Estrutura de Receita

| Receita | Destino |
|----------|----------|
| Comissão | 50% plataforma / 50% cuidador |
| Seguro | 70% pool / 30% plataforma |
| Compra de pontos | 95% swap / 5% margem |
| Cashback | 3–5% em $PETLOVE |

---

## 🔮 14. Futuro do Ecossistema

- NFTs de status (Silver/Gold/Platinum)
- Marketplace para petshops e clínicas
- IA de diagnóstico preventivo
- Governança descentralizada (DAO)

---

## 📘 15. Conclusão

O **Carinho Pet Web3 Hub** une confiança Web2 e automação Web3.  
O MVP Web2.5 garante adoção rápida e simplicidade.  
Com IA, cashback e seguros integrados, cria-se um ecossistema seguro e sustentável para o cuidado animal.
