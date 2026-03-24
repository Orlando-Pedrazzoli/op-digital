import SEO from '@/components/seo/SEO';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import EtherealHero from '@/components/sections/EtherealHero';
import Features from '@/components/sections/Features';
import BusinessTypes from '@/components/sections/BusinessTypes';
import TechStack from '@/components/sections/TechStack';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Process from '@/components/sections/Process';
import Plans from '@/components/sections/Plans';
import FAQ from '@/components/sections/FAQ';
import CTAFinal from '@/components/sections/CTAFinal';

export default function Home() {
  return (
    <>
      <SEO />
      <Navbar />
      <main>
        {/* 1. Hero — proposta de valor + CTA */}
        <EtherealHero />

        {/* Conteudo principal — acima do canvas sticky */}
        <div className='relative z-20 bg-[#F8F7F4] dark:bg-[#0C0C0F]'>
          {/* 2. Features — trust signals, diferenciais rapidos */}
          <Features />

          {/* 3. BusinessTypes — para quem e */}
          <BusinessTypes />

          {/* 4. Portfolio — prova de trabalho (preview, link para /portfolio) */}
          <Portfolio />

          {/* 5. Testimonials — prova social */}
          <Testimonials />

          {/* 6. Process — como funciona */}
          <Process />

          {/* 7. TechStack — credibilidade tecnica */}
          <TechStack />

          {/* 8. Plans — decisao de investimento (preview, link para /planos) */}
          <Plans />

          {/* 9. FAQ — versao resumida */}
          <FAQ />

          {/* 10. CTA final — conversao */}
          <CTAFinal />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
