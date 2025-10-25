import GlassCard from '@/components/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, Server, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Security() {
  const securityFeatures = [
    {
      icon: <Lock className="h-8 w-8" />,
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256"
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Secure Infrastructure",
      description: "Hosted on enterprise-grade cloud infrastructure with 24/7 monitoring"
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Privacy by Design",
      description: "We minimize data collection and don't store personal information unnecessarily"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Compliance",
      description: "SOC 2 Type II compliant with regular security audits and assessments"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="text-primary border-primary/20 mb-6">Security</Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Enterprise-Grade Security
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your data security is our top priority. We implement multiple layers of protection to keep your information safe.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {securityFeatures.map((feature, index) => (
              <GlassCard key={index} className="text-center p-6 h-full hover-elevate">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-3 text-primary" />
              Responsible Disclosure
            </h2>
            <p className="text-muted-foreground mb-4">
              If you discover a security vulnerability, please report it responsibly by emailing security@genorcasx.com. 
              We take all reports seriously and will respond within 24 hours.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="font-semibold text-foreground mb-2">What to Include:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Description of the vulnerability</li>
                  <li>• Steps to reproduce</li>
                  <li>• Potential impact assessment</li>
                  <li>• Your contact information</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Our Commitment:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 24-hour response time</li>
                  <li>• Regular security updates</li>
                  <li>• Public acknowledgment (if desired)</li>
                  <li>• Coordinated disclosure timeline</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
