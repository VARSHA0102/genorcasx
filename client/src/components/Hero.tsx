  import { Button } from '@/components/ui/button';
  import { ArrowRight, Play } from 'lucide-react';
  import heroBackground from '@assets/generated_images/Tech_AI_hero_background_1a577423.png';
  import { useLocation } from 'wouter';

  export default function Hero() {
    const [, setLocation] = useLocation();

    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-background/90 dark:from-background/95 dark:via-background/70 dark:to-background/95" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold">
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Next-Gen AI
              </span>
              <br />
              <span className="text-foreground">Solutions</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Unlock the power of artificial intelligence with GenOrcasX's comprehensive suite of 
              AI tools and enterprise solutions. Transform your business with cutting-edge technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => setLocation('/tools')}
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 flex items-center"
                data-testid="button-explore-tools"
              >
                Explore AI Tool
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setLocation('/contact')}
                className="text-lg px-8 py-6 bg-background/10 backdrop-blur-sm border-glass-border dark:border-glass-dark-border hover:bg-background/20 flex items-center"
                data-testid="button-watch-demo"
              >
                <Play className="mr-2 h-5 w-5" />
                Connect
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
              {[
                { label: 'AI Tools', value: '6+' },
                { label: 'Enterprise Clients', value: '100+' },
                { label: 'API Integrations', value: '50+' },
              ].map((stat, index) => (
                <div key={index} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}>
                  <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500" />
      </section>
    );
  }
