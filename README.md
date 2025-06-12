# FormaTour

Sistema de cursos online para formação em turismo cultural.

## Tecnologias Utilizadas

- **Next.js 15** (App Router, SSR/SSG, React 18)
- **React 18**
- **TypeScript**
- **Tailwind CSS** (estilização)
- **Zustand** (estado global para loading)
- **Parse/Back4App** (backend BaaS para cursos, usuários e inscrições)
- **Vercel** (deploy)

## Instalação e Setup

1. **Clone o repositório:**
   ```powershell
   git clone <url-do-repo>
   cd front_formatour
   ```

2. **Instale as dependências:**
   ```powershell
   npm install
   ```
   Isso instala:
   - next
   - react
   - react-dom
   - tailwindcss
   - zustand
   - typescript
   - @types/react, @types/node, etc.

3. **Configuração do ambiente:**
   - As variáveis de ambiente do Parse/Back4App estão configuradas ao back4app privado da aplicação, que é possível acessar somente com o email de um dos integrantes do time por questão de segurança.
   - As rotas da API (`/api/courses`, `/api/enrollments`, `/api/user`) estão conectadas ao backend.

4. **Rodando localmente:**
   ```powershell
   npm run dev
   ```
   O app estará disponível em `http://localhost:3000`.

5. **Build de produção:**
   ```powershell
   npm run build
   npm start
   ```

## Estrutura de Pastas

- `src/app/` — Páginas do Next.js (App Router)
- `src/components/` — Componentes reutilizáveis (cards, carrossel, sidebar, etc.)
- `src/services/` — Serviços para comunicação com a API/Parse
- `src/store/` — Stores Zustand para estado global
- `src/pages/api/` — Rotas de API (Next.js API routes)
- `public/` — Imagens e assets estáticos

## Funcionalidades
 
- **Listagem de cursos** (novos e inscritos)
- **Inscrição e desinscrição em cursos**
- **Tela de detalhes do curso**
- **Atualização de progresso do curso para finalizado** (atualmente fixa em 1%)
- **Controle global de loading** (spinner com Zustand)
- **Controle de fluxo de dados pro back4app** (com Zustand)
- **Responsividade e acessibilidade**
- **Deploy automático no Vercel**

## Estado Global com Zustand
- O loading global é controlado via `src/store/useLoadingStore.ts`.
- Antes de qualquer chamada à API (ex: buscar cursos, inscrever/desinscrever), o estado `isLoading` é ativado (`setLoading(true)`), exibindo um spinner global na interface.
- Para usar em qualquer componente:
  ```typescript
  import { useLoadingStore } from '../store/useLoadingStore';
  const isLoading = useLoadingStore(state => state.isLoading);
  const setLoading = useLoadingStore(state => state.setLoading);
  ```

### Controle de fluxo de dados pro Back4App com Redux
- O Redux é utilizado para fazer controle do fluxo de dados para o back4app
- Centraliza os cursos: todos os cursos (inscritos ou não) são armazenados num único lugar acessível por qualquer componente.
- Permite ações síncronas e assíncronas: como fetchCourses, que busca todos os cursos do Back4App sem que cada componente precise saber como essa lógica funciona

## Scripts Disponíveis

- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera o build de produção
- `npm start` — Inicia o servidor em modo produção

## Deploy

- O deploy é feito automaticamente no Vercel a cada push na branch principal.

## Observações

- O backend (Parse/Back4App) está configurado, e todas as chamadas de api estão funcionais no backend.
- O projeto segue boas práticas de acessibilidade e responsividade.

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature/fix: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha feature'`
4. Push para o branch: `git push origin minha-feature`
5. Abra um Pull Request

---

Este projeto foi desenvolvido como parte de um Trabalho de Graduação em Sistemas Para Internet. Seu objetivo é demonstrar a integração de tecnologias modernas para educação online, com foco em usabilidade, acessibilidade e boas práticas de desenvolvimento web.