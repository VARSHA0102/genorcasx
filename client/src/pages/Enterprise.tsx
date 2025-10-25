import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Users, Globe, CheckCircle, ArrowRight } from 'lucide-react';

export default function Enterprise() {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security with SOC2 compliance and data encryption."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Scalable Performance",
      description: "Handle millions of requests with auto-scaling infrastructure."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Dedicated Support",
      description: "24/7 premium support with dedicated account management."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Deployment",
      description: "Multi-region deployment for optimal performance worldwide."
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="text-primary border-primary/20 mb-6">Enterprise Solutions</Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Enterprise-Grade AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Scalable, secure AI solutions designed for large organizations with complex requirements.
          </p>
          <Button size="lg">Contact Enterprise Sales</Button>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <GlassCard key={index} className="text-center p-6 h-full hover-elevate">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
