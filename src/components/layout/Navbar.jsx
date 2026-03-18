import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/utils/config';
import { getWhatsAppUrl } from '@/utils/whatsapp';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navLinks = [
  { label: 'Portfólio', href: '#portfolio', type: 'anchor' },
  { label: 'Serviços', href: '/servicos', type: 'page' },
  { label: 'Sobre', href: '/sobre', type: 'page' },
  { label: 'Planos', href: '#planos', type: 'anchor' },
  { label: 'FAQ', href: '/faq', type: 'page' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

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

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);

    if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + href);
    }
  };

  const handlePageClick = href => {
    setMobileOpen(false);
    navigate(href);
  };

  const handleLogoClick = e => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
          {/* Logo — scroll to top on home, navigate to home on other pages */}
          <Link
            to='/'
            onClick={handleLogoClick}
            className='flex items-center gap-2.5 no-underline'
          >
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
          </Link>

          {/* Desktop */}
          <div className='hidden md:flex items-center gap-7'>
            {navLinks.map(link =>
              link.type === 'page' ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm no-underline font-medium transition-colors ${
                    location.pathname === link.href
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-400'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={isHome ? link.href : `/${link.href}`}
                  onClick={e => handleAnchorClick(e, link.href)}
                  className='text-sm text-zinc-500 dark:text-zinc-400 no-underline font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors'
                >
                  {link.label}
                </a>
              ),
            )}
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
          {navLinks.map(link =>
            link.type === 'page' ? (
              <button
                key={link.href}
                onClick={() => handlePageClick(link.href)}
                className='text-lg font-semibold text-zinc-900 dark:text-zinc-100 text-left bg-transparent border-none cursor-pointer py-3 border-b border-zinc-100 dark:border-zinc-800'
                style={{ borderBottom: '1px solid' }}
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.href}
                href={isHome ? link.href : `/${link.href}`}
                onClick={e => handleAnchorClick(e, link.href)}
                className='text-lg font-semibold text-zinc-900 dark:text-zinc-100 no-underline py-3 border-b border-zinc-100 dark:border-zinc-800'
              >
                {link.label}
              </a>
            ),
          )}
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
