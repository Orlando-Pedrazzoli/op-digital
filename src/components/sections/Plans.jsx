import { CheckCircle, Shield, AlertTriangle } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { plans, maintenancePlan } from '@/data/plans';
import { getPlanWhatsApp } from '@/utils/whatsapp';

export default function Plans() {
  return (
    <section id='planos' className='py-24 px-6 bg-white dark:bg-zinc-950'>
      <div className='max-w-300 mx-auto'>
        <SectionHeader
          label='Investimento'
          title='Planos <em>transparentes.</em>'
          description='Pagamento único pela criação. Você paga pelo que recebe — e recebe tudo funcionando.'
        />

        {/* Anchoring value before price */}
        <FadeIn>
          <div className='max-w-175 mx-auto mb-10 px-7 py-5 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 flex items-start gap-3'>
            <AlertTriangle
              size={18}
              className='text-amber-600 dark:text-amber-400 mt-0.5 shrink-0'
            />
            <p className='text-[14px] text-amber-800 dark:text-amber-300 leading-relaxed'>
              <strong>Um site mal feito custa caro todos os dias.</strong>{' '}
              Lento, sem conversão ou travado em template genérico — você perde
              cliente antes mesmo de ele ver seu produto. Um site profissional
              trabalha por você 24h por dia, 7 dias por semana.
            </p>
          </div>
        </FadeIn>

        {/* Trust signals */}
        <FadeIn>
          <div className='flex flex-wrap justify-center gap-6 mb-12 text-[13px] text-zinc-500 dark:text-zinc-400'>
            {[
              'Contrato formal',
              'Nota fiscal emitida',
              'Entrega em 15–45 dias',
              'Atendimento Brasil inteiro',
            ].map(item => (
              <div key={item} className='flex items-center gap-1.5'>
                <Shield
                  size={14}
                  className='text-green-600 dark:text-green-400'
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 max-w-260 mx-auto'>
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 100}>
              <div
                className={`
                rounded-[20px] p-9 h-full flex flex-col relative overflow-hidden
                transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.1)]
                ${
                  plan.highlight
                    ? 'bg-zinc-900 dark:bg-zinc-800 text-white border border-zinc-800 dark:border-zinc-700'
                    : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800'
                }
              `}
              >
                {plan.highlight && (
                  <div className='absolute top-4.5 -right-7.5 bg-amber-600 text-white px-10 py-1 text-[10px] font-bold rotate-45 tracking-[1.5px] uppercase'>
                    Mais pedido
                  </div>
                )}

                <p
                  className={`text-xs font-semibold uppercase tracking-[1px] mb-1 ${plan.highlight ? 'text-white/50' : 'text-zinc-400 dark:text-zinc-500'}`}
                >
                  {plan.desc}
                </p>
                <h3 className='text-[22px] font-extrabold mb-5'>{plan.name}</h3>

                <div className='mb-6'>
                  {plan.fromPrice && (
                    <span className='text-[13px] opacity-60'>a partir de </span>
                  )}
                  <span
                    className={`font-extrabold ${plan.highlight ? 'text-white' : 'text-green-600 dark:text-green-400'}`}
                    style={{ fontSize: plan.fromPrice ? 44 : 32 }}
                  >
                    {plan.fromPrice ? `R$ ${plan.price}` : plan.price}
                  </span>
                </div>

                <div
                  className={`border-t pt-5 mb-6 flex-1 ${plan.highlight ? 'border-white/10' : 'border-zinc-200 dark:border-zinc-800'}`}
                >
                  {plan.features.map(f => (
                    <div key={f} className='flex items-start gap-2.5 mb-2.5'>
                      <CheckCircle
                        size={15}
                        className={`mt-0.5 shrink-0 ${plan.highlight ? 'text-green-400' : 'text-green-600 dark:text-green-400'}`}
                      />
                      <span
                        className={`text-[13px] leading-snug ${plan.highlight ? 'text-white/80' : 'text-zinc-500 dark:text-zinc-400'}`}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  href={getPlanWhatsApp(plan.name)}
                  external
                  variant={plan.highlight ? 'primary' : 'outline'}
                  whatsapp
                  fullWidth
                >
                  {plan.cta}
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Garantia + manutenção */}
        <FadeIn delay={300}>
          <div className='max-w-175 mx-auto mt-10 space-y-4'>
            <div className='text-center py-5 px-7 rounded-[14px] bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-700/50'>
              <p className='text-sm text-green-800 dark:text-green-300 leading-relaxed'>
                <strong>Garantia de satisfação:</strong> Ajustes até a aprovação
                final. Se o resultado não ficar como esperado, refinamos juntos
                até chegar lá.
              </p>
            </div>

            <div className='text-center py-5 px-7 rounded-[14px] bg-amber-50 dark:bg-amber-900/15 border border-amber-200 dark:border-amber-700/50'>
              <p className='text-sm text-amber-800 dark:text-amber-300 leading-relaxed'>
                <strong>Manutenção mensal opcional:</strong> A partir de R${' '}
                {maintenancePlan.price}/mês para{' '}
                {maintenancePlan.description.toLowerCase()}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
