import type { AnchorHTMLAttributes, ReactNode } from 'react'

type CtaButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  size?: 'sm' | 'md'
}

const BASE_CLASSNAME =
  'inline-flex items-center justify-center rounded-[10px] border-0 font-semibold text-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ferdi-sky)]'

const SIZE_CLASSNAME: Record<NonNullable<CtaButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-8 py-[14px] text-[15px]',
}

export default function CtaButton({
  children,
  className,
  size = 'md',
  ...rest
}: CtaButtonProps) {
  return (
    <a
      className={`${BASE_CLASSNAME} ${SIZE_CLASSNAME[size]} bg-[var(--ferdi-peach)] shadow-[0_4px_20px_rgba(255,140,107,0.25)] hover:-translate-y-px hover:bg-[var(--ferdi-peach-light)] hover:shadow-[0_6px_28px_rgba(255,140,107,0.35)] ${className ?? ''}`}
      {...rest}
    >
      {children}
    </a>
  )
}
