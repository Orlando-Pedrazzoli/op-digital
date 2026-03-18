import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import { faqItems } from '@/data/faq';
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section id='faq' className='py-24 px-6 bg-[#F8F7F4] dark:bg-[#0C0C0F]'>
      <div className='max-w-175 mx-auto'>
        <SectionHeader label='Dúvidas' title='Perguntas <em>frequentes.</em>' />
        <div>
          {faqItems.map((item, i) => (
            <FadeIn key={i} delay={i * 40}>
              <div className='border-b border-zinc-200 dark:border-zinc-800'>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className='w-full py-5 flex items-center justify-between bg-transparent border-none cursor-pointer text-left text-base font-semibold text-zinc-900 dark:text-zinc-100'
                >
                  {item.question}
                  <ChevronDown
                    size={18}
                    className={`text-zinc-400 shrink-0 ml-4 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className='overflow-hidden transition-all duration-400 ease-out text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed'
                  style={{
                    maxHeight: openIndex === i ? 600 : 0,
                    paddingBottom: openIndex === i ? 20 : 0,
                  }}
                >
                  {item.answer}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
