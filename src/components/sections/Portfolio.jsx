import { ArrowRight } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { CardStack } from '@/components/ui/CardStack';
const portfolioItems = [
  {
    id: 1,
    title: 'Elite Surfing',
    description:
      'E-Commerce com 446+ produtos, checkout otimizado e PIX automático.',
    imageSrc: '/elite-surfing.jpg',
    href: 'https://www.elitesurfing.com.br',
  },
  {
    id: 2,
    title: 'Centro Dentário Colombo',
    description: 'Site institucional bilíngue PT/EN com agendamento integrado.',
    imageSrc: '/centro-dentario.jpg',
    href: 'https://www.centrodentariocolombo.com',
  },
  {
    id: 3,
    title: 'Street Paint',
    description: 'Oficina com orçamento interativo por peça e chatbot de IA.',
    imageSrc: '/street-paint.jpg',
    href: 'https://www.streetpaint.pt',
  },
  {
    id: 4,
    title: 'Go Portugal Tours',
    description: '24 roteiros de tours privados com preços dinâmicos.',
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
          label='Portfólio'
          title='Projetos <em>reais</em>, resultados reais.'
          description='Cada projeto é construído do zero com código próprio. Sem templates, sem limitações — e com resultados mensuráveis.'
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
          {/* CTA Button */}
          <div className='flex justify-center mt-12'>
            <Button href='#' variant='outline' size='lg'>
              Ver todos os projetos <ArrowRight size={15} />
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
