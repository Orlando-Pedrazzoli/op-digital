import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import { AnimatedFolder } from '@/components/ui/AnimatedFolder';
import { featuresFolders } from '@/data/features';

export default function Features() {
  return (
    <section id='funcionalidades' className='py-24 px-6 bg-[#131834]'>
      <div className='max-w-7xl mx-auto'>
        <SectionHeader
          label='Funcionalidades'
          title='Tudo incluso. <em>Sem surpresas.</em>'
          description='Cada projeto é entregue completo e pronto para funcionar. Explore as áreas de atuação da Pedrazzoli Digital.'
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12'>
          {featuresFolders.map((folder, index) => (
            <FadeIn key={index} delay={index * 80}>
              <AnimatedFolder
                title={folder.title}
                description={folder.description}
                projects={folder.projects}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
