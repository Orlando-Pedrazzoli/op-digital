import AutoScroll from 'embla-carousel-auto-scroll';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { techStack } from '@/data/techStack';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';

export default function TechStack() {
  return (
    <section className='py-20 px-6 bg-[#F8F7F4] dark:bg-[#0C0C0F]'>
      <div className='max-w-7xl mx-auto'>
        <SectionHeader
          label='Tecnologias'
          title='Ferramentas que <em>utilizo.</em>'
          description='Stack moderna e testada em produção. Cada tecnologia é escolhida pelo resultado que entrega ao seu negócio.'
        />

        <FadeIn>
          <div className='mt-12'>
            <div className='relative mx-auto flex items-center justify-center lg:max-w-5xl'>
              <Carousel
                opts={{ loop: true }}
                plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
              >
                <CarouselContent className='ml-0'>
                  {techStack.map(tech => (
                    <CarouselItem
                      key={tech.id}
                      className='flex basis-1/4 justify-center pl-0 sm:basis-1/5 md:basis-1/6 lg:basis-[12.5%]'
                    >
                      <div className='mx-6 flex shrink-0 flex-col items-center justify-center gap-2'>
                        <img
                          src={tech.image}
                          alt={tech.name}
                          className='h-10 w-10 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0'
                          loading='lazy'
                        />
                        <span className='text-[11px] text-zinc-400 dark:text-zinc-500 font-medium'>
                          {tech.name}
                        </span>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              {/* Fade edges */}
              <div className='absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F8F7F4] dark:from-[#0C0C0F] to-transparent pointer-events-none' />
              <div className='absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F8F7F4] dark:from-[#0C0C0F] to-transparent pointer-events-none' />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
