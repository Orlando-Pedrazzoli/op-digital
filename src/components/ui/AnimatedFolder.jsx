import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  forwardRef,
} from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─── Main AnimatedFolder ─── */
export function AnimatedFolder({ title, description, projects, className }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [sourceRect, setSourceRect] = useState(null);
  const [hiddenCardId, setHiddenCardId] = useState(null);
  const cardRefs = useRef([]);

  const handleProjectClick = (project, index) => {
    const cardEl = cardRefs.current[index];
    if (cardEl) {
      setSourceRect(cardEl.getBoundingClientRect());
    }
    setSelectedIndex(index);
    setHiddenCardId(project.id);
  };

  const handleCloseLightbox = () => {
    setSelectedIndex(null);
    setSourceRect(null);
  };

  const handleCloseComplete = () => {
    setHiddenCardId(null);
  };

  const handleNavigate = newIndex => {
    setSelectedIndex(newIndex);
    setHiddenCardId(projects[newIndex]?.id || null);
  };

  /* Touch: tap once to reveal cards, tap card to open lightbox */
  const handleTouchStart = () => {
    if (!isHovered) {
      setIsHovered(true);
    }
  };

  return (
    <>
      <div
        className={cn(
          'relative flex flex-col items-center justify-center',
          'p-6 sm:p-8 rounded-2xl cursor-pointer',
          'bg-[#1a2042] border border-white/[0.08]',
          'transition-all duration-500 ease-out',
          'hover:shadow-2xl hover:shadow-green-500/10',
          'hover:border-green-600/30',
          'group',
          className,
        )}
        style={{
          minWidth: '240px',
          minHeight: '280px',
          perspective: '1000px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
      >
        {/* Background glow */}
        <div
          className='absolute inset-0 rounded-2xl transition-opacity duration-500'
          style={{
            background:
              'radial-gradient(circle at 50% 70%, rgba(34,197,94,0.15) 0%, transparent 70%)',
            opacity: isHovered ? 0.12 : 0,
          }}
        />

        <div
          className='relative flex items-center justify-center mb-4'
          style={{ height: '160px', width: '200px' }}
        >
          {/* Folder back */}
          <div
            className='absolute w-32 h-24 bg-folder-back rounded-lg shadow-md'
            style={{
              transformOrigin: 'bottom center',
              transform: isHovered ? 'rotateX(-15deg)' : 'rotateX(0deg)',
              transition: 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 10,
            }}
          />

          {/* Folder tab */}
          <div
            className='absolute w-12 h-4 bg-folder-tab rounded-t-md'
            style={{
              top: 'calc(50% - 48px - 12px)',
              left: 'calc(50% - 64px + 16px)',
              transformOrigin: 'bottom center',
              transform: isHovered
                ? 'rotateX(-25deg) translateY(-2px)'
                : 'rotateX(0deg)',
              transition: 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 10,
            }}
          />

          {/* Project cards */}
          <div
            className='absolute'
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
            }}
          >
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.id}
                ref={el => {
                  cardRefs.current[index] = el;
                }}
                image={project.image}
                title={project.title}
                delay={index * 80}
                isVisible={isHovered}
                index={index}
                onClick={() => handleProjectClick(project, index)}
                isSelected={hiddenCardId === project.id}
              />
            ))}
          </div>

          {/* Folder front */}
          <div
            className='absolute w-32 h-24 bg-folder-front rounded-lg shadow-lg'
            style={{
              top: 'calc(50% - 48px + 4px)',
              transformOrigin: 'bottom center',
              transform: isHovered
                ? 'rotateX(25deg) translateY(8px)'
                : 'rotateX(0deg)',
              transition: 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 30,
            }}
          />

          {/* Folder shine */}
          <div
            className='absolute w-32 h-24 rounded-lg overflow-hidden pointer-events-none'
            style={{
              top: 'calc(50% - 48px + 4px)',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
              transformOrigin: 'bottom center',
              transform: isHovered
                ? 'rotateX(25deg) translateY(8px)'
                : 'rotateX(0deg)',
              transition: 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 31,
            }}
          />
        </div>

        {/* Title */}
        <h3
          className='text-lg font-semibold text-zinc-100 mt-4 transition-all duration-300'
          style={{ transform: isHovered ? 'translateY(4px)' : 'translateY(0)' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className='text-sm text-zinc-500 transition-all duration-300'
          style={{ opacity: isHovered ? 0.7 : 1 }}
        >
          {description || `${projects.length} projetos`}
        </p>

        {/* Hover/touch hint — responsive text */}
        <div
          className='absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-zinc-600 transition-all duration-300'
          style={{
            opacity: isHovered ? 0 : 0.6,
            transform: isHovered ? 'translateY(10px)' : 'translateY(0)',
          }}
        >
          <span className='hidden sm:inline'>Hover para explorar</span>
          <span className='sm:hidden'>Toque para explorar</span>
        </div>
      </div>

      <ImageLightbox
        projects={projects.slice(0, 3)}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={handleCloseLightbox}
        sourceRect={sourceRect}
        onCloseComplete={handleCloseComplete}
        onNavigate={handleNavigate}
      />
    </>
  );
}

/* ─── ProjectCard ─── */
const ProjectCard = forwardRef(
  ({ image, title, delay, isVisible, index, onClick, isSelected }, ref) => {
    const rotations = [-12, 0, 12];
    const translations = [-55, 0, 55];

    return (
      <div
        ref={ref}
        className={cn(
          'absolute w-20 h-28 rounded-lg overflow-hidden shadow-xl',
          'bg-[#212952] border border-white/[0.08]',
          'cursor-pointer hover:ring-2 hover:ring-green-500/50',
          isSelected && 'opacity-0',
        )}
        style={{
          transform: isVisible
            ? `translateY(-90px) translateX(${translations[index]}px) rotate(${rotations[index]}deg) scale(1)`
            : 'translateY(0px) translateX(0px) rotate(0deg) scale(0.5)',
          opacity: isSelected ? 0 : isVisible ? 1 : 0,
          transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
          zIndex: 10 - index,
          left: '-40px',
          top: '-56px',
        }}
        onClick={e => {
          e.stopPropagation();
          onClick();
        }}
      >
        <img src={image} alt={title} className='w-full h-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
        <p className='absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-medium text-white truncate'>
          {title}
        </p>
      </div>
    );
  },
);
ProjectCard.displayName = 'ProjectCard';

/* ─── ImageLightbox ─── */
function ImageLightbox({
  projects,
  currentIndex,
  isOpen,
  onClose,
  sourceRect,
  onCloseComplete,
  onNavigate,
}) {
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [internalIndex, setInternalIndex] = useState(currentIndex);
  const [prevIndex, setPrevIndex] = useState(currentIndex);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');
  const containerRef = useRef(null);
  const touchStartRef = useRef(null);

  const totalProjects = projects.length;
  const hasNext = internalIndex < totalProjects - 1;
  const hasPrev = internalIndex > 0;
  const currentProject = projects[internalIndex];

  useEffect(() => {
    if (isOpen && currentIndex !== internalIndex && !isSliding) {
      const direction = currentIndex > internalIndex ? 'left' : 'right';
      setSlideDirection(direction);
      setPrevIndex(internalIndex);
      setIsSliding(true);
      const timer = setTimeout(() => {
        setInternalIndex(currentIndex);
        setIsSliding(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setInternalIndex(currentIndex);
      setPrevIndex(currentIndex);
      setIsSliding(false);
    }
  }, [isOpen]);

  const navigateNext = useCallback(() => {
    if (internalIndex >= totalProjects - 1 || isSliding) return;
    onNavigate(internalIndex + 1);
  }, [internalIndex, totalProjects, isSliding, onNavigate]);

  const navigatePrev = useCallback(() => {
    if (internalIndex <= 0 || isSliding) return;
    onNavigate(internalIndex - 1);
  }, [internalIndex, isSliding, onNavigate]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    onClose();
    setTimeout(() => {
      setIsClosing(false);
      setShouldRender(false);
      setAnimationPhase('initial');
      onCloseComplete?.();
    }, 400);
  }, [onClose, onCloseComplete]);

  /* Touch swipe support for lightbox */
  const handleTouchStart = e => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = e => {
    if (touchStartRef.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartRef.current;
    if (delta > 60) navigatePrev();
    else if (delta < -60) navigateNext();
    touchStartRef.current = null;
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (!isOpen) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') navigateNext();
      if (e.key === 'ArrowLeft') navigatePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose, navigateNext, navigatePrev]);

  useLayoutEffect(() => {
    if (isOpen && sourceRect) {
      setShouldRender(true);
      setAnimationPhase('initial');
      setIsClosing(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationPhase('animating');
        });
      });
      const timer = setTimeout(() => {
        setAnimationPhase('complete');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, sourceRect]);

  const handleDotClick = idx => {
    if (isSliding || idx === internalIndex) return;
    onNavigate(idx);
  };

  if (!shouldRender || !currentProject) return null;

  const getInitialStyles = () => {
    if (!sourceRect) return {};
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const tw = Math.min(768, vw - 64);
    const th = Math.min(vh * 0.85, 600);
    const tx = (vw - tw) / 2;
    const ty = (vh - th) / 2;
    const sx = sourceRect.width / tw;
    const sy = sourceRect.height / th;
    const scale = Math.max(sx, sy);
    const translateX = sourceRect.left + sourceRect.width / 2 - (tx + tw / 2);
    const translateY = sourceRect.top + sourceRect.height / 2 - (ty + th / 2);
    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      opacity: 1,
    };
  };

  const getFinalStyles = () => ({
    transform: 'translate(0, 0) scale(1)',
    opacity: 1,
  });

  const currentStyles =
    animationPhase === 'initial' && !isClosing
      ? getInitialStyles()
      : getFinalStyles();

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8',
      )}
      onClick={handleClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        opacity: isClosing ? 0 : 1,
        transition: 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className='absolute inset-0 bg-zinc-950/80 backdrop-blur-xl'
        style={{
          opacity: animationPhase === 'initial' && !isClosing ? 0 : 1,
          transition: 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Close */}
      <button
        onClick={e => {
          e.stopPropagation();
          handleClose();
        }}
        className='absolute top-5 right-5 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800/50 backdrop-blur-md border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all duration-300 cursor-pointer'
        style={{
          opacity: animationPhase === 'complete' && !isClosing ? 1 : 0,
          transform:
            animationPhase === 'complete' && !isClosing
              ? 'translateY(0)'
              : 'translateY(-10px)',
          transition: 'opacity 300ms ease-out, transform 300ms ease-out',
        }}
      >
        <X className='w-4 h-4' strokeWidth={2.5} />
      </button>

      {/* Prev */}
      <button
        onClick={e => {
          e.stopPropagation();
          navigatePrev();
        }}
        disabled={!hasPrev || isSliding}
        className='absolute left-4 md:left-8 z-50 w-12 h-12 hidden sm:flex items-center justify-center rounded-full bg-zinc-800/50 backdrop-blur-md border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all duration-300 cursor-pointer disabled:opacity-0 disabled:pointer-events-none'
        style={{
          opacity:
            animationPhase === 'complete' && !isClosing && hasPrev ? 1 : 0,
          transform:
            animationPhase === 'complete' && !isClosing
              ? 'translateX(0)'
              : 'translateX(-20px)',
          transition:
            'opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms',
        }}
      >
        <ChevronLeft className='w-5 h-5' strokeWidth={2.5} />
      </button>

      {/* Next */}
      <button
        onClick={e => {
          e.stopPropagation();
          navigateNext();
        }}
        disabled={!hasNext || isSliding}
        className='absolute right-4 md:right-8 z-50 w-12 h-12 hidden sm:flex items-center justify-center rounded-full bg-zinc-800/50 backdrop-blur-md border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all duration-300 cursor-pointer disabled:opacity-0 disabled:pointer-events-none'
        style={{
          opacity:
            animationPhase === 'complete' && !isClosing && hasNext ? 1 : 0,
          transform:
            animationPhase === 'complete' && !isClosing
              ? 'translateX(0)'
              : 'translateX(20px)',
          transition:
            'opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms',
        }}
      >
        <ChevronRight className='w-5 h-5' strokeWidth={2.5} />
      </button>

      {/* Content */}
      <div
        ref={containerRef}
        className='relative z-10 w-full max-w-3xl'
        onClick={e => e.stopPropagation()}
        style={{
          ...currentStyles,
          transform: isClosing
            ? 'translate(0, 0) scale(0.95)'
            : currentStyles.transform,
          transition:
            animationPhase === 'initial' && !isClosing
              ? 'none'
              : 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out',
          transformOrigin: 'center center',
        }}
      >
        <div
          className='relative overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-zinc-800 shadow-2xl'
          style={{
            borderRadius:
              animationPhase === 'initial' && !isClosing ? '8px' : '16px',
            transition: 'border-radius 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className='relative overflow-hidden'>
            <div
              className='flex'
              style={{
                transform: `translateX(-${internalIndex * 100}%)`,
                transition: isSliding
                  ? 'transform 400ms cubic-bezier(0.32, 0.72, 0, 1)'
                  : 'none',
              }}
            >
              {projects.map(project => (
                <img
                  key={project.id}
                  src={project.image}
                  alt={project.title}
                  className='w-full h-auto max-h-[70vh] object-contain bg-zinc-950 flex-shrink-0'
                  style={{ minWidth: '100%' }}
                />
              ))}
            </div>
            <div className='absolute inset-0 pointer-events-none bg-gradient-to-t from-zinc-900/20 via-transparent to-zinc-900/10' />
          </div>

          <div
            className='px-4 sm:px-6 py-4 sm:py-5 bg-zinc-900 border-t border-zinc-800'
            style={{
              opacity: animationPhase === 'complete' && !isClosing ? 1 : 0,
              transform:
                animationPhase === 'complete' && !isClosing
                  ? 'translateY(0)'
                  : 'translateY(20px)',
              transition:
                'opacity 300ms ease-out 100ms, transform 300ms ease-out 100ms',
            }}
          >
            <div className='flex items-start justify-between gap-4'>
              <div className='flex-1 min-w-0'>
                <h3 className='text-base sm:text-lg font-medium text-zinc-100 tracking-tight truncate h-7'>
                  {currentProject?.title}
                </h3>
                <div className='flex items-center gap-3 mt-1'>
                  {/* Keyboard hints — hidden on mobile (touch swipe instead) */}
                  <p className='text-sm text-zinc-500 hidden sm:block'>
                    <kbd className='px-1.5 py-0.5 mx-0.5 text-xs font-medium bg-zinc-800 text-zinc-400 rounded border border-zinc-700'>
                      ←
                    </kbd>
                    <kbd className='px-1.5 py-0.5 mx-0.5 text-xs font-medium bg-zinc-800 text-zinc-400 rounded border border-zinc-700'>
                      →
                    </kbd>{' '}
                    para navegar
                  </p>
                  <p className='text-xs text-zinc-500 sm:hidden'>
                    Deslize para navegar
                  </p>
                  <div className='flex items-center gap-1.5'>
                    {projects.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className={cn(
                          'w-2 h-2 rounded-full transition-all duration-300 border-none cursor-pointer',
                          idx === internalIndex
                            ? 'bg-green-400 scale-110'
                            : 'bg-zinc-600 hover:bg-zinc-500',
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
