import SEO from '@/components/seo/SEO';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

import Hero from '@/components/sections/Hero';
import Portfolio from '@/components/sections/Portfolio';
import Process from '@/components/sections/Process';
import BusinessTypes from '@/components/sections/BusinessTypes';
import Features from '@/components/sections/Features';
import Plans from '@/components/sections/Plans';
import FAQ from '@/components/sections/FAQ';
import CTAFinal from '@/components/sections/CTAFinal';

export default function Home() {
  return (
    <>
      <SEO />
      <Navbar />

      <main>
        {/* 1. Promessa forte */}
        <Hero />
        {/* 2. Prova social imediata — credibilidade antes de tudo */}
        <Portfolio />
        {/* 3. Como funciona — simplicidade do processo */}
        <Process />
        {/* 4. Soluções por segmento — identificação */}
        <BusinessTypes />
        {/* 5. Funcionalidades — justificativa técnica */}
        <Features />
        {/* 6. Planos — decisão de investimento */}
        <Plans />
        {/* 7. FAQ — eliminar objeções */}
        <FAQ />
        {/* 8. CTA final — conversão */}
        <CTAFinal />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
