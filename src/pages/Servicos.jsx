import SEO from '@/components/seo/SEO';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import VerticalTabs from '@/components/sections/VerticalTabs';
import Features from '@/components/sections/Features';
import BusinessTypes from '@/components/sections/BusinessTypes';

export default function Servicos() {
  return (
    <>
      <SEO
        title='Serviços | Pedrazzoli Digital'
        description='Desenvolvimento web, e-commerce, UI/UX design, branding, SEO e suporte contínuo. Conheça todos os serviços da Pedrazzoli Digital.'
      />
      <Navbar />
      <main className='relative z-20 bg-[#F8F7F4] dark:bg-[#0C0C0F]'>
        <div className='pt-20' />
        <VerticalTabs />
        <Features />
        <BusinessTypes />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
