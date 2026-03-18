import { Code, Mail, Phone, Instagram, Cookie } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '@/utils/config';
import { getWhatsAppUrl } from '@/utils/whatsapp';
import { useCookieConsent } from '@/contexts/CookieProvider';

const navLinks = [
  { label: 'Portfólio', href: '/#portfolio' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Planos', href: '/#planos' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contato', href: '/#contato' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { openPreferences } = useCookieConsent();

  return (
    <footer className='pt-16 pb-8 px-6 border-t border-zinc-200 dark:border-zinc-800 bg-[#F8F7F4] dark:bg-[#0C0C0F]'>
      <div className='max-w-300 mx-auto'>
        {/* Top grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-14'>
          {/* Brand */}
          <div className='sm:col-span-2 lg:col-span-1'>
            <Link to='/' className='flex items-center gap-2 mb-4 no-underline'>
              <div className='w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center'>
                <Code size={14} color='#fff' />
              </div>
              <span className='font-display text-lg text-zinc-900 dark:text-zinc-100'>
                {siteConfig.name}
              </span>
            </Link>
            <p className='text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-65'>
              Sites e lojas online com código próprio, feitos para converter.
              Sem templates, sem limitações.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className='text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4'>
              Navegação
            </h4>
            <ul className='space-y-2.5 list-none p-0 m-0'>
              {navLinks.map(link => (
                <li key={link.href}>
                  {link.href.startsWith('/') && !link.href.startsWith('/#') ? (
                    <Link
                      to={link.href}
                      className='text-[13px] text-zinc-500 dark:text-zinc-400 no-underline hover:text-green-600 dark:hover:text-green-400 transition-colors'
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className='text-[13px] text-zinc-500 dark:text-zinc-400 no-underline hover:text-green-600 dark:hover:text-green-400 transition-colors'
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className='text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4'>
              Legal
            </h4>
            <ul className='space-y-2.5 list-none p-0 m-0'>
              <li>
                <Link
                  to='/privacidade'
                  className='text-[13px] text-zinc-500 dark:text-zinc-400 no-underline hover:text-green-600 dark:hover:text-green-400 transition-colors'
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to='/termos'
                  className='text-[13px] text-zinc-500 dark:text-zinc-400 no-underline hover:text-green-600 dark:hover:text-green-400 transition-colors'
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <button
                  onClick={openPreferences}
                  className='text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-400 transition-colors bg-transparent border-none cursor-pointer p-0 flex items-center gap-1.5'
                >
                  <Cookie size={12} /> Gerenciar Cookies
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className='text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4'>
              Contato
            </h4>
            <ul className='space-y-3 list-none p-0 m-0'>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[13px] text-zinc-500 dark:text-zinc-400 no-underline hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-2'
                >
                  <Phone size={13} /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className='text-[13px] text-zinc-500 dark:text-zinc-400 no-underline hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-2'
                >
                  <Mail size={13} /> {siteConfig.contact.email}
                </a>
              </li>
              {siteConfig.social?.instagram && (
                <li>
                  <a
                    href={`https://instagram.com/${siteConfig.social.instagram.replace('@', '')}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[13px] text-zinc-500 dark:text-zinc-400 no-underline hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-2'
                  >
                    <Instagram size={13} /> {siteConfig.social.instagram}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className='border-t border-zinc-200 dark:border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3'>
          <p className='text-[11px] text-zinc-400 dark:text-zinc-500'>
            © {currentYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p className='text-[11px] text-zinc-400 dark:text-zinc-500'>
            Feito com código próprio — zero templates.
          </p>
        </div>
      </div>
    </footer>
  );
}
