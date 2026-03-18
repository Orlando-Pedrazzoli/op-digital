import SEO from '@/components/seo/SEO';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import AboutMe from '@/components/sections/AboutMe';
import Process from '@/components/sections/Process';

export default function Sobre() {
  return (
    <>
      <SEO
        title='Sobre | Pedrazzoli Digital'
        description='Conheça Orlando Pedrazzoli — Full Stack Developer com 10+ anos de experiência empreendedora e 3+ anos em desenvolvimento web.'
      />
      <Navbar />
      <main className='relative z-20 bg-[#F8F7F4] dark:bg-[#0C0C0F]'>
        <div className='pt-20' />
        <AboutMe />
        <Process />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
