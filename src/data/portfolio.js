import {
  ShoppingBag,
  Package,
  CreditCard,
  Truck,
  Star,
  Layers,
  Globe,
  Stethoscope,
  Users,
  Car,
  MessageSquare,
  Map,
  Camera,
  Calendar,
} from 'lucide-react';

// Hero mockup data (keep for Hero.jsx compatibility)
export const portfolioMain = {
  name: 'Elite Surfing',
  type: 'E-Commerce de Acessórios de Surf',
  url: 'https://www.elitesurfing.com.br',
  categories: ['Decks', 'Leashes', 'Capas', 'Quilhas', 'Sarcófagos'],
  mockProducts: [
    { cat: 'Deck', name: 'Deck Noronha', price: 'R$ 187,80' },
    { cat: 'Leash', name: "Leash Pro 6'", price: 'R$ 89,90' },
    { cat: 'Capa', name: 'Capa Refletiva', price: 'R$ 149,90' },
    { cat: 'Quilha', name: 'Quilha Carbono', price: 'R$ 219,00' },
  ],
  stats: [
    { icon: Package, value: '446+', label: 'Produtos' },
    { icon: Layers, value: '6', label: 'Categorias' },
    { icon: CreditCard, value: '12x', label: 'Sem Juros' },
    { icon: Star, value: '5%', label: 'OFF no PIX' },
    { icon: Globe, value: '100%', label: 'Responsivo' },
  ],
  features: [
    'Catálogo completo com filtros e busca',
    'Carrinho persistente + checkout otimizado',
    'Pagamento PIX com desconto automático',
    'Parcelamento em até 12x sem juros',
    'Cálculo de frete com Melhor Envio',
    'Frete grátis por região e valor',
    'Sistema de avaliações com fotos',
    'Blog integrado com SEO',
    'Cupons e promoções (combos, outlet)',
    'Painel admin completo de gestão',
    'Design mobile-first responsivo',
    'WhatsApp integrado para atendimento',
  ],
};

// All portfolio projects
export const portfolioProjects = [
  {
    name: 'Elite Surfing',
    type: 'E-Commerce',
    desc: 'Loja online completa com 446+ produtos, pagamento PIX e cartão, frete automático e painel admin.',
    url: 'https://www.elitesurfing.com.br',
    color: '#16a34a',
    colorLight: '#dcfce7',
    icon: ShoppingBag,
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Melhor Envio'],
    highlights: [
      { value: '446+', label: 'Produtos' },
      { value: '12x', label: 'Sem Juros' },
      { value: '5%', label: 'OFF PIX' },
    ],
  },
  {
    name: 'Centro Dentário Colombo',
    type: 'Site Institucional',
    desc: 'Clínica dentária em Lisboa com agendamento, equipe médica, tratamentos e sistema bilingue PT/EN.',
    url: 'https://www.centrodentariocolombo.com',
    color: '#0284c7',
    colorLight: '#e0f2fe',
    icon: Stethoscope,
    tags: ['React', 'TypeScript', 'SEO', 'GDPR'],
    highlights: [
      { value: '2', label: 'Idiomas' },
      { value: '10+', label: 'Tratamentos' },
      { value: '100%', label: 'GDPR' },
    ],
  },
  {
    name: 'Street Paint',
    type: 'Site + Orçamento Online',
    desc: 'Oficina de chapa e pintura em Sintra com orçamento interativo por peça, chatbot AI e reviews Google.',
    url: 'https://www.streetpaint.pt',
    color: '#ea580c',
    colorLight: '#fff7ed',
    icon: Car,
    tags: ['Next.js', 'AI Chatbot', 'WhatsApp', 'Google Reviews'],
    highlights: [
      { value: 'AI', label: 'Chatbot' },
      { value: '50+', label: 'Peças' },
      { value: '5★', label: 'Google' },
    ],
  },
  {
    name: 'Go Portugal Tours',
    type: 'Site de Turismo',
    desc: 'Tours privados em Portugal com 24 roteiros, preços dinâmicos, reservas e suporte bilingue PT/EN.',
    url: 'https://www.goportugaltours.com',
    color: '#9333ea',
    colorLight: '#faf5ff',
    icon: Map,
    tags: ['Next.js', 'Bilingual', 'EmailJS', 'SEO'],
    highlights: [
      { value: '24', label: 'Tours' },
      { value: '2', label: 'Idiomas' },
      { value: '5.0', label: 'Rating' },
    ],
  },
];

// Process steps (keep for Process.jsx)
export const processSteps = [
  {
    num: '01',
    title: 'Conversa',
    desc: 'Entendemos seu negócio, público, objetivos e necessidades específicas. Sem compromisso, sem jargão técnico.',
  },
  {
    num: '02',
    title: 'Proposta',
    desc: 'Apresentamos o plano ideal com tudo detalhado: funcionalidades, prazo e investimento. Transparência total.',
  },
  {
    num: '03',
    title: 'Criação',
    desc: 'Desenvolvemos seu site com você acompanhando. Ajustes até a aprovação final.',
  },
  {
    num: '04',
    title: 'Lançamento',
    desc: 'Site no ar, domínio configurado, treinamento para você gerenciar tudo sozinho. Suporte incluído.',
  },
];
