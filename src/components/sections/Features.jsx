import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import { AnimatedFolder } from '@/components/ui/AnimatedFolder';
import { featuresFolders } from '@/data/features';

export default function Features() {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const timeout = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4000);

    return () => clearTimeout(timeout);
  }, [api, current]);

  return (
    <section id='funcionalidades' className='py-24 px-6 bg-zinc-950'>
      <div className='max-w-7xl mx-auto'>
        <SectionHeader
          label='Funcionalidades'
          title='Tudo incluso. <em>Sem surpresas.</em>'
          description='Cada projeto é entregue completo e pronto para funcionar. Explore as áreas de atuação da Pedrazzoli Digital.'
        />

        <FadeIn>
          <Carousel
            setApi={setApi}
            className='w-full mt-12'
            opts={{ align: 'start', loop: true }}
          >
            <CarouselContent>
              {featuresFolders.map((folder, index) => (
                <CarouselItem
                  className='basis-full sm:basis-1/2 lg:basis-1/3'
                  key={index}
                >
                  <AnimatedFolder
                    title={folder.title}
                    description={folder.description}
                    projects={folder.projects}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </FadeIn>
      </div>
    </section>
  );
}
