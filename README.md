# OP Digital

Landing page profissional para captacao de clientes de desenvolvimento web, voltada para o mercado brasileiro. Construida com React 19, Vite 7 e Tailwind CSS v4.

URL: https://opdigital.com.br

## Stack

- React 19
- Vite 7
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- Framer Motion (animacoes)
- Lucide React (icones)
- React Router DOM v7
- React Hot Toast (notificacoes)

## Estrutura do Projeto

```
src/
  components/
    layout/        Navbar, Footer, WhatsAppButton, ScrollToTop
    sections/      Hero, BusinessTypes, Features, Process, Portfolio, Plans, FAQ, CTAFinal
    seo/           SEO (meta tags dinamicas via DOM)
    ui/            Button, SectionHeader, ThemeToggle, FadeIn
  contexts/
    ThemeContext.js   Contexto do tema (dark/light)
    ThemeProvider.jsx Provider com persistencia em localStorage
  data/
    businessTypes.js  12 tipos de negocio
    faq.js            Perguntas frequentes
    features.js       12 funcionalidades
    plans.js          3 planos + manutencao mensal
    portfolio.js      Case Elite Surfing + etapas do processo
  hooks/
    useTheme.js       Hook para acessar o tema
    useInView.js      Hook de IntersectionObserver para animacoes
  pages/
    Home.jsx          Pagina principal (composicao de todas as sections)
  styles/
    index.css         Tema Tailwind v4, variaveis CSS, keyframes e utilities custom
  utils/
    config.js         Configuracoes centralizadas (nome, contato, SEO)
    whatsapp.js       Geradores de URLs do WhatsApp com mensagens pre-definidas
public/
  favicon.png         Logo/favicon
  manifest.json       PWA manifest
  robots.txt          Configuracao para crawlers
```

## Instalacao

```bash
git clone https://github.com/seu-usuario/op-digital.git
cd op-digital
npm install
```

## Desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento abre em http://localhost:5173.

## Build

```bash
npm run build
```

Os arquivos de producao sao gerados na pasta `dist/`.

## Deploy

O projeto esta configurado para deploy na Vercel. O arquivo `vercel.json` configura o rewrite de todas as rotas para `index.html` (SPA).

```bash
npx vercel --prod
```

## Configuracao

Todas as configuracoes centralizadas estao em `src/utils/config.js`:

- Nome e tagline do site
- Numero do WhatsApp (formato internacional sem +)
- Email de contato
- Dados do proprietario
- Configuracoes de SEO (titulo padrao, template, OG image)

## Funcionalidades

- Dark mode com toggle manual e deteccao automatica de preferencia do sistema
- Animacoes de entrada (fade-in) com IntersectionObserver
- Botao flutuante do WhatsApp com animacao de pulse
- Navbar com efeito de blur no scroll
- Menu mobile fullscreen
- SEO com meta tags dinamicas (Open Graph, Twitter Cards, canonical)
- Links do WhatsApp com mensagens contextuais por tipo de negocio e plano
- Design responsivo mobile-first
- Fontes: Plus Jakarta Sans (corpo) e Instrument Serif (titulos)

## Tema e Cores

O tema utiliza Tailwind CSS v4 com variaveis CSS definidas via `@theme` no `index.css`:

- Background: oklch(0.12 0.05 240)
- Surface: oklch(0.14 0.04 240)
- Primary (verde): oklch(0.68 0.15 145)
- Texto: oklch(0.95 0.02 240)
- Fontes: --font-sans, --font-serif, --font-display

## VS Code

Para evitar warnings do validador CSS nativo com a sintaxe do Tailwind v4, adicione ao `settings.json`:

```json
{
  "css.validate": false,
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

Requer a extensao Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss).

## Pendencias

- Adicionar imagem OG em /public/og-image.jpg (1200x630px recomendado) para sharing em redes sociais
- Configurar dominio definitivo no Registro.br/Vercel

## Licenca

Projeto privado. Todos os direitos reservados.
