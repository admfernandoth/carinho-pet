# Contribuindo para o Carinho Pet

Obrigado pelo interesse em contribuir com o Carinho Pet! Este documento fornece diretrizes para contribuições.

## Código de Conduta

Este projeto segue um código de conduta. Ao participar, você concorda em manter um ambiente respeitoso e inclusivo.

## Como Contribuir

### Reportando Bugs

1. Verifique se o bug já não foi reportado nas [Issues](https://github.com/admfernandoth/carinho-pet/issues)
2. Se não encontrar, abra uma nova issue usando o template de Bug Report
3. Inclua o máximo de detalhes possível

### Sugerindo Features

1. Verifique se a feature já não foi sugerida nas [Issues](https://github.com/admfernandoth/carinho-pet/issues)
2. Abra uma nova issue usando o template de Feature Request
3. Descreva claramente o problema e a solução proposta

### Enviando Pull Requests

1. Fork o repositório
2. Crie uma branch a partir de `main`: `git checkout -b feature/minha-feature`
3. Faça suas alterações seguindo o estilo do código
4. Commit suas mudanças: `git commit -m "feat: adiciona nova feature"`
5. Push para a branch: `git push origin feature/minha-feature`
6. Abra um Pull Request

## Padrões de Código

### Commits

Seguimos Conventional Commits:

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

### TypeScript

- Use tipos explícitos
- Evite `any`
- Prefira interfaces a types quando possível

### React

- Componentes funcionais com hooks
- Props tipadas com interface
- Nomes de componentes em PascalCase

### CSS/Tailwind

- Use classes do Tailwind
- Evite CSS customizado quando possível
- Mobile-first

## Ambiente de Desenvolvimento

```bash
# Clone o repositório
git clone https://github.com/admfernandoth/carinho-pet.git
cd carinho-pet

# Instale dependências
npm install

# Configure o banco
npx prisma db push
npx prisma db seed

# Inicie o servidor
npm run dev
```

## Dúvidas?

Abra uma discussão no [GitHub Discussions](https://github.com/admfernandoth/carinho-pet/discussions) ou envie um email para admfernandoth@gmail.com.
