import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Book, Code, PlayCircle, Search, ArrowRight, FileText } from 'lucide-react';

export default function Documentation() {
  const sections = [
    {
      icon: <PlayCircle className="h-6 w-6" />,
      title: "Getting Started",
      description: "Quick start guides and tutorials to get you up and running.",
      link: "#getting-started"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "API Reference",
      description: "Comprehensive API documentation with examples.",
      link: "#api-reference"
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: "Guides & Tutorials",
      description: "In-depth guides for advanced use cases and implementations.",
      link: "#guides"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Examples",
      description: "Code examples and sample implementations.",
      link: "#examples"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="text-primary border-primary/20 mb-6">Documentation</Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Developer Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Everything you need to integrate and build with GenOrcasX AI tools and APIs.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search documentation..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-glass-primary dark:bg-glass-dark-primary backdrop-blur-lg border border-glass-border dark:border-glass-dark-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sections.map((section, index) => (
              <GlassCard key={index} className="p-6 h-full hover-elevate cursor-pointer">
                <div className="space-y-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit">
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                  <Button variant="ghost" size="sm" className="p-0">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
