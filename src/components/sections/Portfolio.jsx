import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  TrendingUp,
  X,
  CheckCircle,
  Info,
  Globe,
} from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import { portfolioProjects } from '@/data/portfolio';

const AUTOPLAY_DELAY = 6000;

export default function Portfolio() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [detailProject, setDetailProject] = useState(null);
  const dragStart = useRef(0);
  const progressRef = useRef(0);
  const lastTimeRef = useRef(null);
  const animFrameRef = useRef(null);

  const total = portfolioProjects.length;

  const goTo = useCallback(
    idx => {
      setCurrent(((idx % total) + total) % total);
      setProgress(0);
      progressRef.current = 0;
      lastTimeRef.current = null;
    },
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Pause autoplay when modal is open
  const effectivePlaying = isPlaying && !detailProject;

  // Autoplay
  useEffect(() => {
    if (!effectivePlaying) {
      lastTimeRef.current = null;
      return;
    }
    const tick = timestamp => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const pct = Math.min(
        (timestamp - lastTimeRef.current) / AUTOPLAY_DELAY,
        1,
      );
      progressRef.current = pct;
      setProgress(pct);
      if (pct >= 1) {
        setCurrent(prev => (prev + 1) % total);
        progressRef.current = 0;
        setProgress(0);
        lastTimeRef.current = timestamp;
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [effectivePlaying, current, total]);

  // Drag
  const handleDragStart = e => {
    setIsDragging(true);
    setIsPlaying(false);
    dragStart.current = e.type.includes('touch')
      ? e.touches[0].clientX
      : e.clientX;
    setDragOffset(0);
  };
  const handleDragMove = e => {
    if (!isDragging) return;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStart.current);
  };
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -80) next();
    else if (dragOffset > 80) prev();
    setDragOffset(0);
    setIsPlaying(true);
  };

  // Keyboard
  useEffect(() => {
    const h = e => {
      if (detailProject) {
        if (e.key === 'Escape') setDetailProject(null);
        return;
      }
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [prev, next, detailProject]);

  return (
    <section
      id='portfolio'
      className='py-24 px-6 bg-[#F8F7F4] dark:bg-[#0C0C0F]'
    >
      <div className='max-w-300 mx-auto'>
        <SectionHeader
          label='Portfólio'
          title='Projetos <em>reais</em>, resultados reais.'
          description='Cada projeto é construído do zero com código próprio. Sem templates, sem limitações — e com resultados mensuráveis.'
        />

        <FadeIn>
          <div className='max-w-280 mx-auto'>
            {/* Carousel viewport */}
            <div
              className='overflow-hidden cursor-grab active:cursor-grabbing'
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              <div
                className='flex'
                style={{
                  transform: `translateX(calc(-${current * 75}% + ${dragOffset}px))`,
                  transition: isDragging
                    ? 'none'
                    : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                {portfolioProjects.map((p, i) => (
                  <div
                    key={p.name}
                    className='shrink-0 px-3'
                    style={{ width: '75%' }}
                  >
                    <div
                      className={`
                        bg-white dark:bg-zinc-900 rounded-[20px] border overflow-hidden
                        transition-all duration-500 select-none
                        ${
                          i === current
                            ? 'border-zinc-200 dark:border-zinc-700 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)] scale-100 opacity-100'
                            : 'border-zinc-200 dark:border-zinc-800 scale-[0.97] opacity-50'
                        }
                      `}
                    >
                      {/* Browser chrome */}
                      <div className='px-4 py-2 bg-zinc-50 dark:bg-zinc-800 flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-700'>
                        <div className='flex gap-1.5'>
                          {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => (
                            <div
                              key={c}
                              className='w-2 h-2 rounded-full'
                              style={{ background: c }}
                            />
                          ))}
                        </div>
                        <div className='flex-1 bg-white dark:bg-zinc-900 rounded-md px-3 py-1 text-[11px] text-zinc-400 dark:text-zinc-500 text-center border border-zinc-100 dark:border-zinc-700 font-medium'>
                          {p.url.replace('https://www.', '')}
                        </div>
                      </div>

                      {/* Screenshot */}
                      <div className='aspect-video bg-zinc-100 dark:bg-zinc-800 overflow-hidden'>
                        <img
                          src={p.screenshot}
                          alt={`Screenshot de ${p.name}`}
                          className='w-full h-full object-cover object-top select-none'
                          draggable={false}
                          loading={i === 0 ? 'eager' : 'lazy'}
                        />
                      </div>

                      {/* Footer with info + buttons */}
                      <div className='px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
                        {/* Left — project info */}
                        <div className='flex items-center gap-3'>
                          <div
                            className='w-9 h-9 rounded-lg flex items-center justify-center shrink-0'
                            style={{ background: `${p.color}15` }}
                          >
                            <p.icon size={18} style={{ color: p.color }} />
                          </div>
                          <div>
                            <h3 className='text-[15px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight'>
                              {p.name}
                            </h3>
                            <span
                              className='text-[11px] font-semibold uppercase tracking-wider'
                              style={{ color: p.color }}
                            >
                              {p.type}
                            </span>
                          </div>
                        </div>

                        {/* Right — buttons */}
                        <div className='flex gap-2 shrink-0'>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              setDetailProject(p);
                            }}
                            onMouseDown={e => e.stopPropagation()}
                            className='inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-green-600 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all cursor-pointer'
                          >
                            <Info size={13} /> Detalhes
                          </button>
                          <a
                            href={p.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            onClick={e => e.stopPropagation()}
                            onMouseDown={e => e.stopPropagation()}
                            className='inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold text-white bg-green-600 hover:bg-green-500 transition-colors no-underline border-none'
                          >
                            <Globe size={13} /> Visitar Site
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className='flex items-center justify-center gap-5 mt-8'>
              <button
                onClick={() => {
                  prev();
                  setIsPlaying(true);
                }}
                className='w-10 h-10 rounded-full border-2 border-zinc-200 dark:border-zinc-700 bg-transparent flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-400 hover:border-green-600 dark:hover:border-green-500 transition-all cursor-pointer'
                aria-label='Projeto anterior'
              >
                <ChevronLeft size={18} />
              </button>

              <div className='flex items-center gap-2.5'>
                {portfolioProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      goTo(i);
                      setIsPlaying(true);
                    }}
                    className={`rounded-full transition-all duration-300 cursor-pointer border-none ${
                      i === current
                        ? 'w-3 h-3 bg-green-600 dark:bg-green-400'
                        : 'w-2.5 h-2.5 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500'
                    }`}
                    aria-label={`Ir para projeto ${i + 1}`}
                  />
                ))}
              </div>

              <div className='w-28 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden'>
                <div
                  className='h-full bg-green-600 dark:bg-green-400 rounded-full transition-none'
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              <button
                onClick={() => {
                  setIsPlaying(p => !p);
                  if (!isPlaying) lastTimeRef.current = null;
                }}
                className='w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-600 dark:hover:border-green-500 transition-all cursor-pointer'
                aria-label={isPlaying ? 'Pausar' : 'Iniciar'}
              >
                {isPlaying ? (
                  <Pause size={14} fill='currentColor' />
                ) : (
                  <Play size={14} fill='currentColor' />
                )}
              </button>

              <button
                onClick={() => {
                  next();
                  setIsPlaying(true);
                }}
                className='w-10 h-10 rounded-full border-2 border-zinc-200 dark:border-zinc-700 bg-transparent flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-400 hover:border-green-600 dark:hover:border-green-500 transition-all cursor-pointer'
                aria-label='Próximo projeto'
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Details Modal */}
      {detailProject && (
        <ProjectModal
          project={detailProject}
          onClose={() => setDetailProject(null)}
        />
      )}
    </section>
  );
}

/* ─── Project Details Modal ─── */
function ProjectModal({ project, onClose }) {
  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className='fixed inset-0 z-10000 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-[0_24px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)] w-full max-w-160 max-h-[90vh] overflow-y-auto animate-[fadeScale_0.3s_ease-out]'>
        {/* Header with screenshot */}
        <div className='relative'>
          <div className='aspect-[2.2/1] bg-zinc-100 dark:bg-zinc-800 overflow-hidden rounded-t-2xl'>
            <img
              src={project.screenshot}
              alt={project.name}
              className='w-full h-full object-cover object-top'
            />
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className='absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all cursor-pointer border-none'
            aria-label='Fechar'
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 md:p-8'>
          {/* Title */}
          <div className='flex items-center gap-3 mb-5'>
            <div
              className='w-12 h-12 rounded-xl flex items-center justify-center shrink-0'
              style={{ background: `${project.color}15` }}
            >
              <project.icon size={24} style={{ color: project.color }} />
            </div>
            <div>
              <h2 className='text-[22px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight'>
                {project.name}
              </h2>
              <span
                className='text-[13px] font-semibold uppercase tracking-wider'
                style={{ color: project.color }}
              >
                {project.type}
              </span>
            </div>
          </div>
          {/* Description */}
          <p className='text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6'>
            {project.desc}
          </p>

          {/* Result */}
          {project.result && (
            <div className='flex items-start gap-2.5 mb-6 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/15 border border-green-200 dark:border-green-700/40'>
              <TrendingUp
                size={16}
                className='text-green-600 dark:text-green-400 mt-0.5 shrink-0'
              />
              <span className='text-[14px] text-green-800 dark:text-green-300 font-semibold'>
                {project.result}
              </span>
            </div>
          )}

          {/* Highlights */}
          <div className='flex gap-3 mb-6'>
            {project.highlights.map(h => (
              <div
                key={h.label}
                className='flex-1 text-center py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-700/50'
              >
                <div className='text-[22px] font-extrabold text-green-600 dark:text-green-400'>
                  {h.value}
                </div>
                <div className='text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 font-medium'>
                  {h.label}
                </div>
              </div>
            ))}
          </div>

          {/* Features list */}
          {project.features && (
            <div className='mb-6'>
              <h3 className='text-[14px] font-bold text-zinc-900 dark:text-zinc-100 mb-3'>
                Funcionalidades
              </h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {project.features.map(f => (
                  <div key={f} className='flex items-start gap-2'>
                    <CheckCircle
                      size={14}
                      className='text-green-600 dark:text-green-400 mt-0.5 shrink-0'
                    />
                    <span className='text-[13px] text-zinc-600 dark:text-zinc-400'>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className='mb-6'>
            <h3 className='text-[14px] font-bold text-zinc-900 dark:text-zinc-100 mb-3'>
              Tecnologias
            </h3>
            <div className='flex flex-wrap gap-2'>
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className='px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[12px] font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA button */}
          <a
            href={project.url}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-semibold text-white bg-green-600 hover:bg-green-500 transition-colors no-underline border-none cursor-pointer'
          >
            <Globe size={16} /> Visitar {project.name}
          </a>
        </div>
      </div>
    </div>
  );
}
