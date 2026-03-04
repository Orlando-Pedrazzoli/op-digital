import { ExternalLink, ArrowRight, Rocket, CheckCircle } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { portfolioProjects } from '@/data/portfolio';
import { getWhatsAppUrl } from '@/utils/whatsapp';

export default function Portfolio() {
  return (
    <section
      id='portfolio'
      className='py-24 px-6 bg-[#F8F7F4] dark:bg-[#0C0C0F]'
    >
      <div className='max-w-300 mx-auto'>
        <SectionHeader
          label='Portfólio'
          title='Projetos <em>reais</em>, resultados reais.'
          description='Cada projeto é construído do zero com código próprio. Sem templates, sem limitações — e com resultados mensuráveis.'
        />

        {/* Projects grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-260 mx-auto'>
          {portfolioProjects.map((project, i) => (
            <FadeIn key={project.name} delay={i * 100}>
              <div className='group bg-white dark:bg-zinc-900 rounded-[20px] border border-zinc-200 dark:border-zinc-800 overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]'>
                {/* Card header */}
                <div className='p-7 pb-0'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                      <div
                        className='w-11 h-11 rounded-xl flex items-center justify-center shrink-0'
                        style={{ background: project.colorLight }}
                      >
                        <project.icon
                          size={22}
                          style={{ color: project.color }}
                        />
                      </div>
                      <div>
                        <h3 className='text-[17px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight'>
                          {project.name}
                        </h3>
                        <span
                          className='text-[12px] font-semibold uppercase tracking-[0.5px]'
                          style={{ color: project.color }}
                        >
                          {project.type}
                        </span>
                      </div>
                    </div>
                    <a
                      href={project.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-green-600 dark:hover:text-green-400 hover:border-green-600 dark:hover:border-green-500 transition-all no-underline shrink-0'
                      aria-label={`Visitar ${project.name}`}
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>

                  <p className='text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400 mb-4'>
                    {project.desc}
                  </p>

                  {/* Result badge */}
                  {project.result && (
                    <div className='flex items-start gap-2 mb-5 px-3.5 py-2.5 rounded-xl bg-green-50 dark:bg-green-900/15 border border-green-200 dark:border-green-700/40'>
                      <CheckCircle
                        size={14}
                        className='text-green-600 dark:text-green-400 mt-0.5 shrink-0'
                      />
                      <span className='text-[12px] text-green-800 dark:text-green-300 leading-snug font-medium'>
                        {project.result}
                      </span>
                    </div>
                  )}
                </div>

                {/* Highlights */}
                <div className='mx-7 flex gap-3 mb-5'>
                  {project.highlights.map(h => (
                    <div
                      key={h.label}
                      className='flex-1 text-center py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60'
                    >
                      <div className='text-[17px] font-extrabold text-zinc-900 dark:text-zinc-100'>
                        {h.value}
                      </div>
                      <div className='text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5'>
                        {h.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className='px-7 pb-7 mt-auto'>
                  <div className='flex flex-wrap gap-1.5'>
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className='px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[11px] font-medium text-zinc-500 dark:text-zinc-400'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Next project CTA */}
        <FadeIn delay={400}>
          <div className='flex justify-center mt-10'>
            <div className='bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-7 text-center max-w-100 transition-all duration-300 hover:border-green-600 dark:hover:border-green-500 hover:shadow-[0_8px_32px_rgba(22,163,74,0.06)] hover:-translate-y-1'>
              <div className='w-13 h-13 rounded-[14px] bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center mx-auto mb-3.5'>
                <Rocket size={24} className='text-sky-600 dark:text-sky-400' />
              </div>
              <h3 className='text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1.5'>
                Seu projeto pode ser o próximo
              </h3>
              <p className='text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4'>
                100% dos projetos entregues com sucesso. O próximo case pode ser
                o seu.
              </p>
              <Button
                href={getWhatsAppUrl('Olá! Quero iniciar meu projeto.')}
                external
                variant='ghost'
                size='sm'
                whatsapp
              >
                Iniciar Projeto <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
