import { MessageCircle } from 'lucide-react';

const variants = {
  primary:
    'bg-green-600 hover:bg-green-700 text-white border border-green-600 hover:border-green-700 shadow-md hover:shadow-lg',
  outline:
    'bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700',
  ghost:
    'bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-transparent',
};

const sizes = {
  sm: 'h-9 px-4 text-sm gap-2',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-11 px-6 text-base gap-2.5',
};

export default function Button({
  children,
  href,
  external = false,
  variant = 'primary',
  size = 'md',
  whatsapp = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer no-underline';
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;
  const widthClasses = fullWidth ? 'w-full' : '';

  const allClasses =
    `${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${className}`.trim();

  const content = (
    <>
      {whatsapp && <MessageCircle size={size === 'sm' ? 14 : 16} />}
      {children}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={allClasses}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={allClasses} {...props}>
      {content}
    </button>
  );
}
