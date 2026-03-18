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
                      className='flex basis-[16%] justify-center pl-0 sm:basis-1/5 md:basis-1/6 lg:basis-[12.5%]'
                    >
                      <div className='sm:mx-6 flex shrink-0 flex-col items-center justify-center gap-1.5 sm:gap-2'>
                        <img
                          src={tech.image}
                          alt={tech.name}
                          className='h-8 w-8 sm:h-10 sm:w-10 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 dark:grayscale-0 dark:opacity-85 dark:hover:opacity-100'
                          loading='lazy'
                        />
                        <span className='text-[9px] sm:text-[11px] text-zinc-400 dark:text-zinc-400 font-medium'>
                          {tech.name}
                        </span>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
