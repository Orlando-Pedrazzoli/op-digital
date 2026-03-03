import { Zap, ArrowRight, TrendingUp, CreditCard, Package } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import Button from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/utils/whatsapp';
import { portfolioMain } from '@/data/portfolio';

const stats = [
  { value: '446+', label: 'Produtos online' },
  { value: '3+', label: 'Anos entregando' },
  { value: '100%', label: 'Código próprio' },
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
              Sites e lojas que
              <br />
              <em className='italic text-green-600 dark:text-green-400'>
                geram vendas
              </em>{' '}
              —<br />
              mesmo offline.
            </h1>
          </FadeIn>

          <FadeIn delay={160}>
            <p className='text-[17px] leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-120 mb-9'>
              Desenvolvimento sob medida com tecnologia moderna. Sem template,
              sem WordPress — código próprio, rápido e feito para converter. Do
              restaurante ao e-commerce, eu construo.
            </p>
          </FadeIn>

          <FadeIn delay={240}>
            <div className='flex flex-wrap gap-3.5'>
              <Button
                href={getWhatsAppUrl(
                  'Olá! Gostaria de um orçamento para meu negócio.',
                )}
                external
                variant='primary'
                size='lg'
                whatsapp
              >
                Falar no WhatsApp
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

        {/* Right — Store mockup */}
        <FadeIn delay={200} className='flex-[1_1_420px] flex justify-center'>
          <div className='relative w-full max-w-120'>
            <div className='bg-white dark:bg-zinc-900 rounded-[20px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.4)] ring-1 ring-black/3 dark:ring-white/6'>
              {/* Browser chrome */}
              <div className='px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-700'>
                <div className='flex gap-1.25'>
                  {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => (
                    <div
                      key={c}
                      className='w-2.25 h-2.25 rounded-full'
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <div className='flex-1 bg-white dark:bg-zinc-900 rounded-md px-3 py-1 text-[11px] text-zinc-400 text-center border border-zinc-100 dark:border-zinc-700'>
                  www.elitesurfing.com.br
                </div>
              </div>

              {/* Banner */}
              <div className='h-37.5 bg-linear-to-br from-zinc-900 via-green-900 to-green-600 flex flex-col items-center justify-center gap-1'>
                <span className='text-white text-lg font-bold tracking-[2px]'>
                  ELITE SURFING
                </span>
                <span className='text-white/70 text-[11px]'>
                  Acessórios de Surf • Frete para Todo Brasil
                </span>
              </div>

              {/* Category pills */}
              <div className='flex gap-1.5 px-3.5 py-2.5 overflow-x-auto bg-white dark:bg-zinc-900'>
                {portfolioMain.categories.slice(0, 5).map(c => (
                  <span
                    key={c}
                    className='px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-semibold whitespace-nowrap'
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Product grid */}
              <div className='grid grid-cols-2 gap-2.5 p-3.5 pb-4 bg-white dark:bg-zinc-900'>
                {portfolioMain.mockProducts.map((p, i) => (
                  <div
                    key={i}
                    className='rounded-[10px] border border-zinc-100 dark:border-zinc-800 overflow-hidden'
                  >
                    <div
                      className='h-17.5 flex items-center justify-center'
                      style={{
                        background: `hsl(${140 + i * 25}, 18%, ${90 - i * 2}%)`,
                      }}
                    >
                      <Package
                        size={20}
                        style={{ color: `hsl(${140 + i * 25}, 30%, 60%)` }}
                      />
                    </div>
                    <div className='p-2 bg-white dark:bg-zinc-900'>
                      <div className='text-[10px] text-zinc-400 mb-0.5'>
                        {p.cat}
                      </div>
                      <div className='text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 mb-0.5'>
                        {p.name}
                      </div>
                      <div className='text-xs font-bold text-green-600 dark:text-green-400'>
                        {p.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className='absolute top-10 -right-5 bg-white dark:bg-zinc-800 rounded-[14px] px-4 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex items-center gap-2.5 animate-float'>
              <div className='w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center'>
                <TrendingUp
                  size={16}
                  className='text-green-600 dark:text-green-400'
                />
              </div>
              <div>
                <div className='text-[13px] font-extrabold text-green-600 dark:text-green-400'>
                  5% OFF
                </div>
                <div className='text-[10px] text-zinc-400'>
                  PIX em toda loja
                </div>
              </div>
            </div>

            <div className='absolute bottom-5 -left-4 bg-white dark:bg-zinc-800 rounded-[14px] px-4 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex items-center gap-2.5 animate-float-delayed'>
              <div className='w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center'>
                <CreditCard
                  size={16}
                  className='text-amber-600 dark:text-amber-400'
                />
              </div>
              <div>
                <div className='text-[13px] font-extrabold text-amber-600 dark:text-amber-400'>
                  12x sem juros
                </div>
                <div className='text-[10px] text-zinc-400'>no cartão</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
