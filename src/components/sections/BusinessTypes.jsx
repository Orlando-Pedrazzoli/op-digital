import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import { businessTypes } from '@/data/businessTypes';
import { getBusinessWhatsApp } from '@/utils/whatsapp';

export default function BusinessTypes() {
  return (
    <section id='solucoes' className='py-24 px-6 bg-white dark:bg-[#131834]'>
      <div className='max-w-7xl mx-auto'>
        <SectionHeader
          label='Soluções para seu Negócio'
          title='Independentemente do segmento, seu site precisa <em>vender.</em>'
          description='Cada negócio tem necessidades diferentes. Desenvolvo soluções específicas para o seu segmento, com as funcionalidades que realmente fazem diferença no dia a dia.'
        />

        <FadeIn>
          <div className='flex justify-center items-center flex-wrap gap-y-8 gap-x-4 sm:gap-x-6 md:gap-x-8'>
            {businessTypes.map(
              ({ name, desc, gradientFrom, gradientTo }, idx) => (
                <a
                  key={idx}
                  href={getBusinessWhatsApp(name)}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='no-underline'
                >
                  <div className='group relative w-[min(280px,calc(100vw-3rem))] h-[320px] transition-all duration-500'>
                    {/* Skewed gradient panels */}
                    <span
                      className='absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]'
                      style={{
                        background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                      }}
                    />
                    <span
                      className='absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] blur-[30px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]'
                      style={{
                        background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                      }}
                    />

                    {/* Animated blurs — hidden on mobile to prevent overflow */}
                    <span className='pointer-events-none absolute inset-0 z-10 hidden sm:block'>
                      <span className='absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-100 animate-blob group-hover:top-[-50px] group-hover:left-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100' />
                      <span className='absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-50px] group-hover:right-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100' />
                    </span>

                    {/* Content — reduced hover shift on mobile */}
                    <div className='relative z-20 left-0 p-[24px_24px] sm:p-[24px_30px] bg-[rgba(19,24,52,0.85)] backdrop-blur-[12px] shadow-lg rounded-lg text-white transition-all duration-500 sm:group-hover:left-[-25px] sm:group-hover:p-[40px_30px]'>
                      <h2
                        className='text-lg sm:text-xl font-semibold mb-3'
                        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
                      >
                        {name}
                      </h2>
                      <p
                        className='text-[13px] sm:text-sm leading-relaxed text-white/80'
                        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                </a>
              ),
            )}
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <p className='text-center mt-8 text-sm text-zinc-500 dark:text-zinc-400'>
            Não encontrou seu segmento?{' '}
            <a
              href={getBusinessWhatsApp('outro segmento')}
              target='_blank'
              rel='noopener noreferrer'
              className='text-green-600 dark:text-green-400 font-semibold hover:underline'
            >
              Me conta qual é
            </a>{' '}
            — provavelmente já atendemos.
          </p>
        </FadeIn>
      </div>

      {/* Animations needed by the gradient cards */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translateY(10px); }
          50% { transform: translate(-10px); }
        }
        .animate-blob { animation: blob 2s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: -1s; }
      `}</style>
    </section>
  );
}
