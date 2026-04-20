import {
  CheckCircle,
  Shield,
  AlertTriangle,
  Crown,
  FileText,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { getPlanWhatsApp } from '@/utils/whatsapp';

export default function Plans() {
  const { t } = useTranslation();
  const scopeTranslations = t('plans.list', { returnObjects: true });
  const trustSignals = t('plans.trustSignals', { returnObjects: true });
  const pricingPoints = t('plans.pricingModel.points', { returnObjects: true });

  // highlight index (E-Commerce = index 1)
  const highlightIndex = 1;

  return (
    <section id='planos' className='py-24 px-6 bg-white dark:bg-[#131834]'>
      <div className='max-w-300 mx-auto'>
        <SectionHeader
          label={t('plans.label')}
          title={t('plans.title')}
          description={t('plans.description')}
        />

        {/* Warning */}
        <FadeIn>
          <div className='max-w-175 mx-auto mb-10 px-5 sm:px-7 py-5 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 flex items-start gap-3'>
            <AlertTriangle
              size={18}
              className='text-amber-600 dark:text-amber-400 mt-0.5 shrink-0'
            />
            <p
              className='text-[13px] sm:text-[14px] text-amber-800 dark:text-amber-300 leading-relaxed'
              dangerouslySetInnerHTML={{ __html: t('plans.warning') }}
            />
          </div>
        </FadeIn>

        {/* Trust signals */}
        <FadeIn>
          <div className='flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 text-[12px] sm:text-[13px] text-zinc-500 dark:text-zinc-400'>
            {trustSignals.map(item => (
              <div key={item} className='flex items-center gap-1.5'>
                <Shield
                  size={14}
                  className='text-green-600 dark:text-green-400'
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Scope cards */}
        <div className='grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6 max-w-260 mx-auto'>
          {scopeTranslations.map((scope, i) => {
            const isHighlight = i === highlightIndex;

            return (
              <FadeIn key={scope.name} delay={i * 100}>
                <div
                  className={`
                  rounded-[20px] p-6 sm:p-9 h-full flex flex-col relative overflow-hidden
                  transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)]
                  bg-white dark:bg-[#1a2042] text-zinc-900 dark:text-zinc-100
                  ${
                    isHighlight
                      ? 'border-2 border-green-600 dark:border-green-500 shadow-[0_8px_32px_rgba(22,163,74,0.10)] dark:shadow-[0_8px_32px_rgba(22,163,74,0.15)]'
                      : 'border border-zinc-200 dark:border-white/[0.08]'
                  }
                `}
                >
                  {isHighlight && (
                    <div className='absolute top-0 right-0 flex items-center gap-1.5 bg-green-600 text-white pl-3 pr-4 py-1.5 rounded-bl-xl text-[11px] font-bold uppercase tracking-wider'>
                      <Crown size={12} /> {t('plans.mostPopular')}
                    </div>
                  )}

                  <p className='text-[11px] font-semibold uppercase tracking-[1.5px] text-zinc-400 dark:text-zinc-500 mb-1'>
                    {scope.desc}
                  </p>
                  <h3 className='text-[22px] font-extrabold text-zinc-900 dark:text-zinc-100 mb-6'>
                    {scope.name}
                  </h3>

                  {/* Ideal for — replaces price */}
                  <div className='mb-7 pb-6 border-b border-zinc-100 dark:border-white/[0.06]'>
                    <span className='block text-[11px] font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 mb-2'>
                      {t('plans.idealFor')}
                    </span>
                    <p className='text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300'>
                      {scope.idealFor}
                    </p>
                  </div>

                  <div className='flex-1 mb-6'>
                    <span className='block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3'>
                      {t('plans.whatsIncluded')}
                    </span>
                    {scope.features.map(f => (
                      <div key={f} className='flex items-start gap-2.5 mb-3'>
                        <CheckCircle
                          size={15}
                          className='text-green-600 dark:text-green-400 mt-0.5 shrink-0'
                        />
                        <span className='text-[13px] leading-snug text-zinc-600 dark:text-zinc-400'>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    href={getPlanWhatsApp(scope.name)}
                    external
                    variant={isHighlight ? 'primary' : 'outline'}
                    whatsapp
                    fullWidth
                  >
                    {scope.cta}
                  </Button>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Pricing model explanation — replaces maintenance box */}
        <FadeIn delay={300}>
          <div className='max-w-220 mx-auto mt-14'>
            <div className='rounded-[20px] bg-zinc-50 dark:bg-[#1a2042] border border-zinc-200 dark:border-white/[0.08] p-8 sm:p-10'>
              <div className='flex items-center gap-3 mb-5'>
                <div className='w-10 h-10 rounded-xl bg-green-100 dark:bg-green-500/15 flex items-center justify-center'>
                  <FileText
                    size={20}
                    className='text-green-600 dark:text-green-400'
                  />
                </div>
                <h3 className='text-[18px] sm:text-[20px] font-bold text-zinc-900 dark:text-zinc-100'>
                  {t('plans.pricingModel.title')}
                </h3>
              </div>
              <p className='text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5'>
                {t('plans.pricingModel.description')}
              </p>
              <ul className='space-y-2.5 list-none p-0 m-0'>
                {pricingPoints.map(point => (
                  <li
                    key={point}
                    className='flex items-start gap-2.5 text-[13px] sm:text-[14px] text-zinc-600 dark:text-zinc-400'
                  >
                    <CheckCircle
                      size={15}
                      className='text-green-600 dark:text-green-400 mt-0.5 shrink-0'
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantee */}
            <div className='text-center py-5 px-5 sm:px-7 rounded-[14px] bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-700/50 mt-6'>
              <p
                className='text-sm text-green-800 dark:text-green-300 leading-relaxed'
                dangerouslySetInnerHTML={{ __html: t('plans.guarantee') }}
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
