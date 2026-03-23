import { ArrowRight } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import Button from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/utils/whatsapp';

/**
 * CTA intermediário reutilizável para usar entre seções
 * @param {string} text - Texto principal do CTA
 * @param {string} buttonText - Texto do botão
 * @param {string} message - Mensagem pré-definida do WhatsApp
 * @param {'light'|'dark'|'green'} variant - Variante visual
 */
export default function CTABanner({
  text = 'Quer ver seu negócio aqui?',
  buttonText = 'Começar Agora',
  message = 'Olá! Quero iniciar meu projeto.',
  variant = 'green',
}) {
  const variants = {
    light: {
      bg: 'bg-[#F8F7F4] dark:bg-[#131834]]',
      card: 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800',
      text: 'text-zinc-900 dark:text-zinc-100',
    },
    dark: {
      bg: 'bg-white dark:bg-[#131834]',
      card: 'bg-zinc-900 dark:bg-zinc-800 border border-zinc-800 dark:border-zinc-700',
      text: 'text-white',
    },
    green: {
      bg: 'bg-white dark:bg-[#131834]',
      card: 'bg-green-600 dark:bg-green-700 border border-green-500 dark:border-green-600',
      text: 'text-white',
    },
  };

  const v = variants[variant];

  return (
    <div className={`py-8 px-6 ${v.bg}`}>
      <FadeIn>
        <div
          className={`max-w-200 mx-auto ${v.card} rounded-2xl px-8 py-6 md:px-12 md:py-7 flex flex-col sm:flex-row items-center justify-between gap-5`}
        >
          <p
            className={`text-[17px] md:text-[20px] font-display font-normal ${v.text} text-center sm:text-left`}
          >
            {text}
          </p>
          <Button
            href={getWhatsAppUrl(message)}
            external
            variant={variant === 'green' ? 'outline' : 'primary'}
            size='md'
            whatsapp
            className={`shrink-0 ${variant === 'green' ? 'bg-white! text-green-700! border-white! hover:bg-green-50! hover:text-green-800!' : ''}`}
          >
            {buttonText} <ArrowRight size={15} />
          </Button>
        </div>
      </FadeIn>
    </div>
  );
}
