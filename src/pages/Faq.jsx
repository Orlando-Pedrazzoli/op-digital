import SEO from '@/components/seo/SEO';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import FAQ from '@/components/sections/FAQ';

export default function Faq() {
  return (
    <>
      <SEO
        title='FAQ | Pedrazzoli Digital'
        description='Perguntas frequentes sobre desenvolvimento de sites, lojas virtuais, prazos, pagamentos e suporte da Pedrazzoli Digital.'
      />
      <Navbar />
      <main className='relative z-20 bg-[#F8F7F4] dark:bg-[#0C0C0F]'>
        <div className='pt-20' />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
