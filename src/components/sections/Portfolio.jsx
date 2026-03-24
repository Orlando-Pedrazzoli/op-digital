import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import { CardStack } from '@/components/ui/CardStack';

const portfolioItems = [
  {
    id: 1,
    title: 'Elite Surfing',
    description:
      'E-Commerce com 446+ produtos, checkout otimizado e PIX automatico.',
    imageSrc: '/elite-surfing.jpg',
    href: 'https://www.elitesurfing.com.br',
  },
  {
    id: 2,
    title: 'Centro Dentario Colombo',
    description: 'Site institucional bilingue PT/EN com agendamento integrado.',
    imageSrc: '/centro-dentario.jpg',
    href: 'https://www.centrodentariocolombo.com',
  },
  {
    id: 3,
    title: 'Street Paint',
    description: 'Oficina com orcamento interativo por peca e chatbot de IA.',
    imageSrc: '/street-paint.jpg',
    href: 'https://www.streetpaint.pt',
  },
  {
    id: 4,
    title: 'Go Portugal Tours',
    description: '24 roteiros de tours privados com precos dinamicos.',
    imageSrc: '/go-portugal-tours.jpg',
    href: 'https://www.goportugaltours.com',
  },
];

export default function Portfolio() {
  return (
    <section
      id='portfolio'
      className='py-24 px-6 bg-[#F8F7F4] dark:bg-[#131834]'
    >
      <div className='max-w-300 mx-auto'>
        <SectionHeader
          label='Portfolio'
          title='Projetos <em>reais</em>, resultados reais.'
          description='Cada projeto e construido do zero com codigo proprio. Sem templates, sem limitacoes — e com resultados mensuraveis.'
        />
        <FadeIn>
          <div className='mx-auto w-full max-w-5xl'>
            <CardStack
              items={portfolioItems}
              initialIndex={0}
              autoAdvance
              intervalMs={4000}
              pauseOnHover
              showDots
              cardWidth={560}
              cardHeight={340}
            />
          </div>
          {/* CTA Button — links to dedicated portfolio page */}
          <div className='flex justify-center mt-12'>
            <Link
              to='/portfolio'
              className='inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium no-underline border border-zinc-300 dark:border-white/[0.12] text-zinc-700 dark:text-zinc-300 hover:border-green-500 hover:text-green-600 dark:hover:border-green-500 dark:hover:text-green-400 transition-all duration-200'
            >
              Ver todos os projetos <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
