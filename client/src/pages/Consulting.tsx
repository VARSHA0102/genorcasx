import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, Zap, Users, CheckCircle, ArrowRight, BarChart3 } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Consulting() {
  const [, setLocation] = useLocation();
  const services = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Strategy & Planning",
      description: "Develop comprehensive AI roadmaps aligned with your business objectives and market opportunities."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Use Case Identification",
      description: "Identify high-impact AI opportunities specific to your industry and business challenges."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Implementation Support",
      description: "End-to-end support from proof-of-concept to production deployment and scaling."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Performance Optimization",
      description: "Optimize existing AI systems for better performance, accuracy, and cost-effectiveness."
    }
  ];

  const process = [
    { step: "1", title: "Discovery", description: "We analyze your business, challenges, and opportunities" },
    { step: "2", title: "Strategy", description: "Create a custom AI strategy tailored to your goals" },
    { step: "3", title: "Implementation", description: "Deploy AI solutions with hands-on support" },
    { step: "4", title: "Optimization", description: "Continuous monitoring and improvement" }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="text-primary border-primary/20 mb-6">AI Consulting</Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Transform Your Business with
            <span className="text-transparent bg-gradient-to-r from-primary to-blue-600 bg-clip-text"> AI Excellence</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Strategic AI consulting to help you navigate the complexities of artificial intelligence 
            and unlock transformative value for your organization.
          </p>
          <Button size="lg" onClick={() => setLocation('/contact')}>Schedule Consultation</Button>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Consulting Services</h2>
          </div>
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

      {/* Process */}
      <section className="py-20 bg-gradient-to-br from-muted/5 via-background to-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Process</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GlassCard className="p-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">Let's discuss how AI can transform your business</p>
            <Button size="lg" onClick={() => setLocation('/contact')}>Book Free Consultation</Button>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
