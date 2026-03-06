import { motion } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeader from '@/components/ui/SectionHeader';

/* ─── Cities ─── */
// Projection: x = (lng+180)*(119/360), y = (90-lat)*(60/180)
// Based on dotted-map viewBox="0 0 119 60"
const W = 119;
const H = 60;

function proj(lat, lng) {
  return {
    x: (lng + 180) * (W / 360),
    y: (90 - lat) * (H / 180),
  };
}

const CITIES = [
  {
    name: 'Lisboa',
    ...proj(38.72, -9.14),
    isBase: true,
    labelDx: -18,
    labelDy: -5,
  },
  {
    name: 'São Paulo',
    ...proj(-23.55, -46.63),
    isBase: false,
    labelDx: -22,
    labelDy: 3,
  },
  {
    name: 'Rio de Janeiro',
    ...proj(-22.91, -43.17),
    isBase: false,
    labelDx: 3,
    labelDy: -2.5,
  },
];

const CONNECTIONS = [
  { from: 0, to: 1, curvature: 0.45 },
  { from: 0, to: 2, curvature: 0.3 },
];

function createArc(start, end, curvature) {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2 - Math.abs(start.x - end.x) * curvature;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

/* ─── Component ─── */
export default function WorldMap() {
  return (
    <section className='py-24 px-6 bg-white dark:bg-zinc-950'>
      <div className='max-w-300 mx-auto'>
        <SectionHeader
          label='Alcance'
          title='De Lisboa para o <em>Brasil.</em>'
          description='Baseado em Portugal, atendo clientes no Brasil com a mesma proximidade e dedicação de quem está ao lado.'
        />

        <FadeIn>
          <div className='max-w-260 mx-auto rounded-3xl overflow-hidden relative bg-[#111118] border border-zinc-700/60'>
            {/* Atmospheric gradient */}
            <div
              className='absolute inset-0 pointer-events-none z-1'
              style={{
                background:
                  'radial-gradient(ellipse 55% 65% at 40% 40%, rgba(22,163,74,0.08) 0%, transparent 100%)',
              }}
            />

            {/* Edge vignette */}
            <div
              className='absolute inset-0 pointer-events-none z-2'
              style={{
                boxShadow: 'inset 0 0 60px 20px #111118',
              }}
            />

            {/* Map container */}
            <div className='relative p-4 md:p-8'>
              {/* Real world map SVG as background */}
              <img
                src='/world-map.svg'
                alt=''
                className='w-full h-auto block select-none pointer-events-none'
                draggable={false}
                style={{
                  maskImage:
                    'linear-gradient(to bottom, transparent 0%, white 8%, white 92%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, transparent 0%, white 8%, white 92%, transparent 100%)',
                }}
              />

              {/* Animated overlay — arcs & markers */}
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className='absolute inset-0 w-full h-full pointer-events-none z-5'
                style={{ padding: 'inherit' }}
                preserveAspectRatio='xMidYMid meet'
              >
                <defs>
                  <linearGradient
                    id='arc-grad'
                    x1='100%'
                    y1='0%'
                    x2='0%'
                    y2='100%'
                  >
                    <stop offset='0%' stopColor='#22c55e' />
                    <stop offset='100%' stopColor='#16a34a' stopOpacity='0.7' />
                  </linearGradient>
                  <filter
                    id='dot-glow'
                    x='-100%'
                    y='-100%'
                    width='300%'
                    height='300%'
                  >
                    <feGaussianBlur stdDeviation='0.4' result='blur' />
                    <feMerge>
                      <feMergeNode in='blur' />
                      <feMergeNode in='SourceGraphic' />
                    </feMerge>
                  </filter>
                </defs>

                {/* Arcs */}
                {CONNECTIONS.map((conn, ci) => {
                  const start = CITIES[conn.from];
                  const end = CITIES[conn.to];
                  const path = createArc(start, end, conn.curvature);

                  return (
                    <g key={`arc-${ci}`}>
                      {/* Outer glow */}
                      <motion.path
                        d={path}
                        fill='none'
                        stroke='rgba(22,163,74,0.15)'
                        strokeWidth='1.2'
                        strokeLinecap='round'
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{
                          duration: 2,
                          delay: 0.5 + ci * 0.4,
                          ease: 'easeInOut',
                        }}
                      />
                      {/* Inner glow */}
                      <motion.path
                        d={path}
                        fill='none'
                        stroke='rgba(34,197,94,0.35)'
                        strokeWidth='0.6'
                        strokeLinecap='round'
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{
                          duration: 2,
                          delay: 0.5 + ci * 0.4,
                          ease: 'easeInOut',
                        }}
                      />
                      {/* Main line */}
                      <motion.path
                        d={path}
                        fill='none'
                        stroke='url(#arc-grad)'
                        strokeWidth='0.3'
                        strokeLinecap='round'
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{
                          duration: 2,
                          delay: 0.5 + ci * 0.4,
                          ease: 'easeInOut',
                        }}
                      />
                    </g>
                  );
                })}

                {/* City markers */}
                {CITIES.map((city, i) => (
                  <g key={city.name}>
                    {/* Pulse */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r='0.5'
                      fill='none'
                      stroke='#22c55e'
                      strokeWidth='0.15'
                      opacity='0'
                    >
                      <animate
                        attributeName='r'
                        from='0.5'
                        to='2.5'
                        dur='2.5s'
                        repeatCount='indefinite'
                      />
                      <animate
                        attributeName='opacity'
                        from='0.5'
                        to='0'
                        dur='2.5s'
                        repeatCount='indefinite'
                      />
                    </circle>
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r='0.5'
                      fill='none'
                      stroke='#22c55e'
                      strokeWidth='0.1'
                      opacity='0'
                    >
                      <animate
                        attributeName='r'
                        from='0.5'
                        to='2'
                        dur='2.5s'
                        begin='1.2s'
                        repeatCount='indefinite'
                      />
                      <animate
                        attributeName='opacity'
                        from='0.3'
                        to='0'
                        dur='2.5s'
                        begin='1.2s'
                        repeatCount='indefinite'
                      />
                    </circle>
                    {/* Dot */}
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r={city.isBase ? 0.9 : 0.75}
                      fill='#22c55e'
                      filter='url(#dot-glow)'
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ delay: 0.8 + i * 0.3 }}
                    />
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r={city.isBase ? 0.35 : 0.3}
                      fill='white'
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ delay: 1 + i * 0.3 }}
                    />

                    {/* Label */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ delay: 1.4 + i * 0.25 }}
                    >
                      <rect
                        x={city.x + city.labelDx}
                        y={city.y + city.labelDy}
                        width={city.name.length * 1.25 + (city.isBase ? 3 : 2)}
                        height='3.2'
                        rx='0.8'
                        fill={
                          city.isBase
                            ? 'rgba(22,163,74,0.35)'
                            : 'rgba(255,255,255,0.10)'
                        }
                        stroke={
                          city.isBase
                            ? 'rgba(34,197,94,0.5)'
                            : 'rgba(255,255,255,0.15)'
                        }
                        strokeWidth='0.1'
                      />
                      {city.isBase && (
                        <circle
                          cx={city.x + city.labelDx + 1.2}
                          cy={city.y + city.labelDy + 1.6}
                          r='0.35'
                          fill='#4ade80'
                        />
                      )}
                      <text
                        x={city.x + city.labelDx + (city.isBase ? 2.2 : 1)}
                        y={city.y + city.labelDy + 2.15}
                        fill='white'
                        fontSize='1.8'
                        fontFamily="'Plus Jakarta Sans', sans-serif"
                        fontWeight='600'
                      >
                        {city.name}
                      </text>
                    </motion.g>
                  </g>
                ))}
              </svg>
            </div>

            {/* Bottom info bar */}
            <div className='px-8 pb-6 flex flex-wrap items-center justify-center gap-6 text-[13px] text-zinc-300 relative z-20'>
              <div className='flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-green-500' />
                <span>
                  Lisboa, Portugal <span className='text-zinc-500'>— Base</span>
                </span>
              </div>
              <div className='w-px h-4 bg-zinc-700' />
              <span>
                São Paulo · Rio de Janeiro{' '}
                <span className='text-zinc-500'>— Clientes</span>
              </span>
              <div className='w-px h-4 bg-zinc-700' />
              <span className='text-green-400 font-medium'>
                Atendimento 100% remoto
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
