import Navigation from '../Navigation';
import { ThemeProvider } from '@/hooks/use-theme';

export default function NavigationExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 p-8">
          <p className="text-muted-foreground">Navigation component with glassmorphic design</p>
        </div>
      </div>
    </ThemeProvider>
  );
}