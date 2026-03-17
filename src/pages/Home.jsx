import SEO from '@/components/seo/SEO';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import Hero from '@/components/sections/Hero';
import TechStack from '@/components/sections/TechStack';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import AboutMe from '@/components/sections/AboutMe';
import VerticalTabs from '@/components/sections/VerticalTabs';
import Process from '@/components/sections/Process';
import BusinessTypes from '@/components/sections/BusinessTypes';
import Features from '@/components/sections/Features';
import Plans from '@/components/sections/Plans';
import FAQ from '@/components/sections/FAQ';
import CTAFinal from '@/components/sections/CTAFinal';
import CTABanner from '@/components/ui/CTABanner';

export default function Home() {
  return (
    <>
      <SEO />
      <Navbar />

      <main>
        {/* 1. Promessa forte */}
        <Hero />

        {/* 1.5 Tech Stack — credibilidade técnica imediata */}
        <TechStack />

        {/* 2. Prova social imediata — credibilidade antes de tudo */}
        <Portfolio />

        {/* 2.5 CTA intermediário — após ver os projetos */}
        <CTABanner
          text='Quer ver seu negócio com resultados assim?'
          buttonText='Falar sobre meu projeto'
          message='Olá! Vi o portfólio e quero conversar sobre meu projeto.'
          variant='green'
        />

        {/* 3. Depoimentos — prova social reforçada */}
        <Testimonials />

        {/* 4. Sobre mim — confiança pessoal */}
        <AboutMe />

        {/* 4.5 Mapa — alcance global */}
        <VerticalTabs />

        {/* 5. Como funciona — simplicidade do processo */}
        <Process />

        {/* 5.5 CTA intermediário — após entender o processo */}
        <CTABanner
          text='Pronto para o primeiro passo?'
          buttonText='Agendar Conversa'
          message='Olá! Quero agendar uma conversa sobre meu projeto.'
          variant='light'
        />

        {/* 6. Soluções por segmento — identificação */}
        <BusinessTypes />

        {/* 7. Funcionalidades — justificativa técnica */}
        <Features />

        {/* 8. Planos — decisão de investimento */}
        <Plans />

        {/* 9. FAQ — eliminar objeções */}
        <FAQ />

        {/* 10. CTA final — conversão */}
        <CTAFinal />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
