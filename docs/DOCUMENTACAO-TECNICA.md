# Documentação Técnica - FPET Design System

## 1. Visão Geral

O `fpet-design-system` é uma aplicação frontend estática (SPA de página única) para consolidar:

- design tokens
- componentes reutilizáveis
- padrões de acessibilidade
- exemplos de uso institucional

Stack principal:

- Vite 7
- HTML5 sem framework
- CSS moderno (`custom properties`, `color-mix`, media queries)
- JavaScript vanilla (ES modules)
- Iconoir (iconografia)

## 2. Arquitetura Atual

Estrutura relevante:

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
|           |-- tokens.css
|           |-- base.css
|           |-- grid.css
|           |-- hero.css
|           |-- breadcrumb.css
|           |-- terminal.css
|           |-- section.css
|           |-- card.css
|           |-- swatch.css
|           |-- typo.css
|           |-- buttons.css
|           |-- badge.css
|           |-- accordion.css
|           |-- dialog.css
|           |-- form.css
|           |-- certificate.css
|           |-- course.css
|           |-- footer.css
|           `-- a11y.css
|-- docs/
|   `-- DOCUMENTACAO-TECNICA.md
|-- public/
|-- package.json
`-- eslint.config.js
```

Responsabilidades:

- `index.html`: estrutura semântica e exemplos de componentes.
- `src/index.css`: ponto único de entrada de estilos; importa os módulos em ordem de dependência.
- `src/css/modules/*.css`: estilos segmentados por domínio/componente.
- `src/main.js`: ponto de entrada da aplicação (imports globais + bootstrap).
- `src/js/app.js`: orquestra os módulos de interface.
- `src/js/modules/dialog/dialogModule.js`: regras de diálogo e gestão de foco.
- `src/js/modules/form/formModule.js`: eventos e ciclo de validação do formulário.
- `src/js/modules/shared/formFieldState.js`: estado visual/ARIA dos campos.
- `src/js/modules/form/counterController.js`: contador de caracteres do campo de mensagem.

## 3. Pipeline de Execução

Scripts (`package.json`):

- `npm run start`: inicia Vite em modo dev
- `npm run dev`: inicia Vite em modo dev
- `npm run build`: build de produção para `dist/`
- `npm run preview`: preview da build
- `npm run lint`: análise estática com ESLint
- `npm run lint:fix`: correções automáticas do ESLint

Requisitos:

- Node.js >= 18
- npm >= 9

## 4. Contrato de CSS

### 4.1 Ponto único de import

`src/main.js` importa:

- `import './index.css';`
- `import 'iconoir/css/iconoir.css';`
- `import { initializeApp } from './js/app.js';`

`src/index.css` agrega todos os módulos.

### 4.2 Convenção de classes

Padrão adotado:

- `c-*`: componente (`c-button`, `c-badge`, `c-dialog`)
- `l-*`: layout (`l-wrap`, `l-grid`, `l-row`, `l-stack`)
- `u-*`: utilitário (`u-mt-4`, `u-spacer-6`, `u-text-small`)
- `is-*`: estado/modificador (`is-primary`, `is-soft`, `is-valid`, `is-invalid`)

Sem aliases legados: o HTML já usa exclusivamente o novo padrão.

### 4.3 Organização dos módulos

Ordem atual de import no `src/index.css`:

1. `tokens.css`
2. `base.css`
3. `grid.css`
4. `hero.css`
5. `breadcrumb.css`
6. `terminal.css`
7. `section.css`
8. `card.css`
9. `swatch.css`
10. `typo.css`
11. `buttons.css`
12. `badge.css`
13. `accordion.css`
14. `dialog.css`
15. `form.css`
16. `certificate.css`
17. `course.css`
18. `footer.css`
19. `a11y.css`

## 5. Sistema de Tema e Tokens

O projeto usa tema claro/escuro automático:

- `meta name="color-scheme" content="light dark"`
- `@media (prefers-color-scheme: light)` em `tokens.css`

Tokens principais:

- marca: `--red-600`, `--yellow-400`, `--purple-600`
- neutros: `--ink-950`, `--slate-700`, `--snow-50`
- semânticos: `--bg`, `--surface`, `--text`, `--muted`, `--glass-border`, `--line-subtle`
- espaçamento fluido: `--space-1` a `--space-12` (+ aliases `--s-*`)

## 6. JavaScript e Acessibilidade

### 6.1 Diálogos

Implementado em `src/js/modules/dialog/dialogModule.js` com:

- gatilho por `data-open-dialog`
- alvo por `id` do `dialog`
- identificação de diálogos por `[data-dialog]`
- fechamento ao clicar no backdrop
- restauração de foco no gatilho ao fechar

### 6.2 Formulário

Implementado em `src/js/modules/form/formModule.js` e `src/js/modules/shared/formFieldState.js` com:

- seleção do formulário por `[data-form]`
- identificação de campos por `[data-field]`
- contador por `[data-counter]`
- validação em `blur`, `input`, `change` e `submit`
- atualização de `aria-invalid`
- estados visuais por classe: `is-valid` / `is-invalid`
- foco no primeiro campo inválido
- reset dos estados após `reset`

### 6.3 Práticas de acessibilidade aplicadas

- landmarks semânticos (`header`, `main`, `section`, `footer`, `nav`)
- skip link (`.c-skip-link`)
- foco visível com `:focus-visible`
- redução de movimento em `a11y.css` (`prefers-reduced-motion`)
- contraste orientado por tokens

### 6.4 Organização com princípios SOLID

- **SRP (Single Responsibility)**: cada módulo possui responsabilidade única (`dialog`, `form`, `field state`, `counter`).
- **OCP (Open/Closed)**: novos comportamentos podem ser adicionados criando módulos novos e registrando em `app.js`, sem alterar módulos estáveis.
- **LSP/ISP**: módulos expõem interfaces pequenas (`init*`, `setFieldState`, `updateCounter`) e reutilizáveis.
- **DIP (Dependency Inversion)**: inicializadores aceitam dependências por parâmetro (`root`, `form`), reduzindo acoplamento com globais.

## 7. Componentes Disponíveis

Domínios presentes no design system:

- navegação e hero
- breadcrumbs
- terminal/snippet
- paleta de cores (swatches)
- tipografia (sans + mono)
- botões e badges
- accordion (`details/summary`)
- dialogs (`<dialog>`)
- formulário validado
- certificado
- cards de curso
- footer

## 8. Iconografia

Dependência:

- `iconoir`

Uso:

- import em `src/main.js`: `import 'iconoir/css/iconoir.css';`
- classes no HTML: `iconoir-*`

## 9. Convenções de Evolução

Para adicionar ou alterar componentes:

1. Manter a convenção de naming (`c-`, `l-`, `u-`, `is-`).
2. Criar/editar módulo em `src/css/modules` conforme domínio.
3. Registrar o módulo em `src/index.css` respeitando ordem de dependência.
4. Reutilizar tokens existentes antes de criar novos.
5. Garantir estados de foco, hover e contraste mínimo acessível.
6. Para interações, usar `data-*` no HTML e lógica em `src/js/modules`.
7. Validar com:
   - `npm run lint`
   - `npm run build`

## 10. Riscos Técnicos e Atenções

- `color-mix()` pode variar levemente entre engines.
- `<dialog>` é nativo; manter validação cruzada nos navegadores alvo.
- Mudanças de naming em massa devem preservar o contrato JS baseado em `data-*`.
