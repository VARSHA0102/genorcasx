import Hero from '../Hero';
import { ThemeProvider } from '@/hooks/use-theme';

export default function HeroExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <Hero />
      </div>
    </ThemeProvider>
  );
}