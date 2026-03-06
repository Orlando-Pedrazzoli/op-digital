import {
  ShoppingBag,
  Stethoscope,
  Car,
  Map,
  MessageCircle,
  Briefcase,
  Code,
  Rocket,
} from 'lucide-react';

// Hero mockup data (keep for Hero.jsx compatibility if needed)
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
};

// All portfolio projects
export const portfolioProjects = [
  {
    name: 'Elite Surfing',
    type: 'E-Commerce',
    desc: 'Loja online completa com 446+ produtos, checkout otimizado, PIX com desconto automático e painel admin. Operação 100% digital.',
    url: 'https://www.elitesurfing.com.br',
    screenshot: '/elite-surfing.jpg',
    color: '#16a34a',
    icon: ShoppingBag,
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Melhor Envio'],
    result: 'Loja no ar e vendendo em menos de 45 dias.',
    features: [
      'Catálogo com 446+ produtos e filtros',
      'Carrinho persistente + checkout otimizado',
      'PIX com desconto automático de 5%',
      'Parcelamento em até 12x sem juros',
      'Cálculo de frete com Melhor Envio',
      'Sistema de avaliações com fotos',
      'Blog integrado com SEO',
      'Cupons, promoções e combos',
      'Painel admin completo de gestão',
      'WhatsApp integrado para atendimento',
    ],
    highlights: [
      { value: '446+', label: 'Produtos' },
      { value: '12x', label: 'Sem Juros' },
      { value: '5%', label: 'OFF PIX' },
    ],
  },
  {
    name: 'Centro Dentário Colombo',
    type: 'Site Institucional',
    desc: 'Site bilíngue PT/EN para clínica em Lisboa. Agendamento integrado, perfis de médicos, SEO local e conformidade GDPR.',
    url: 'https://www.centrodentariocolombo.com',
    screenshot: '/centro-dentario.jpg',
    color: '#0284c7',
    icon: Stethoscope,
    tags: ['React', 'TypeScript', 'Clerk Auth', 'SEO', 'GDPR'],
    result: 'Site entregue em 3 semanas, 100% conforme com GDPR.',
    features: [
      'Site bilíngue PT/EN completo',
      'Agendamento online integrado',
      'Perfis de médicos com especialidades',
      'Área do cliente com autenticação Clerk',
      'SEO local otimizado para Lisboa',
      'Conformidade total com GDPR',
      'Política de cookies e privacidade',
      'Design responsivo mobile-first',
    ],
    highlights: [
      { value: '2', label: 'Idiomas' },
      { value: '10+', label: 'Tratamentos' },
      { value: '100%', label: 'GDPR' },
    ],
  },
  {
    name: 'Street Paint',
    type: 'Site + Orçamento Online',
    desc: 'Oficina em Sintra com orçamento interativo por peça do carro, chatbot de IA e integração com reviews do Google.',
    url: 'https://www.streetpaint.pt',
    screenshot: '/street-paint.jpg',
    color: '#ea580c',
    icon: Car,
    tags: ['React', 'EmailJS', 'WhatsApp', 'Google Reviews'],
    result: 'Orçamentos online reduzindo ligações desnecessárias.',
    features: [
      'Orçamento interativo por peça do carro',
      'SVG clicável com hotspots por veículo',
      'Chatbot de IA para atendimento automático',
      'Integração com Google Reviews',
      'WhatsApp direto com mensagem pré-definida',
      'Bilíngue PT/EN',
      'Formulário de contato com EmailJS',
      'Design responsivo mobile-first',
    ],
    highlights: [
      { value: 'AI', label: 'Chatbot' },
      { value: '50+', label: 'Peças' },
      { value: '5★', label: 'Google' },
    ],
  },
  {
    name: 'Go Portugal Tours',
    type: 'Site de Turismo',
    desc: '24 roteiros de tours privados com preços dinâmicos, sistema de reservas e suporte PT/EN.',
    url: 'https://www.goportugaltours.com',
    screenshot: '/go-portugal-tours.jpg',
    color: '#9333ea',
    icon: Map,
    tags: ['Next.js', 'Framer Motion', 'EmailJS', 'SEO', 'Swiper'],
    result: 'Reservas diretas sem intermediários.',
    features: [
      '24 roteiros de tours privados',
      'Preços dinâmicos por grupo/temporada',
      'Sistema de reservas com EmailJS',
      'Bilíngue PT/EN com next-intl',
      'SEO otimizado para turismo em Portugal',
      'Galeria de fotos com Swiper',
      'Integração WhatsApp para reservas',
      'Google Search Console configurado',
    ],
    highlights: [
      { value: '24', label: 'Tours' },
      { value: '2', label: 'Idiomas' },
      { value: '5.0', label: 'Rating' },
    ],
  },
];

// Process steps
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
