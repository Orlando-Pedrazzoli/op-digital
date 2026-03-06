import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import { features } from '@/data/features';

export default function Features() {
  return (
    <section
      id='funcionalidades'
      className='py-24 px-6 bg-[#F8F7F4] dark:bg-[#0C0C0F]'
    >
      <div className='max-w-300 mx-auto'>
        {/* Contrast block — "por que não template" */}
        <FadeIn>
          <div className='max-w-260 mx-auto mb-14 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-10 flex flex-col md:flex-row gap-8 items-start shadow-sm'>
            <div className='flex-1'>
              <p className='text-[11px] font-semibold uppercase tracking-[1.5px] text-red-500 dark:text-red-400 mb-3'>
                O problema
              </p>
              <h3 className='text-[20px] font-bold text-zinc-900 dark:text-white mb-3 leading-snug'>
                Templates lentos, genéricos e limitados.
              </h3>
              <p className='text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed'>
                WordPress, Wix e Shopify parecem fáceis — mas cobram pelo que
                limitam. Plugins pesados, visual igual ao do concorrente e você
                sempre dependente de terceiros para qualquer mudança.
              </p>
            </div>
            <div className='w-px bg-zinc-200 dark:bg-zinc-700 self-stretch hidden md:block' />
            <div className='flex-1'>
              <p className='text-[11px] font-semibold uppercase tracking-[1.5px] text-green-600 dark:text-green-400 mb-3'>
                A solução
              </p>
              <h3 className='text-[20px] font-bold text-zinc-900 dark:text-white mb-3 leading-snug'>
                Código próprio, rápido, escalável e feito para converter.
              </h3>
              <p className='text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed'>
                Cada linha escrita do zero para o seu negócio. Performance
                máxima, design único e liberdade total para crescer. Você fala
                direto comigo — sem intermediários, sem agência inflando preço.
              </p>
            </div>
          </div>
        </FadeIn>

        <SectionHeader
          label='Funcionalidades'
          title='Tudo incluso. <em>Sem surpresas.</em>'
          description='Cada projeto é entregue completo e pronto para funcionar. Estas são as funcionalidades que vêm em toda solução que desenvolvo.'
        />

        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5'>
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 50}>
              <div className='group p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 h-full transition-all duration-400 hover:border-green-600/50 dark:hover:border-green-500/50 hover:shadow-[0_12px_36px_rgba(22,163,74,0.08)] dark:hover:shadow-[0_12px_36px_rgba(22,163,74,0.12)] hover:-translate-y-1.5'>
                <div className='w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-3.5 transition-all duration-400 group-hover:scale-110 group-hover:bg-green-100 dark:group-hover:bg-green-900/35 group-hover:rotate-6'>
                  <f.icon
                    size={20}
                    className='text-green-600 dark:text-green-400'
                  />
                </div>
                <h3 className='text-[15px] font-bold text-zinc-900 dark:text-zinc-100 mb-1.5 transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-400'>
                  {f.title}
                </h3>
                <p className='text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400'>
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
