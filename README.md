# FPET Design System

Design system da Frente Popular de Educação Tecnológica (FPET), construído com Vite, HTML, CSS moderno e JavaScript vanilla.

## Proposta

Este projeto centraliza tokens visuais, componentes e exemplos de interface para comunicação digital da FPET, com foco em:

- consistência visual
- reutilização de componentes
- acessibilidade
- manutenção simples

## Stack

- Vite
- HTML
- CSS moderno
- JavaScript vanilla
- Iconoir (sistema de iconografia)

## Requisitos

- Node.js >= 18
- npm >= 9

## Como executar

```bash
npm install
npm run dev
```

Aplicação em desenvolvimento: `http://localhost:5173`

## Scripts

- `npm run dev`: inicia ambiente de desenvolvimento
- `npm run start`: alias para `dev`
- `npm run build`: gera build de produção em `dist/`
- `npm run preview`: sobe preview do build de produção
- `npm run lint`: executa o ESLint
- `npm run lint:fix`: corrige automaticamente problemas suportados pelo ESLint

## Estrutura do projeto

```text
.
|-- index.html
|-- src/
|   |-- index.css
|   |-- main.js
|   |-- js/
|   |   |-- app.js
|   |   `-- modules/
|   |       |-- dialog/
|   |       |   `-- dialogModule.js
|   |       |-- form/
|   |       |   |-- formModule.js
|   |       |   `-- counterController.js
|   |       `-- shared/
|   |           `-- formFieldState.js
|   `-- css/
|       `-- modules/
|-- public/
|-- package.json
|-- LICENSE.md
`-- .gitignore
```

## Documentação da aplicação

### 1) Sistema de tema (claro/escuro)

- Tema automático baseado na configuração do sistema (`prefers-color-scheme`)
- Metadados de cor do browser:
  - `meta name="color-scheme" content="light dark"`
  - `meta name="theme-color"` para claro e escuro
- Tokens CSS controlam contraste e variações de superfície, texto, bordas e componentes

### 2) Sistema de iconografia (Iconoir)

- Integração via dependência local (`node_modules/iconoir`)
- Importado em `src/main.js`:

```js
import './index.css';
import 'iconoir/css/iconoir.css';
import { initializeApp } from './js/app.js';
```

- Utilização por classes `iconoir-*` no HTML (ex.: `iconoir-clock`, `iconoir-calendar`, `iconoir-badge-check`)

### 3) Seções da página

- `#cores`: paleta e swatches
- `#tipografia`: hierarquia tipográfica e exemplo mono/terminal
- `#componentes`: botões, badges, formulários e certificado
- `#exemplos`: cards de cursos com uso real dos componentes

### 4) Componente: Certificado de conclusão

O design system inclui um componente completo de certificado com:

- cabeçalho institucional
- selo de certificado
- identificação de pessoa e curso
- metadados (carga horária, data, código)
- área de assinaturas
- comportamento responsivo

### 5) Contraste e acessibilidade

- Ajustes de contraste para tema claro e escuro
- Cores semânticas para feedback visual
- Estrutura orientada à leitura e escaneabilidade

## Padrão de commits (Conventional Commits)

Este repositório adota o padrão **Conventional Commits**.

Formato:

```text
tipo(escopo-opcional): descrição curta no imperativo
```

Tipos mais usados:

- `feat`: nova funcionalidade
- `fix`: correção de bug
- `docs`: alterações de documentação
- `style`: formatação/estilo sem alterar lógica
- `refactor`: refatoração sem alterar comportamento final
- `test`: testes
- `chore`: manutenção, build, ferramentas

Exemplos:

- `feat(theme): adicionar suporte a tema claro e escuro`
- `fix(header): ajustar responsividade da navegação em mobile`
- `docs(readme): documentar padrão de commits`

## Primeiro commit

Passo a passo sugerido:

```bash
git add .
git commit -m "feat: inicializar design system da FPET"
```

## Licença

Este projeto está licenciado como `GPL-3.0-or-later`.

Consulte [LICENSE.md](./LICENSE.md).
