import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';
import { testimonials } from '@/data/testimonials';

/* ─── Hook para dimensões responsivas do carrossel 3D ─── */
function useResponsiveCarousel() {
  const [dims, setDims] = useState({
    cardWidth: 300,
    cardHeight: 280,
    zDepth: 320,
    containerWidth: 600,
    perspective: 1200,
  });

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      if (vw < 480) {
        const cw = Math.min(260, vw - 60);
        setDims({
          cardWidth: cw,
          cardHeight: 260,
          zDepth: 180,
          containerWidth: cw * 1.5,
          perspective: 700,
        });
      } else if (vw < 768) {
        setDims({
          cardWidth: 270,
          cardHeight: 270,
          zDepth: 240,
          containerWidth: 540,
          perspective: 900,
        });
      } else {
        setDims({
          cardWidth: 300,
          cardHeight: 280,
          zDepth: 320,
          containerWidth: 600,
          perspective: 1200,
        });
      }
    };

    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return dims;
}

export default function Testimonials() {
  const [rotation, setRotation] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const touchStartRef = useRef(null);

  const { cardWidth, cardHeight, zDepth, containerWidth, perspective } =
    useResponsiveCarousel();

  const borderRadius = 16;
  const pauseOnHover = true;

  const numItems = testimonials.length;
  const angleSlice = 360 / numItems;

  useEffect(() => {
    if (isHovering && pauseOnHover) return;

    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.3) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [isHovering, pauseOnHover]);

  const handleCardClick = index => {
    const targetRotation = -index * angleSlice;
    setRotation(targetRotation % 360);
  };

  /* Touch / swipe support */
  const handleTouchStart = e => {
    touchStartRef.current = e.touches[0].clientX;
    setIsHovering(true);
  };

  const handleTouchEnd = e => {
    if (touchStartRef.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartRef.current;
    if (Math.abs(delta) > 40) {
      // Swipe: rotate by one card
      const direction = delta > 0 ? -1 : 1;
      setRotation(prev => (prev + direction * angleSlice) % 360);
    }
    touchStartRef.current = null;
    // Resume auto-rotation after short delay
    setTimeout(() => setIsHovering(false), 2000);
  };

  return (
    <section id='depoimentos' className='py-24 px-6 bg-zinc-950'>
      <div className='max-w-300 mx-auto'>
        <SectionHeader
          label='Depoimentos'
          title='Quem já trabalhou comigo, <em>recomenda.</em>'
          description='Resultados reais de clientes reais. Cada projeto entregue é uma parceria de confiança.'
        />

        <FadeIn>
          <div
            className='relative w-full flex items-center justify-center overflow-hidden'
            style={{ height: cardHeight + 120 }}
          >
            <div
              ref={containerRef}
              className='relative w-full h-full flex items-center justify-center'
              style={{ perspective: `${perspective}px` }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                className='relative'
                style={{
                  width: containerWidth,
                  height: cardHeight,
                  transformStyle: 'preserve-3d',
                }}
                animate={{ rotateY: rotation }}
                transition={{ type: 'tween', duration: 0.8, ease: 'easeOut' }}
              >
                {testimonials.map((t, index) => {
                  const angle = (index * angleSlice * Math.PI) / 180;
                  const x = Math.cos(angle) * zDepth;
                  const z = Math.sin(angle) * zDepth;

                  return (
                    <motion.div
                      key={index}
                      className='absolute cursor-pointer'
                      style={{
                        width: cardWidth,
                        height: cardHeight,
                        left: '50%',
                        top: '50%',
                        marginLeft: -cardWidth / 2,
                        marginTop: -cardHeight / 2,
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                      }}
                      animate={{
                        x,
                        z,
                        rotateY: -rotation,
                      }}
                      transition={{
                        type: 'tween',
                        duration: 0.5,
                        ease: 'easeOut',
                      }}
                      onClick={() => handleCardClick(index)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div
                        className='w-full h-full bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden p-5 sm:p-6 flex flex-col justify-between'
                        style={{ borderRadius: `${borderRadius}px` }}
                      >
                        {/* Stars */}
                        <div>
                          <div className='flex gap-1 mb-4'>
                            {Array.from({ length: t.rating }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className='text-amber-400 fill-amber-400'
                              />
                            ))}
                          </div>

                          {/* Quote */}
                          <p className='text-[13px] leading-relaxed text-zinc-300 line-clamp-5'>
                            &ldquo;{t.text}&rdquo;
                          </p>
                        </div>

                        {/* Author */}
                        <div className='mt-4 pt-4 border-t border-zinc-800'>
                          <p className='text-[14px] font-bold text-zinc-100'>
                            {t.name}
                          </p>
                          <p className='text-[12px] text-zinc-500'>
                            {t.role} · {t.company}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
