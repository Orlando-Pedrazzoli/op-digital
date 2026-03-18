import FadeIn from './FadeIn';
export default function SectionHeader({
  label,
  title,
  description,
  center = true,
}) {
  return (
    <FadeIn>
      <div className={`mb-14 ${center ? 'text-center' : ''}`}>
        {label && (
          <p className='text-sm font-bold tracking-[3px] uppercase text-green-600 dark:text-green-400 mb-4'>
            {label}
          </p>
        )}
        <h2
          className='font-display text-[clamp(2.8rem,7vw,5rem)] font-normal text-zinc-900 dark:text-zinc-100 leading-[1.05] mb-5 [&>em]:italic [&>em]:text-green-600 dark:[&>em]:text-green-400'
          style={{ fontStyle: 'normal' }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {description && (
          <p
            className={`text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-160 ${center ? 'mx-auto' : ''}`}
          >
            {description}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
