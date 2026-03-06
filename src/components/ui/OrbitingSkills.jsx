import { useEffect, useState, memo } from 'react';
import { Code } from 'lucide-react';

/* ─── SVG Icon Components — accurate brand marks ─── */
const icons = {
  react: {
    component: () => (
      <svg viewBox='-11.5 -10.23 23 20.46' className='w-full h-full'>
        <circle r='2.05' fill='#61DAFB' />
        <g stroke='#61DAFB' strokeWidth='1' fill='none'>
          <ellipse rx='11' ry='4.2' />
          <ellipse rx='11' ry='4.2' transform='rotate(60)' />
          <ellipse rx='11' ry='4.2' transform='rotate(120)' />
        </g>
      </svg>
    ),
    color: '#61DAFB',
  },
  javascript: {
    component: () => (
      <svg viewBox='0 0 630 630' className='w-full h-full'>
        <rect width='630' height='630' rx='40' fill='#F7DF1E' />
        <path
          d='M423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 36l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z'
          fill='#323330'
        />
      </svg>
    ),
    color: '#F7DF1E',
  },
  nextjs: {
    component: () => (
      <svg viewBox='0 0 180 180' className='w-full h-full'>
        <circle cx='90' cy='90' r='90' fill='white' />
        <path
          d='M149.508 157.52L69.142 54H54v71.97h12.114V69.384l73.885 95.461A90.304 90.304 0 01149.508 157.52z'
          fill='black'
        />
        <path d='M115 54h12v72h-12z' fill='black' />
      </svg>
    ),
    color: '#ffffff',
  },
  node: {
    component: () => (
      <svg viewBox='0 0 100 100' className='w-full h-full'>
        {/* Hexagon */}
        <path
          d='M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z'
          fill='none'
          stroke='#339933'
          strokeWidth='6'
          strokeLinejoin='round'
        />
        {/* JS text */}
        <text
          x='50'
          y='62'
          textAnchor='middle'
          fill='#339933'
          fontFamily='Arial, sans-serif'
          fontWeight='bold'
          fontSize='36'
        >
          JS
        </text>
      </svg>
    ),
    color: '#339933',
  },
  mongodb: {
    component: () => (
      <svg viewBox='0 0 256 549' className='w-full h-full'>
        <path
          d='M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 00-1.492 0c-4.048 5.759-23.863 33.487-46.874 60.788-197.507 251.896 31.108 421.89 31.108 421.89l1.917 1.28c1.172 26.63 5.15 58.57 5.15 58.57h9.002s3.978-31.94 5.15-58.57l1.917-1.28s228.572-169.994 31.108-421.89h-.113zM128.545 489.459s-6.876-5.22-9.043-8.738l-.021-.138 8.888-187.59h.352l8.888 187.59-.021.138c-2.167 3.518-9.043 8.738-9.043 8.738z'
          fill='#00ED64'
        />
      </svg>
    ),
    color: '#00ED64',
  },
  typescript: {
    component: () => (
      <svg viewBox='0 0 256 256' className='w-full h-full'>
        <rect width='256' height='256' rx='20' fill='#3178C6' />
        <path
          d='M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.796 10.669-11.672 2.62-4.876 3.931-10.94 3.931-18.192 0-5.237-.982-9.768-2.946-13.592-1.964-3.825-4.605-7.191-7.924-10.099-3.319-2.907-7.17-5.469-11.553-7.684-4.384-2.215-9.001-4.315-13.851-6.3-3.551-1.497-6.68-2.964-9.389-4.401-2.708-1.437-4.981-2.876-6.818-4.317-1.838-1.44-3.234-2.993-4.189-4.66-.955-1.666-1.433-3.605-1.433-5.818 0-1.957.42-3.736 1.261-5.336.84-1.601 2.088-2.993 3.744-4.177 1.655-1.184 3.712-2.11 6.17-2.778 2.458-.669 5.292-1.003 8.504-1.003 2.263 0 4.638.173 7.126.518 2.488.346 4.967.895 7.436 1.649a48.093 48.093 0 0 1 7.178 2.948 37.82 37.82 0 0 1 6.227 3.862v-25.772c-4.076-1.727-8.632-2.978-13.667-3.753-5.034-.776-10.861-1.164-17.48-1.164-6.567 0-12.802.691-18.703 2.073-5.901 1.382-11.094 3.582-15.578 6.6-4.484 3.019-8.039 6.9-10.669 11.643-2.629 4.744-3.944 10.448-3.944 17.114 0 8.674 2.518 15.992 7.553 21.955 5.035 5.963 12.545 10.8 22.53 14.51 4.068 1.553 7.859 3.077 11.372 4.574 3.514 1.497 6.567 3.079 9.16 4.745 2.593 1.667 4.634 3.525 6.124 5.576 1.489 2.051 2.234 4.431 2.234 7.141 0 1.841-.379 3.553-1.137 5.135-.758 1.583-1.964 2.964-3.618 4.144-1.655 1.18-3.786 2.109-6.395 2.789-2.609.679-5.742 1.019-9.4 1.019-6.275 0-12.378-1.252-18.31-3.757-5.932-2.505-11.257-6.147-15.978-10.928zm-51.379-91.03h32.259V86.064H50.578v23.381h32.259v112.03h16.302v-112.03z'
          fill='white'
        />
      </svg>
    ),
    color: '#3178C6',
  },
  tailwind: {
    component: () => (
      <svg viewBox='0 0 256 154' className='w-full h-full'>
        <path
          d='M128 0Q96 0 80 32q24-16 48-8c9.6 3.2 16.5 9.4 24 16.2 12.3 11 26.5 23.8 57.6 23.8q32 0 48-32-24 16-48 8c-9.6-3.2-16.5-9.4-24-16.2C173.3 12.8 159.1 0 128 0zM80 64Q48 64 32 96q24-16 48-8c9.6 3.2 16.5 9.4 24 16.2 12.3 11 26.5 23.8 57.6 23.8q32 0 48-32-24 16-48 8c-9.6-3.2-16.5-9.4-24-16.2C125.3 76.8 111.1 64 80 64z'
          fill='#06B6D4'
        />
      </svg>
    ),
    color: '#06B6D4',
  },
};

const SkillIcon = memo(({ type }) => {
  const icon = icons[type];
  return icon ? <icon.component /> : null;
});

/* ─── Skills Configuration ─── */
const skills = [
  // Inner orbit — core languages
  {
    id: 'react',
    orbit: 115,
    size: 48,
    speed: 0.8,
    icon: 'react',
    phase: 0,
    label: 'React',
  },
  {
    id: 'javascript',
    orbit: 115,
    size: 44,
    speed: 0.8,
    icon: 'javascript',
    phase: (2 * Math.PI) / 4,
    label: 'JavaScript',
  },
  {
    id: 'node',
    orbit: 115,
    size: 46,
    speed: 0.8,
    icon: 'node',
    phase: (4 * Math.PI) / 4,
    label: 'Node.js',
  },
  {
    id: 'typescript',
    orbit: 115,
    size: 44,
    speed: 0.8,
    icon: 'typescript',
    phase: (6 * Math.PI) / 4,
    label: 'TypeScript',
  },
  // Outer orbit — frameworks & tools
  {
    id: 'nextjs',
    orbit: 200,
    size: 50,
    speed: -0.5,
    icon: 'nextjs',
    phase: 0.5,
    label: 'Next.js',
  },
  {
    id: 'mongodb',
    orbit: 200,
    size: 46,
    speed: -0.5,
    icon: 'mongodb',
    phase: (2 * Math.PI) / 3 + 0.5,
    label: 'MongoDB',
  },
  {
    id: 'tailwind',
    orbit: 200,
    size: 46,
    speed: -0.5,
    icon: 'tailwind',
    phase: (4 * Math.PI) / 3 + 0.5,
    label: 'Tailwind',
  },
];

/* ─── Orbit Ring ─── */
const OrbitRing = memo(({ radius, color, delay = 0 }) => (
  <div
    className='absolute top-1/2 left-1/2 rounded-full pointer-events-none'
    style={{
      width: radius * 2,
      height: radius * 2,
      transform: 'translate(-50%, -50%)',
    }}
  >
    <div
      className='absolute inset-0 rounded-full'
      style={{
        background: `radial-gradient(circle, transparent 60%, ${color}15 85%, ${color}25 100%)`,
        animation: `pulse 4s ease-in-out ${delay}s infinite`,
      }}
    />
    <div
      className='absolute inset-0 rounded-full'
      style={{
        border: `1px solid ${color}20`,
        boxShadow: `inset 0 0 20px ${color}08`,
      }}
    />
  </div>
));

/* ─── Orbiting Icon ─── */
const OrbitingIcon = memo(({ config, angle }) => {
  const [hovered, setHovered] = useState(false);
  const x = Math.cos(angle) * config.orbit;
  const y = Math.sin(angle) * config.orbit;
  const iconColor = icons[config.icon]?.color;

  return (
    <div
      className='absolute top-1/2 left-1/2 transition-all duration-300 ease-out'
      style={{
        width: config.size,
        height: config.size,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: hovered ? 20 : 10,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className='relative w-full h-full p-2.5 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer bg-zinc-800/90 backdrop-blur-sm'
        style={{
          transform: hovered ? 'scale(1.25)' : 'scale(1)',
          boxShadow: hovered
            ? `0 0 24px ${iconColor}50, 0 0 48px ${iconColor}20`
            : '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        <SkillIcon type={config.icon} />
        {hovered && (
          <div className='absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-zinc-900/95 backdrop-blur-sm rounded text-[11px] text-white whitespace-nowrap pointer-events-none font-medium border border-zinc-700/50'>
            {config.label}
          </div>
        )}
      </div>
    </div>
  );
});

/* ─── Main Component ─── */
export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    let frameId;
    let last = performance.now();

    const tick = now => {
      const dt = (now - last) / 1000;
      last = now;
      setTime(t => t + dt);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [paused]);

  return (
    <div
      className='relative w-[min(100%,500px)] aspect-square flex items-center justify-center'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Center icon */}
      <div className='w-22 h-22 bg-linear-to-br from-zinc-700 to-zinc-900 rounded-full flex items-center justify-center z-10 relative shadow-2xl'>
        <div className='absolute inset-0 rounded-full bg-green-500/25 blur-xl animate-pulse' />
        <div
          className='absolute inset-0 rounded-full bg-emerald-500/15 blur-2xl animate-pulse'
          style={{ animationDelay: '1s' }}
        />
        <div className='relative z-10'>
          <Code size={38} className='text-green-400' />
        </div>
      </div>

      {/* Orbit rings */}
      <OrbitRing radius={115} color='#22c55e' delay={0} />
      <OrbitRing radius={200} color='#16a34a' delay={1.5} />

      {/* Orbiting icons */}
      {skills.map(config => (
        <OrbitingIcon
          key={config.id}
          config={config}
          angle={time * config.speed + config.phase}
        />
      ))}
    </div>
  );
}
