import SEO from '@/components/seo/SEO';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import VerticalTabs from '@/components/sections/VerticalTabs';
import Features from '@/components/sections/Features';
import BusinessTypes from '@/components/sections/BusinessTypes';
import Process from '@/components/sections/Process';
import Plans from '@/components/sections/Plans';
import CTAFinal from '@/components/sections/CTAFinal';

export default function Servicos() {
  return (
    <>
      <SEO
        title='Servicos | Pedrazzoli Digital'
        description='Desenvolvimento web, e-commerce, UI/UX design, branding, SEO e suporte continuo. Conheca todos os servicos da Pedrazzoli Digital.'
      />
      <Navbar />
      <main className='relative z-20 bg-[#F8F7F4] dark:bg-[#131834]'>
        <div className='pt-20' />
        <VerticalTabs />
        <Features />
        <BusinessTypes />
        <Process />
        <Plans />
        <CTAFinal />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
