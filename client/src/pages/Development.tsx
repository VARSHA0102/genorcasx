import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Cpu, Database, Cloud, CheckCircle, ArrowRight } from 'lucide-react';

export default function Development() {
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Custom AI Models",
      description: "Bespoke machine learning models tailored to your specific use cases and data."
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "AI Applications",
      description: "End-to-end AI application development from concept to deployment."
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Pipelines",
      description: "Robust data processing and ML pipelines for scalable AI operations."
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Integration",
      description: "Seamless integration with cloud platforms for scalable AI solutions."
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="text-primary border-primary/20 mb-6">Custom Development</Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Custom AI Development
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Tailored AI solutions built specifically for your business needs and requirements.
          </p>
          <Button size="lg">Start Your Project</Button>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <GlassCard key={index} className="text-center p-6 h-full hover-elevate">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit mx-auto mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
