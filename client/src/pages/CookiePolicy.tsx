import GlassCard from '@/components/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Cookie, Settings, BarChart3, Shield } from 'lucide-react';

export default function CookiePolicy() {
  const cookieTypes = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Essential Cookies",
      description: "Required for basic website functionality and security",
      required: true
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website",
      required: false
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Functional Cookies", 
      description: "Remember your preferences and provide enhanced features",
      required: false
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="text-primary border-primary/20 mb-6">Cookie Policy</Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Cookie Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            How we use cookies to improve your experience on GenOrcasX.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {cookieTypes.map((type, index) => (
              <GlassCard key={index} className="text-center p-6 h-full">
                <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-4">
                  {type.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{type.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                <Badge variant={type.required ? "default" : "outline"} className="text-xs">
                  {type.required ? "Required" : "Optional"}
                </Badge>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-8">
            <div className="flex items-center mb-6">
              <Cookie className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-display font-bold text-foreground">What Are Cookies?</h2>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">
                Cookies are small text files stored on your device when you visit our website. 
                They help us provide a better user experience by remembering your preferences 
                and analyzing how you use our services.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">How We Use Cookies</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                <li>To remember your login status and preferences</li>
                <li>To analyze website traffic and user behavior</li>
                <li>To provide personalized content and recommendations</li>
                <li>To ensure website security and prevent fraud</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mb-2">Managing Cookies</h3>
              <p className="text-muted-foreground mb-4">
                You can control cookies through your browser settings. Note that disabling 
                certain cookies may affect website functionality.
              </p>

              <p className="text-sm text-muted-foreground mt-8">Last updated: December 2024</p>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
