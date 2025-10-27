import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import genImage from '@assets/generated_images/genName.png';
import logo from '@assets/generated_images/logo_genox.png';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us', target: '_blank' },
  { href: '/tools', label: 'AI Tools', target: '_blank' },
  { href: '/blog', label: 'Blog', target: '_blank' },

    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border-b border-glass-border dark:border-glass-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-2"
            onClick={() => {
              // Ensure scroll to top when clicking logo
              setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }), 100);
            }}
          >
            <img 
              src={logo}
              alt="GenOrcasX" 
              className="h-8 w-auto"
            />
            <img 
              src={genImage} 
              alt="GenOrcasX name" 
              className="h-8 w-auto group-hover:scale-105 transition-transform duration-300 translate-x-1 translate-y-1"
              style={{ marginLeft: '0.25rem', marginBottom: '0.09rem' }}
            />   
         </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
{navItems.map((item) =>
  item.target === '_blank' ? (
    <a
      key={item.href}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-sm font-medium transition-colors hover:text-primary ${
        location === item.href ? 'text-primary' : 'text-muted-foreground'
      }`}
      data-testid={`nav-link-${item.label.toLowerCase().replace(' ', '-')}`}
    >
      {item.label}
    </a>
  ) : (
    <Link
      key={item.href}
      href={item.href}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        location === item.href ? 'text-primary' : 'text-muted-foreground'
      }`}
      onClick={() => {
        setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }), 100);
      }}
      data-testid={`nav-link-${item.label.toLowerCase().replace(' ', '-')}`}
    >
      {item.label}
    </Link>
  )
)}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="ml-4"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button onClick={() => window.open('/tools', '_blank')} data-testid="button-get-started">Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle-mobile"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
{navItems.map((item) =>
  item.target === '_blank' ? (
    <a
      key={item.href}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
        location === item.href
          ? 'text-primary bg-glass-secondary dark:bg-glass-dark-secondary'
          : 'text-muted-foreground hover:text-primary hover:bg-glass-secondary dark:hover:bg-glass-dark-secondary'
      }`}
      data-testid={`nav-link-mobile-${item.label.toLowerCase().replace(' ', '-')}`}
    >
      {item.label}
    </a>
  ) : (
    <Link
      key={item.href}
      href={item.href}
      className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
        location === item.href
          ? 'text-primary bg-glass-secondary dark:bg-glass-dark-secondary'
          : 'text-muted-foreground hover:text-primary hover:bg-glass-secondary dark:hover:bg-glass-dark-secondary'
      }`}
      onClick={() => {
        setIsOpen(false);
        setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }), 100);
      }}
      data-testid={`nav-link-mobile-${item.label.toLowerCase().replace(' ', '-')}`}
    >
      {item.label}
    </Link>
  )
)}
              <Button onClick={() => setLocation('/tools')} className="mt-4" data-testid="button-get-started-mobile">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}