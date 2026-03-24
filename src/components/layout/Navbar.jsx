import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/utils/config';
import { getWhatsAppUrl } from '@/utils/whatsapp';
import Button from '@/components/ui/Button';

/* --- link config --- */
const navLinks = [
  { label: 'Portfolio', href: '/portfolio', type: 'page' },
  { label: 'Servicos', href: '/servicos', type: 'page' },
  { label: 'Sobre', href: '/sobre', type: 'page' },
  { label: 'Planos', href: '/planos', type: 'page' },
  { label: 'FAQ', href: '/faq', type: 'page' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  /* --- scroll detection --- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* --- lock body when mobile menu is open --- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* --- close mobile menu on route change --- */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* --- close on Escape key --- */
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handlePageClick = useCallback(
    href => {
      setMobileOpen(false);
      navigate(href);
    },
    [navigate],
  );

  const handleLogoClick = e => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isActive = link => {
    return location.pathname === link.href;
  };

  return (
    <>
      {/* ======== NAVBAR ======== */}
      <nav
        role='navigation'
        aria-label='Navegacao principal'
        className={`
          fixed top-0 inset-x-0 z-50 transition-all duration-300
          ${
            scrolled
              ? 'bg-[#171d3a]/95 backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/20'
              : 'bg-transparent'
          }
        `}
      >
        <div className='max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between'>
          {/* -- Logo -- */}
          <Link
            to='/'
            onClick={handleLogoClick}
            className='flex items-center gap-3 no-underline group'
          >
            <div className='w-9 h-9 flex-shrink-0 overflow-hidden rounded-lg transition-transform duration-200 group-hover:scale-105'>
              <img
                src='/logo-pedrazzoli.png'
                alt={`${siteConfig.name} Logo`}
                className='w-full h-full object-contain'
                width={36}
                height={36}
              />
            </div>
            <span className='font-serif text-[22px] font-normal text-white tracking-normal'>
              {siteConfig.name}
            </span>
          </Link>

          {/* -- Desktop Links -- */}
          <div className='hidden lg:flex items-center gap-1'>
            {navLinks.map(link => {
              const active = isActive(link);
              const baseClass = `
                relative px-3.5 py-2 text-[14px] font-medium rounded-lg
                transition-colors duration-200 no-underline
              `;

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`${baseClass} ${
                    active
                      ? 'text-green-400 bg-green-400/10'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* -- Desktop CTA -- */}
          <div className='hidden lg:flex items-center'>
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

          {/* -- Mobile Hamburger -- */}
          <button
            onClick={() => setMobileOpen(true)}
            className='lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white cursor-pointer transition-colors hover:bg-white/[0.1]'
            aria-label='Abrir menu'
            aria-expanded={mobileOpen}
            aria-controls='mobile-menu'
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* ======== MOBILE MENU ======== */}

      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm
          transition-opacity duration-300 lg:hidden
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setMobileOpen(false)}
        aria-hidden='true'
      />

      {/* Panel */}
      <div
        id='mobile-menu'
        role='dialog'
        aria-modal='true'
        aria-label='Menu de navegacao'
        className={`
          fixed top-0 right-0 z-[999] h-full w-full max-w-[340px]
          bg-[#171d3a]/98 backdrop-blur-2xl
          border-l border-white/[0.06]
          transition-transform duration-300 ease-out lg:hidden
          flex flex-col
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Panel header */}
        <div className='flex items-center justify-between px-6 h-[72px] border-b border-white/[0.06]'>
          <span className='font-serif text-lg font-normal text-white tracking-tight'>
            Menu
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className='flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white cursor-pointer transition-colors hover:bg-white/[0.1]'
            aria-label='Fechar menu'
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Panel links */}
        <nav
          className='flex-1 overflow-y-auto px-4 py-4'
          aria-label='Menu mobile'
        >
          <ul className='list-none m-0 p-0 flex flex-col gap-1'>
            {navLinks.map((link, i) => {
              const active = isActive(link);
              const linkClass = `
                flex items-center justify-between
                px-4 py-3.5 rounded-xl text-[15px] font-medium
                no-underline transition-all duration-200
                ${
                  active
                    ? 'text-green-400 bg-green-400/10'
                    : 'text-zinc-300 hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08]'
                }
              `;

              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={linkClass}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {link.label}
                    <ArrowRight size={16} className='opacity-40' />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Panel footer — CTA */}
        <div className='px-4 pb-8 pt-2 border-t border-white/[0.06]'>
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
          <p className='text-center text-xs text-zinc-500 mt-3'>
            {siteConfig.email}
          </p>
        </div>
      </div>
    </>
  );
}
