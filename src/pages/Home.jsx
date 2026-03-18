import SEO from '@/components/seo/SEO';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import EtherealHero from '@/components/sections/EtherealHero';
import TechStack from '@/components/sections/TechStack';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Plans from '@/components/sections/Plans';
import CTAFinal from '@/components/sections/CTAFinal';

export default function Home() {
  return (
    <>
      <SEO />
      <Navbar />
      <main>
        {/* Ethereal Hero — esfera 3D com scroll storytelling */}
        <EtherealHero />

        {/* Conteúdo principal — acima do canvas sticky */}
        <div className='relative z-20 bg-[#F8F7F4] dark:bg-[#0C0C0F]'>
          {/* Tech Stack — credibilidade técnica */}
          <TechStack />

          {/* Portfólio — prova de trabalho */}
          <Portfolio />

          {/* Depoimentos — prova social */}
          <Testimonials />

          {/* Planos — decisão de investimento */}
          <Plans />

          {/* CTA final — conversão */}
          <CTAFinal />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
