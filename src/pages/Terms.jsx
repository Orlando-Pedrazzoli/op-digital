import { useTranslation } from 'react-i18next';
import SEO from '@/components/seo/SEO';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

export default function Terms() {
  const { t } = useTranslation();
  const sections = t('terms.sections', { returnObjects: true });

  return (
    <>
      <SEO
        title={t('seo.terms.title')}
        description={t('seo.terms.description')}
        path='/termos'
      />
      <Navbar />

      <main className='pt-28 pb-24 px-6 bg-[#F8F7F4] dark:bg-[#131834]'>
        <article className='max-w-180 mx-auto'>
          {/* Header */}
          <div className='mb-12'>
            <p className='text-xs font-bold tracking-[2.5px] uppercase text-green-600 dark:text-green-400 mb-3'>
              {t('terms.label')}
            </p>
            <h1 className='font-display text-[clamp(32px,5vw,48px)] font-normal text-zinc-900 dark:text-zinc-100 leading-[1.1] mb-4'>
              {t('terms.heading')}{' '}
              <em className='italic text-green-600 dark:text-green-400'>
                {t('terms.headingHighlight')}
              </em>
            </h1>
            <p className='text-sm text-zinc-400 dark:text-zinc-500'>
              {t('terms.lastUpdateLabel')} {t('terms.lastUpdate')}
            </p>
          </div>

          {/* Content */}
          <div className='space-y-10 text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed'>
            {sections.map((section, i) => (
              <section key={i}>
                <h2
                  className='font-sans text-[18px] font-bold text-zinc-900 dark:text-zinc-100 mb-3'
                  style={{ fontStyle: 'normal' }}
                >
                  {section.title}
                </h2>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
