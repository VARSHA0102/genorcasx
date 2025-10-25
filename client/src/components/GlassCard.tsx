import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className, hover = false, onClick }: GlassCardProps) {
  return (
    <div
      className={cn(
        'bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border border-glass-border dark:border-glass-dark-border rounded-lg p-6',
        hover && 'hover-elevate transition-all duration-300 cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}