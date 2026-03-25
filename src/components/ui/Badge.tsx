interface BadgeProps {
  label: string
  className?: string
}

export function Badge({ label, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-mono border border-accent-secondary/30 text-accent-secondary bg-accent-secondary/10 ${className}`}
    >
      {label}
    </span>
  )
}
