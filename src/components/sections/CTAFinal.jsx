import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import Button from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/utils/whatsapp';

// EmailJS config — preencha com seus dados (https://www.emailjs.com)
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

const businessOptions = [
  'Loja Online / E-Commerce',
  'Restaurante / Cafeteria',
  'Clínica / Saúde',
  'Salão / Barbearia',
  'Imobiliária',
  'Serviços / Oficina',
  'Turismo',
  'Educação / Cursos',
  'Outro',
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  business: '',
  message: '',
};

export default function CTAFinal() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');

    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone || 'Não informado',
          business_type: form.business || 'Não informado',
          message: form.message,
          to_email: 'pedrazzoliorlando@gmail.com',
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus('success');
      setForm(initialForm);
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputLight =
    'w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all';
  const inputTheme = `${inputLight} bg-zinc-50 dark:bg-white/6 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-white/30 focus:border-green-500 dark:focus:border-green-500 focus:bg-white dark:focus:bg-white/8 focus:ring-1 focus:ring-green-500/30`;

  return (
    <section id='contato' className='py-24 px-6 bg-[#F8F7F4] dark:bg-[#0C0C0F]'>
      <FadeIn>
        <div className='max-w-220 mx-auto rounded-3xl py-16 px-8 md:px-14 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative overflow-hidden'>
          {/* BG decorations */}
          <div className='absolute -top-15 -right-15 w-55 h-55 rounded-full bg-green-600/8 dark:bg-green-600/12 pointer-events-none' />
          <div className='absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-amber-600/5 dark:bg-amber-600/8 pointer-events-none' />

          <div className='relative flex flex-col lg:flex-row gap-12 lg:gap-16 items-start'>
            {/* Left */}
            <div className='flex-1 lg:max-w-75'>
              <h2 className='font-display text-[clamp(24px,4vw,36px)] font-normal text-zinc-900 dark:text-white mb-4 leading-[1.15]'>
                Vamos criar algo{' '}
                <em className='italic text-green-600 dark:text-green-400'>
                  incrível?
                </em>
              </h2>
              <p className='text-[15px] text-zinc-500 dark:text-white/50 leading-relaxed mb-6'>
                Preencha o formulário e receba um orçamento personalizado em até
                24 horas. Sem compromisso.
              </p>

              <div className='hidden lg:block'>
                <p className='text-[13px] text-zinc-400 dark:text-white/35 mb-3'>
                  Ou se preferir:
                </p>
                <Button
                  href={getWhatsAppUrl()}
                  external
                  variant='primary'
                  size='md'
                  whatsapp
                >
                  Falar no WhatsApp
                </Button>
              </div>
            </div>

            {/* Right */}
            <div className='flex-1 w-full'>
              {status === 'success' ? (
                <div className='flex flex-col items-center justify-center text-center py-12'>
                  <div className='w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/15 flex items-center justify-center mb-4'>
                    <CheckCircle
                      size={32}
                      className='text-green-600 dark:text-green-400'
                    />
                  </div>
                  <h3 className='text-xl font-bold text-zinc-900 dark:text-white mb-2'>
                    Mensagem enviada!
                  </h3>
                  <p className='text-sm text-zinc-500 dark:text-white/50'>
                    Retorno em até 24 horas. Fique de olho no seu email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='flex flex-col sm:flex-row gap-4'>
                    <input
                      type='text'
                      name='name'
                      placeholder='Seu nome *'
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={inputTheme}
                    />
                    <input
                      type='email'
                      name='email'
                      placeholder='Seu email *'
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={inputTheme}
                    />
                  </div>

                  <div className='flex flex-col sm:flex-row gap-4'>
                    <input
                      type='tel'
                      name='phone'
                      placeholder='WhatsApp (opcional)'
                      value={form.phone}
                      onChange={handleChange}
                      className={inputTheme}
                    />
                    <select
                      name='business'
                      value={form.business}
                      onChange={handleChange}
                      className={`${inputTheme} ${!form.business ? 'text-zinc-400 dark:text-white/30' : ''}`}
                    >
                      <option value='' disabled>
                        Tipo de negócio
                      </option>
                      {businessOptions.map(opt => (
                        <option
                          key={opt}
                          value={opt}
                          className='bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white'
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    name='message'
                    placeholder='Conte um pouco sobre seu projeto... *'
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputTheme} resize-none`}
                  />

                  <div className='pt-2'>
                    <button
                      type='submit'
                      disabled={status === 'sending'}
                      className='w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-white bg-green-600 hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer border-none'
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={18} className='animate-spin' />{' '}
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send size={18} /> Enviar Mensagem
                        </>
                      )}
                    </button>
                  </div>

                  {status === 'error' && (
                    <div className='flex items-center gap-2 text-red-500 dark:text-red-400 text-sm mt-2'>
                      <AlertCircle size={16} />
                      <span>
                        Erro ao enviar. Tente novamente ou use o WhatsApp.
                      </span>
                    </div>
                  )}
                </form>
              )}

              {/* WhatsApp mobile fallback */}
              <div className='block lg:hidden mt-6 text-center'>
                <p className='text-[13px] text-zinc-400 dark:text-white/35 mb-3'>
                  Ou se preferir:
                </p>
                <Button
                  href={getWhatsAppUrl()}
                  external
                  variant='primary'
                  size='md'
                  whatsapp
                  fullWidth
                >
                  Falar no WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
