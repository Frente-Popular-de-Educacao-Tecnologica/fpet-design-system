# Documentação Técnica - FPET Design System

## 1. Visão Geral

O projeto `fpet-design-system` é uma aplicação frontend estática (SPA de página única) para consolidar:

- tokens visuais
- componentes reutilizáveis
- padrões de acessibilidade
- exemplos de uso para comunicação digital institucional

Stack principal:

- Vite 7
- HTML5 sem framework
- CSS moderno (custom properties, `color-mix`, media queries)
- JavaScript vanilla (módulos ES)
- Iconoir (iconografia)

## 2. Arquitetura e Estrutura

Estrutura atual:

```text
.
|-- index.html
|-- src/
|   |-- main.js
|   `-- styles.css
|-- public/
|   |-- robots.txt
|   `-- vite.svg
|-- docs/
|   `-- DOCUMENTACAO-TECNICA.md
|-- package.json
|-- eslint.config.js
|-- README.md
`-- LICENSE.md
```

Responsabilidades:

- `index.html`: estrutura semântica da página e markup dos componentes.
- `src/styles.css`: design tokens, temas, componentes e responsividade.
- `src/main.js`: comportamento interativo (diálogos e formulário).
- `public/robots.txt`: diretivas de rastreamento para buscadores.

## 3. Pipeline de Execução

Scripts (package.json):

- `npm run dev`: servidor local com HMR.
- `npm run build`: build de produção para `dist/`.
- `npm run preview`: preview da build.
- `npm run lint`: análise estática com ESLint.
- `npm run lint:fix`: correção automática suportada pelo ESLint.

Requisitos:

- Node.js >= 18
- npm >= 9

## 4. Sistema de Tema

O projeto utiliza tema claro/escuro automático com base em preferências do sistema:

- CSS: `@media (prefers-color-scheme: light)`
- HTML:
  - `meta name="color-scheme" content="light dark"`
- `meta name="theme-color"` para dark e light

Tokens base:

- cores de marca: vermelho, amarelo, roxo
- neutros: ink, slate, snow
- derivados: `--bg`, `--surface`, `--text`, `--muted`, etc.

## 5. Sistema de Espaçamento

Escala fluida inspirada em 8pt:

- `--space-1` até `--space-12` com `clamp()`
- tokens semânticos:
  - `--space-wrap-x`, `--space-wrap-y`
  - `--space-section-y`
  - `--space-card`, `--space-grid`, `--space-stack`, `--space-row`

Observação:

- aliases `--s-*` foram mantidos para compatibilidade retroativa.

## 6. Componentes Implementados

Principais blocos no design system:

- navegacao + hero
- paleta de cores (swatches)
- tipografia (sans + mono)
- botoes e badges
- breadcrumbs
- accordions (FAQ com `details/summary`)
- modais/dialogos (elemento nativo `dialog`)
- formulários com validação assistida
- certificado de conclusao
- cards de cursos
- rodape

## 7. Iconografia

Integração via dependência `iconoir`:

- import em `src/main.js`:
  - `import 'iconoir/css/iconoir.css';`
- uso no HTML via classes `iconoir-*`.

## 8. Acessibilidade

Práticas aplicadas:

- linguagem definida (`lang="pt-BR"`)
- landmarks semânticos (`header`, `main`, `section`, `footer`, `nav`)
- skip link para pular ao conteúdo principal
- foco visível com `:focus-visible`
- suporte a `prefers-reduced-motion`
- formulário com:
  - `label` associado a campos
  - `aria-describedby` para ajuda/erro
  - `aria-invalid` atualizado via JS
  - foco no primeiro campo inválido no submit
  - `reportValidity()` para mensagens nativas

## 9. JavaScript (src/main.js)

Blocos de comportamento:

1. Diálogos
- abre modal a partir de gatilhos `data-open-dialog`
- fecha ao clicar no backdrop
- devolve foco ao botão que abriu

2. Formulário
- valida em `blur`, `input` e `change`
- aplica estados visuais (`data-state="valid|invalid"`)
- sincroniza contador de caracteres da mensagem
- bloqueia submit inválido e direciona foco
- reseta estados após `reset`

## 10. SEO e Metadados

Itens já configurados:

- `meta description`
- `robots.txt` com política aberta:
  - `User-agent: *`
  - `Allow: /`

## 11. Convenções de Código

- padrão de commits: Conventional Commits
- linting: ESLint (flat config)
- arquitetura simples e sem dependência de framework UI
- preferência por CSS tokenizado e classes reutilizáveis

## 12. Guia de Evolução

Para adicionar novo componente ao design system:

1. Definir objetivo e variantes no `index.html`.
2. Reutilizar tokens existentes em `src/styles.css`.
3. Evitar inline style, preferir classes semânticas.
4. Garantir estado de foco, responsividade e contraste.
5. Se houver interação, implementar em `src/main.js` com acessibilidade.
6. Validar com:
   - `npm run lint`
   - `npm run build`

## 13. Riscos Técnicos Atuais

- uso intensivo de `color-mix` pode ter variação de renderização entre engines.
- volume de CSS único tende a crescer; no médio prazo pode ser útil modularizar por domínio (base, layout, componentes).
- `dialog` é nativo, mas vale manter teste cruzado em navegadores alvo do projeto.
