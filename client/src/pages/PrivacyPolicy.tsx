import GlassCard from '@/components/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  const principles = [
    { icon: <Eye className="h-6 w-6" />, title: "Transparency", description: "We're clear about what data we collect and how we use it" },
    { icon: <Lock className="h-6 w-6" />, title: "Security", description: "Your data is protected with enterprise-grade security" },
    { icon: <UserCheck className="h-6 w-6" />, title: "Control", description: "You have full control over your personal information" }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="text-primary border-primary/20 mb-6">Privacy Policy</Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Your Privacy Matters
          </h1>
          <p className="text-xl text-muted-foreground">
            We're committed to protecting your privacy and being transparent about our data practices.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {principles.map((principle, index) => (
              <GlassCard key={index} className="text-center p-6">
                <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-4">
                  {principle.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-6">We collect information to provide better services to our users. This includes:</p>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">Usage Data</h3>
              <p className="text-muted-foreground mb-4">Information about how you use our AI tools and services, including API calls and tool interactions.</p>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">Technical Data</h3>
              <p className="text-muted-foreground mb-4">IP addresses, browser information, and device characteristics for security and optimization purposes.</p>

              <h2 className="text-2xl font-display font-bold text-foreground mb-4 mt-8">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>To provide and improve our AI tools and services</li>
                <li>To ensure security and prevent fraud</li>
                <li>To communicate with you about our services</li>
                <li>To comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-display font-bold text-foreground mb-4 mt-8">Data Security</h2>
              <p className="text-muted-foreground">We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction.</p>

              <p className="text-sm text-muted-foreground mt-8">Last updated: December 2024</p>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
