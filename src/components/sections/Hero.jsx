import {
  Zap,
  ArrowRight,
  Globe,
  ShoppingCart,
  Code,
  Search,
  Palette,
  Rocket,
} from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import Button from '@/components/ui/Button';
import RadialOrbitalTimeline from '@/components/ui/RadialOrbitalTimeline';
import { getWhatsAppUrl } from '@/utils/whatsapp';

const stats = [
  { value: '100%', label: 'Projetos entregues' },
  { value: '5+', label: 'Anos de experiência' },
  { value: '0', label: 'Templates usados' },
];

const timelineData = [
  {
    id: 1,
    title: 'Briefing',
    date: 'Semana 1',
    content:
      'Reunião inicial para entender objetivos, público-alvo e funcionalidades do projeto.',
    category: 'Planeamento',
    icon: Zap,
    relatedIds: [2],
    status: 'completed',
    energy: 100,
  },
  {
    id: 2,
    title: 'Design UI/UX',
    date: 'Semana 2',
    content:
      'Criação do layout personalizado, identidade visual e protótipos interativos.',
    category: 'Design',
    icon: Palette,
    relatedIds: [1, 3],
    status: 'completed',
    energy: 90,
  },
  {
    id: 3,
    title: 'Desenvolvimento',
    date: 'Semana 3–4',
    content:
      'Código próprio com React/Next.js, integração de APIs, pagamentos e CMS.',
    category: 'Código',
    icon: Code,
    relatedIds: [2, 4],
    status: 'in-progress',
    energy: 70,
  },
  {
    id: 4,
    title: 'E-Commerce',
    date: 'Semana 4',
    content:
      'Loja virtual completa com carrinho, checkout, Pagar.me/Stripe e gestão de produtos.',
    category: 'Loja',
    icon: ShoppingCart,
    relatedIds: [3, 5],
    status: 'in-progress',
    energy: 55,
  },
  {
    id: 5,
    title: 'SEO & Performance',
    date: 'Semana 5',
    content:
      'Otimização para Google, Core Web Vitals, SSR, sitemap e structured data.',
    category: 'SEO',
    icon: Search,
    relatedIds: [4, 6],
    status: 'pending',
    energy: 35,
  },
  {
    id: 6,
    title: 'Deploy & Suporte',
    date: 'Semana 6',
    content:
      'Publicação em produção com domínio próprio, SSL, e suporte contínuo pós-launch.',
    category: 'Deploy',
    icon: Rocket,
    relatedIds: [5],
    status: 'pending',
    energy: 15,
  },
];

export default function Hero() {
  return (
    <section className='min-h-screen flex items-center pt-25 pb-16 px-6 relative overflow-hidden bg-[#F8F7F4] dark:bg-[#0C0C0F]'>
      {/* BG decorations */}
      <div className='absolute -top-45 -right-30 w-137.5 h-137.5 rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.05)_0%,transparent_70%)] pointer-events-none' />
      <div className='absolute -bottom-20 -left-20 w-87.5 h-87.5 rounded-full bg-[radial-gradient(circle,rgba(217,119,6,0.04)_0%,transparent_70%)] pointer-events-none' />

      <div className='max-w-300 mx-auto w-full flex flex-wrap items-center gap-14'>
        {/* Left */}
        <div className='flex-[1_1_520px]'>
          <FadeIn>
            <div className='inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-semibold mb-6'>
              <Zap size={13} /> Desenvolvimento Web & E-Commerce
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <h1 className='font-display text-[clamp(38px,5.5vw,60px)] font-normal leading-[1.08] mb-6 text-zinc-900 dark:text-zinc-100'>
              Sites e Lojas Online
              <br />
              sob medida que{' '}
              <em className='italic text-green-600 dark:text-green-400'>
                realmente
              </em>
              <br />
              geram vendas.
            </h1>
          </FadeIn>

          <FadeIn delay={160}>
            <p className='text-[17px] leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-120 mb-9'>
              A maioria dos sites usa templates lentos e genéricos. Eu
              desenvolvo código próprio, rápido e escalável — pensado para
              conversão desde o primeiro pixel. Você fala direto comigo, sem
              agência inflando o preço no meio.
            </p>
          </FadeIn>

          <FadeIn delay={240}>
            <div className='flex flex-wrap gap-3.5'>
              <Button
                href={getWhatsAppUrl('Olá! Quero iniciar meu projeto.')}
                external
                variant='primary'
                size='lg'
                whatsapp
              >
                Iniciar Projeto
              </Button>
              <Button href='#portfolio' variant='outline' size='lg'>
                Ver Portfólio <ArrowRight size={15} />
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={320}>
            <div className='flex flex-wrap gap-9 mt-13'>
              {stats.map(s => (
                <div key={s.label}>
                  <div className='text-[26px] font-extrabold text-green-600 dark:text-green-400'>
                    {s.value}
                  </div>
                  <div className='text-[13px] text-zinc-400 dark:text-zinc-500 mt-0.5'>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Right — Radial Orbital Timeline */}
        <FadeIn delay={200} className='flex-[1_1_420px] flex justify-center'>
          <RadialOrbitalTimeline timelineData={timelineData} />
        </FadeIn>
      </div>
    </section>
  );
}
