import { useState, useEffect } from 'react';
import { Code, Menu, X } from 'lucide-react';
import { siteConfig } from '@/utils/config';
import { getWhatsAppUrl } from '@/utils/whatsapp';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navLinks = [
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Como Funciona', href: '#processo' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'Planos', href: '#planos' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`
        fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300
        ${
          scrolled
            ? 'bg-[#F8F7F4]/92 dark:bg-[#0C0C0F]/92 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800'
            : 'bg-transparent'
        }
      `}
      >
        <div className='max-w-300 mx-auto h-17 flex items-center justify-between'>
          {/* Logo */}
          <a href='#' className='flex items-center gap-2.5 no-underline'>
            <div className='w-8.5 h-8.5 flex items-center justify-center'>
              <img
                src='/favicon.png'
                alt={`${siteConfig.name} Logo`}
                className='w-full h-full object-contain'
              />
            </div>
            <span className='font-display text-[22px] text-zinc-900 dark:text-zinc-100'>
              {siteConfig.name}
            </span>
          </a>

          {/* Desktop */}
          <div className='hidden md:flex items-center gap-7'>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className='text-sm text-zinc-500 dark:text-zinc-400 no-underline font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors'
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <Button
              href={getWhatsAppUrl()}
              external
              variant='primary'
              size='sm'
              whatsapp
            >
              Fale Comigo
            </Button>
          </div>

          {/* Mobile */}
          <div className='flex md:hidden items-center gap-3'>
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              className='bg-transparent border-none cursor-pointer p-1'
              aria-label='Abrir menu'
            >
              <Menu size={24} className='text-zinc-900 dark:text-zinc-100' />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className='fixed inset-0 z-1001 p-6 pt-20 flex flex-col gap-1 md:hidden bg-white dark:bg-zinc-950'>
          <button
            onClick={() => setMobileOpen(false)}
            className='absolute top-5 right-5 bg-transparent border-none cursor-pointer'
            aria-label='Fechar menu'
          >
            <X size={26} className='text-zinc-900 dark:text-zinc-100' />
          </button>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className='text-lg font-semibold text-zinc-900 dark:text-zinc-100 no-underline py-3 border-b border-zinc-100 dark:border-zinc-800'
            >
              {link.label}
            </a>
          ))}
          <div className='mt-6'>
            <Button
              href={getWhatsAppUrl()}
              external
              variant='primary'
              size='lg'
              whatsapp
              fullWidth
            >
              Fale Comigo
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
