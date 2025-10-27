import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import genImage from '@assets/generated_images/genName.png';
import logo from '@assets/generated_images/logo_genox.png';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Thanks for subscribing!",
          description: data.message || "You'll receive our latest updates and insights.",
        });
        setEmail('');
      } else {
        throw new Error(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error.message || 'Please try again later.',
        variant: "destructive"
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    Services: [
      { label: 'AI Tools', href: '/tools' },
      { label: 'Consulting', href: '/consulting' },
      { label: 'Custom Development', href: '/development' },
      { label: 'Enterprise Solutions', href: '/enterprise' },
    ],
    Resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Support', href: '/support' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Security', href: '/security' },
    ],
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-glass-primary via-background to-glass-secondary dark:from-glass-dark-primary dark:via-background dark:to-glass-dark-secondary backdrop-blur-lg border-t border-glass-border dark:border-glass-dark-border">
      {/* Background Pattern with pointer-events-none to allow clicks through */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-blue-500 blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand and Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2 group">
              <img 
                src={logo} 
                alt="GenOrcasX logo" 
                className="h-8 w-auto group-hover:scale-105 transition-transform duration-300"
              />
<img 
  src={genImage} 
  alt="GenOrcasX name" 
  className="h-8 w-auto group-hover:scale-105 transition-transform duration-300 translate-x-1 translate-y-1"
  style={{ marginLeft: '0.25rem', marginBottom: '0.09rem' }}
/>            </div>
                        
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering businesses with cutting-edge AI solutions and tools. 
              Transform your operations with our comprehensive suite of artificial intelligence services.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground flex items-center">
                <span className="relative">
                  Stay Updated
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
                </span>
              </h3>
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50 border-glass-border dark:border-glass-dark-border focus:border-primary/50 transition-colors duration-300"
                  data-testid="input-newsletter-email"
                  required
                />
                <Button type="submit" data-testid="button-subscribe" className="group hover:scale-105 transition-transform duration-300">
                  <Mail style={{ pointerEvents: 'none' }} className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                </Button>
              </form>
            </div>
          </div>

{Object.entries(footerLinks).map(([category, links]) => (
  <div key={category} className="space-y-4 group">
    <h3 className="font-medium text-foreground relative">
      {category}
      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
    </h3>
    <ul className="space-y-2">
      {links.map((link) => {
        const openInNewTab = link.label === "AI Tools" || link.label === "Consulting" || link.label === "Blog" || link.label === "Documentation" || link.label === "API Reference" || link.label === "Support";
        return (
          <li key={link.href}>
            {openInNewTab ? (
              // Use anchor tag for new tab
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ) : (
              // Use wouter Link for internal navigation
              <Link
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  </div>
))}


        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-glass-border dark:border-glass-dark-border relative">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2023 GenOrcasX. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-2">
              {/* Social Buttons with onClick and pointerEvents:none on icons */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open('https://twitter.com/yourprofile', '_blank', 'noopener,noreferrer')}
                className="h-10 w-10 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300 group"
                data-testid="button-social-twitter"
              >
                <Twitter style={{ pointerEvents: 'none' }} className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open('https://www.linkedin.com/company/genorcasx/', '_blank', 'noopener,noreferrer')}
                className="h-10 w-10 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300 group"
                data-testid="button-social-linkedin"
              >
                <Linkedin style={{ pointerEvents: 'none' }} className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open('https://github.com/yourprofile', '_blank', 'noopener,noreferrer')}
                className="h-10 w-10 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300 group"
                data-testid="button-social-github"
              >
                <Github style={{ pointerEvents: 'none' }} className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </Button>
              
              {/* Divider */}
              <div className="h-6 w-px bg-glass-border dark:bg-glass-dark-border mx-2"></div>
              
              {/* Scroll to Top */}
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollToTop}
                className="h-10 w-10 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-110 hover:-translate-y-1 transition-all duration-300 group"
                data-testid="button-scroll-to-top"
              >
                <ArrowUp style={{ pointerEvents: 'none' }} className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </Button>
            </div>
          </div>
          
          {/* Subtle glow effect overlay - pointer events disabled */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </div>
    </footer>
  );
}
