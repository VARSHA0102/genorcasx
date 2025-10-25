import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function LoadingSpinner({ size = 'md', text = 'Processing...' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-8">
      {/* Animated spinner with glow effect */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg animate-pulse" />
        <Loader2 className={`${sizeClasses[size]} animate-spin text-primary relative z-10`} />
      </div>
      
      {/* Loading text with typing animation */}
      <p className={`${textSizeClasses[size]} text-muted-foreground animate-pulse`}>
        {text}
      </p>
      
      {/* Progress dots */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
