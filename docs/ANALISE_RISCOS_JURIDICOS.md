# Análise de Riscos Jurídicos - Carinho Pet

**Data:** 24 de Dezembro de 2024
**Versão:** 1.0
**Classificação:** Confidencial

---

## Sumário Executivo

Este documento analisa os riscos jurídicos identificados no projeto Carinho Pet, um diretório de serviços pet para a região de Três Lagoas-MS. A análise cobre aspectos de proteção de dados, propriedade intelectual, responsabilidade civil, direito do consumidor e compliance regulatório.

**Nível de Risco Geral:** MÉDIO (gerenciável com implementação de documentos legais básicos)

---

## 1. Proteção de Dados e Privacidade (LGPD)

### 1.1 Riscos Identificados

| Risco | Severidade | Probabilidade | Classificação |
|-------|------------|---------------|---------------|
| Ausência de Política de Privacidade | Alta | Certa | **CRÍTICO** |
| Ausência de Termos de Uso | Alta | Certa | **CRÍTICO** |
| Coleta de IP sem consentimento explícito | Média | Alta | **ALTO** |
| Ausência de banner de cookies | Média | Alta | **ALTO** |
| Dados de empresas sem autorização | Alta | Média | **ALTO** |

### 1.2 Dados Coletados pelo Sistema

**Dados de Usuários (Avaliações):**
- Nome do autor
- IP (para rate limiting)
- User Agent
- Comentário/opinião

**Dados de Empresas/Prestadores:**
- Nome comercial
- CNPJ/CPF (não coletado atualmente)
- Endereço completo
- Telefone, WhatsApp, Email
- Instagram, Website
- Fotos

**Dados de Navegação:**
- Cliques em contatos (tracking)
- IP do visitante
- User Agent
- Timestamp

### 1.3 Violações Potenciais da LGPD

1. **Art. 7º - Base Legal**: Não há informação clara sobre a base legal para tratamento dos dados
2. **Art. 9º - Direito de Acesso**: Não há mecanismo para titulares acessarem seus dados
3. **Art. 18º - Direitos do Titular**: Não há canal para exercício de direitos (retificação, exclusão)
4. **Art. 41º - Encarregado**: Não há DPO designado
5. **Art. 46º - Segurança**: Implementada parcialmente (falta criptografia em repouso)

### 1.4 Recomendações Urgentes

```
PRIORIDADE CRÍTICA (Implementar antes do lançamento):
□ Criar Política de Privacidade completa
□ Criar Termos de Uso
□ Implementar banner de consentimento de cookies
□ Criar formulário de contato para direitos LGPD
□ Documentar bases legais para cada tratamento
```

---

## 2. Cadastro de Empresas Terceiras (Dados Públicos)

### 2.1 Base Legal - Dados Manifestamente Públicos

**LGPD Art. 7º, §4º**: O tratamento de dados pessoais **tornados manifestamente públicos pelo titular** dispensa consentimento, observados os princípios da lei.

**LGPD Art. 7º, §3º**: Dados públicos podem ser tratados para novas finalidades desde que observados os propósitos legítimos e compatíveis com a finalidade original.

### 2.2 Análise do Seed de Dados

O arquivo `prisma/seed.ts` contém **26 empresas reais** com dados obtidos de **fontes públicas**:

| Fonte | Tipo de Dado | Risco |
|-------|--------------|-------|
| Google Meu Negócio | Endereço, telefone, horário | **BAIXO** |
| Sites próprios das empresas | Todos os dados comerciais | **BAIXO** |
| Instagram/Facebook | Contatos, descrição | **BAIXO** |
| Listas telefônicas online | Telefone, endereço | **BAIXO** |

**Justificativa Legal:**
- Dados **comerciais** (não pessoais sensíveis)
- Empresas **publicaram voluntariamente** essas informações
- Finalidade **compatível**: conectar clientes aos serviços
- **Não há** uso para marketing direto ou spam

### 2.3 Riscos Residuais

| Risco | Severidade | Probabilidade | Classificação |
|-------|------------|---------------|---------------|
| Informações desatualizadas/incorretas | Média | Média | **MÉDIO** |
| Uso de marcas/logos sem permissão | Média | Média | **MÉDIO** |
| Solicitação de remoção não atendida | Média | Baixa | **MÉDIO** |
| Empresa fechou e dados permanecem | Baixa | Média | **BAIXO** |

### 2.4 Obrigações Mesmo com Dados Públicos

Apesar de não precisar de autorização prévia, a LGPD ainda exige:

1. **Canal de remoção**: Titular pode solicitar exclusão a qualquer momento
2. **Correção de dados**: Atender pedidos de retificação
3. **Transparência**: Informar de onde vieram os dados
4. **Atualização**: Manter dados razoavelmente atualizados

### 2.5 Recomendações

```
PRIORIDADE MÉDIA:
□ Criar página "Reivindique seu Cadastro" para empresas
□ Implementar canal de solicitação de remoção/correção
□ Adicionar disclaimer sobre fonte dos dados
□ Criar processo de atualização periódica (a cada 6 meses)
□ Responder solicitações em até 15 dias úteis
□ Documentar fonte de cada cadastro (Google, site, etc.)
```

**Disclaimer Recomendado (adicionar no rodapé das páginas de empresas):**
```
"Informações obtidas de fontes públicas (Google, sites oficiais,
redes sociais). É responsável por este estabelecimento?
Atualize ou remova seu cadastro clicando aqui."
```

### 2.6 Questão de Propriedade Intelectual (Separada da LGPD)

**Atenção**: O uso de **logos e marcas** é uma questão de Propriedade Intelectual, não de LGPD:

- Atualmente o sistema usa placeholder genérico (`/images/logo.png`)
- Quando usar logos reais, obter autorização ou usar apenas nome textual
- Nomes comerciais em texto são permitidos (fins informativos)

---

## 3. Sistema de Avaliações

### 3.1 Riscos Identificados

| Risco | Severidade | Probabilidade | Classificação |
|-------|------------|---------------|---------------|
| Avaliações falsas/difamatórias | Alta | Média | **ALTO** |
| Responsabilidade por conteúdo de terceiros | Alta | Média | **ALTO** |
| Ausência de identificação do avaliador | Média | Alta | **MÉDIO** |
| Manipulação de avaliações | Média | Média | **MÉDIO** |

### 3.2 Análise do Sistema Atual

**Pontos Positivos:**
- Moderação prévia (avaliações precisam ser aprovadas)
- Sanitização de entrada (proteção XSS)
- Rate limiting (prevenção de spam)

**Pontos de Atenção:**
- Não há verificação de identidade do avaliador
- Não há exigência de comprovação de uso do serviço
- Nome pode ser fictício
- Não há possibilidade de resposta da empresa

### 3.3 Marco Civil da Internet (Lei 12.965/2014)

**Art. 19**: O provedor de aplicações só pode ser responsabilizado por danos decorrentes de conteúdo gerado por terceiros se, após ordem judicial específica, não tomar as providências para tornar indisponível o conteúdo.

**Art. 21**: O provedor deve disponibilizar mecanismo para comunicação de violações.

### 3.4 Recomendações

```
PRIORIDADE ALTA:
□ Implementar sistema de denúncia de avaliações
□ Criar processo documentado de remoção de conteúdo
□ Permitir resposta do estabelecimento às avaliações
□ Armazenar logs de IP e data por 6 meses (mínimo legal)
□ Adicionar termos de uso para avaliadores
□ Considerar verificação por email/telefone

DISCLAIMER SUGERIDO:
"As avaliações são de responsabilidade exclusiva de seus
autores e não representam a opinião do Carinho Pet.
Avaliações falsas ou difamatórias serão removidas."
```

---

## 4. Propriedade Intelectual

### 4.1 Riscos Identificados

| Risco | Severidade | Probabilidade | Classificação |
|-------|------------|---------------|---------------|
| Uso de logos sem autorização | Alta | Alta | **CRÍTICO** |
| Uso de fotos protegidas | Alta | Média | **ALTO** |
| Conflito de marca "Carinho Pet" | Média | Baixa | **MÉDIO** |
| Uso de imagens de banco sem licença | Média | Média | **MÉDIO** |

### 4.2 Análise de Assets

**Imagens no Projeto:**
- `/images/logo.png` - Logo do Carinho Pet (próprio?)
- `/images/fundo.png` - Imagem de fundo (licença?)
- `/images/quem_somos.png` - Imagem institucional (licença?)
- Logos de empresas terceiras (placeholder `/images/logo.png`)

### 4.3 Recomendações

```
PRIORIDADE CRÍTICA:
□ Verificar registro da marca "Carinho Pet" no INPI
□ Documentar licença de todas as imagens utilizadas
□ Obter autorização para uso de logos de terceiros
□ Usar imagens próprias ou com licença comercial
□ Remover placeholder de logo genérico para empresas

BUSCA INPI SUGERIDA:
- Pesquisar "Carinho Pet" em https://busca.inpi.gov.br
- Verificar classes 35 (publicidade), 44 (serviços veterinários)
```

---

## 5. Responsabilidade Civil

### 5.1 Riscos Identificados

| Risco | Severidade | Probabilidade | Classificação |
|-------|------------|---------------|---------------|
| Danos por informações incorretas | Alta | Média | **ALTO** |
| Indicação de serviço inadequado | Alta | Baixa | **MÉDIO** |
| Falha em serviço de empresa listada | Média | Média | **MÉDIO** |
| Vazamento de dados | Alta | Baixa | **MÉDIO** |

### 5.2 Cenários de Risco

**Cenário 1**: Usuário vai a endereço incorreto listado no site
- Risco: Danos materiais e morais
- Mitigação: Disclaimer + processo de verificação

**Cenário 2**: Empresa listada presta serviço ruim
- Risco: Associação com o diretório
- Mitigação: Termos claros de isenção

**Cenário 3**: Telefone incorreto pertence a terceiro
- Risco: Constrangimento, assédio
- Mitigação: Verificação de dados + canal de correção

### 5.3 Recomendações

```
PRIORIDADE ALTA:
□ Adicionar disclaimers em todas as páginas de empresas
□ Criar canal de correção de informações
□ Documentar fonte de cada dado publicado
□ Implementar processo de verificação periódica
□ Considerar seguro de responsabilidade civil

DISCLAIMER MODELO:
"O Carinho Pet é um diretório de informações e não se
responsabiliza pela qualidade dos serviços prestados
pelos estabelecimentos listados. Verifique sempre as
informações diretamente com o estabelecimento."
```

---

## 6. Direito do Consumidor (CDC)

### 6.1 Aplicabilidade

O Carinho Pet, como plataforma gratuita de listagem, tem relação de consumo limitada:

- **Com usuários**: Relação de consumo indireta (serviço gratuito)
- **Com empresas**: Potencial relação B2B (se houver cobrança futura)
- **Com anunciantes**: Relação comercial (AdSense)

### 6.2 Riscos Identificados

| Risco | Severidade | Probabilidade | Classificação |
|-------|------------|---------------|---------------|
| Publicidade enganosa | Média | Baixa | **BAIXO** |
| Oferta de serviço pago sem transparência | Média | Baixa | **BAIXO** |
| Coleta de dados sem informação clara | Média | Alta | **MÉDIO** |

### 6.3 Recomendações

```
PRIORIDADE MÉDIA:
□ Identificar claramente conteúdo patrocinado/anúncios
□ Não fazer promessas de resultado sobre serviços listados
□ Manter transparência sobre modelo de negócio
□ Se cobrar por destaque, informar claramente
```

---

## 7. Compliance Regulatório

### 7.1 CRMV e Serviços Veterinários

**Risco**: Listar clínicas/hospitais veterinários pode implicar em responsabilidade se:
- Estabelecimento não tiver registro no CRMV
- Profissionais não estiverem habilitados
- Serviços oferecidos forem irregulares

**Recomendação**: Adicionar campo para número de registro CRMV e verificar

### 7.2 Vigilância Sanitária

**Risco**: Pet shops e estabelecimentos precisam de alvará sanitário
- Divulgar estabelecimento irregular pode gerar corresponsabilidade

**Recomendação**: Solicitar comprovante de regularidade no cadastro

### 7.3 Google AdSense

**Requisitos de Compliance:**
- Política de Privacidade obrigatória
- Não clicar em próprios anúncios
- Conteúdo original e não enganoso
- Identificação clara de anúncios

---

## 8. Plano de Ação Consolidado

### 8.1 Ações Obrigatórias (Antes do Lançamento)

| # | Ação | Responsável | Prazo | Status |
|---|------|-------------|-------|--------|
| 1 | Criar Política de Privacidade | Jurídico/Dev | 7 dias | Pendente |
| 2 | Criar Termos de Uso | Jurídico/Dev | 7 dias | Pendente |
| 3 | Implementar banner de cookies | Dev | 3 dias | Pendente |
| 4 | Criar canal de contato (remoção/correção) | Dev | 3 dias | Pendente |

### 8.2 Ações Recomendadas (30 dias após lançamento)

| # | Ação | Responsável | Prazo |
|---|------|-------------|-------|
| 5 | Adicionar disclaimers nas páginas de empresas | Dev | 7 dias |
| 6 | Criar página "Reivindique seu Cadastro" | Dev | 15 dias |
| 7 | Implementar sistema de denúncia de avaliações | Dev | 15 dias |
| 8 | Verificar licenças de imagens | Design | 15 dias |
| 9 | Pesquisar marca "Carinho Pet" no INPI | Jurídico | 15 dias |

### 8.3 Ações de Melhoria Contínua (90 dias)

| # | Ação | Responsável | Prazo |
|---|------|-------------|-------|
| 10 | Implementar resposta de empresas às avaliações | Dev | 45 dias |
| 11 | Criar processo de atualização periódica de dados | Ops | 60 dias |
| 12 | Documentar fonte de cada cadastro | Ops | 60 dias |
| 13 | Avaliar necessidade de registro de marca | Jurídico | 90 dias |

---

## 9. Documentos Legais Necessários

### 9.1 Lista de Documentos

1. **Política de Privacidade** - Obrigatória
2. **Termos de Uso** - Obrigatória
3. **Termo de Adesão de Empresas** - Recomendada
4. **Política de Cookies** - Obrigatória
5. **Termos de Avaliação** - Recomendada
6. **Política de Remoção de Conteúdo** - Recomendada
7. **Registro de Atividades de Tratamento (LGPD)** - Obrigatória

### 9.2 Estrutura Sugerida - Política de Privacidade

```
1. Introdução e Identificação do Controlador
2. Dados Coletados
   - Dados de navegação
   - Dados de avaliações
   - Dados de empresas
3. Finalidades do Tratamento
4. Base Legal (LGPD Art. 7º)
5. Compartilhamento de Dados
6. Transferência Internacional
7. Retenção de Dados
8. Direitos do Titular
9. Segurança
10. Cookies
11. Alterações na Política
12. Contato do Encarregado
```

---

## 10. Conclusão e Recomendações Finais

### 10.1 Resumo de Riscos por Área

| Área | Nível de Risco | Urgência |
|------|----------------|----------|
| LGPD/Privacidade | **ALTO** | Imediata |
| Dados de Terceiros (Públicos) | **BAIXO-MÉDIO** | Média |
| Avaliações | **MÉDIO** | Alta |
| Propriedade Intelectual | **MÉDIO** | Média |
| Responsabilidade Civil | **MÉDIO** | Média |
| Consumidor | **BAIXO** | Baixa |
| Regulatório | **BAIXO-MÉDIO** | Baixa |

**Nível de Risco Geral Revisado:** MÉDIO (gerenciável com ações pontuais)

### 10.2 Recomendação Geral

**LANÇAMENTO VIÁVEL** desde que implementados os itens mínimos:

**Obrigatórios antes do lançamento:**
1. ✅ Política de Privacidade
2. ✅ Termos de Uso
3. ✅ Banner de consentimento de cookies
4. ✅ Canal de contato para remoção/correção de dados

**Recomendados (podem ser implementados após lançamento):**
- Verificação de licenças de imagens
- Pesquisa de marca no INPI
- Página "Reivindique seu Cadastro"
- Sistema de denúncia de avaliações

### 10.3 Justificativa para Dados de Terceiros

Os dados de empresas listados foram obtidos de **fontes públicas** (Google Meu Negócio, sites oficiais, redes sociais), o que configura tratamento de **dados manifestamente públicos** conforme LGPD Art. 7º, §4º.

**Não é necessário** obter autorização prévia, desde que:
- Seja mantido canal para solicitação de remoção/correção
- Os dados sejam usados apenas para fins informativos
- Não haja uso para marketing direto ou spam

---

## Histórico de Revisões

| Versão | Data | Autor | Alterações |
|--------|------|-------|------------|
| 1.0 | 24/12/2024 | Claude | Versão inicial |
| 1.1 | 24/12/2024 | Claude | Revisão: dados públicos não requerem autorização prévia (LGPD Art. 7º, §4º). Nível de risco geral reduzido de MÉDIO-ALTO para MÉDIO. |

---

**AVISO LEGAL**: Este documento é uma análise preliminar e não substitui consultoria jurídica especializada. Recomenda-se a contratação de advogado especializado em direito digital para revisão e implementação das recomendações.
