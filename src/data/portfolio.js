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
    desc: 'Loja online completa desenvolvida do zero com 446+ produtos, checkout otimizado, PIX com desconto automático e painel admin. Operação 100% digital com vendas recorrentes no Brasil.',
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
    result: 'Loja no ar e vendendo em menos de 45 dias.',
  },
  {
    name: 'Centro Dentário Colombo',
    type: 'Site Institucional',
    desc: 'Site bilíngue PT/EN para clínica em Lisboa. Agendamento integrado, perfis de médicos, SEO local e conformidade total com GDPR. Presença digital profissional que transmite confiança.',
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
    result: 'Site entregue em 3 semanas, 100% conforme com GDPR.',
  },
  {
    name: 'Street Paint',
    type: 'Site + Orçamento Online',
    desc: 'Oficina em Sintra com orçamento interativo por peça do carro, chatbot de IA para atendimento automático e integração com reviews do Google. Clientes chegam já sabendo o preço.',
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
    result: 'Orçamentos online reduzindo ligações desnecessárias.',
  },
  {
    name: 'Go Portugal Tours',
    type: 'Site de Turismo',
    desc: '24 roteiros de tours privados com preços dinâmicos, sistema de reservas e suporte PT/EN. SEO forte para capturar turistas buscando experiências em Portugal.',
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
    result: 'Reservas diretas sem intermediários, mais margem para o cliente.',
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
