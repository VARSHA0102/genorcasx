import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Mail, Phone, Clock, HelpCircle } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Support() {
  const [, setLocation] = useLocation();

  const supportOptions = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7 Available",
      action: "Coming Soon",
      disabled: true
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email Support",
      description: "Send us detailed questions and get comprehensive answers",
      availability: "Response within 4hrs",
      action: "Send Email",
      disabled: false,
      onClick: () => setLocation('/contact')
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Phone Support",
      description: "Speak directly with our technical experts",
      availability: "7395966001 / 9176957697",
      action: null,
      disabled: true
    }
  ];

  const faqs = [
    {
      question: "How do I get started with GenOrcasX AI tools?",
      answer: "Visit our Tools page and select any tool to begin. Most tools work without API keys, while some require external service keys."
    },
    {
      question: "What API keys do I need?",
      answer: "For AI Assistant and RAG tools, you'll need a Groq API key. For advanced embeddings, an OpenAI API key is recommended."
    },
    {
      question: "Is there a rate limit on API calls?",
      answer: "Rate limits depend on your plan. Free tier includes 1000 calls per month. Contact us for enterprise limits."
    },
    {
      question: "How secure is my data?",
      answer: "We use enterprise-grade security with encryption in transit and at rest. Data is not stored permanently."
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="text-primary border-primary/20 mb-6">Support Center</Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            We're Here to Help
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get the support you need to make the most of GenOrcasX AI tools and services.
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">How Can We Help?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <GlassCard key={index} className="text-center p-8 h-full hover-elevate">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit mx-auto mb-4">
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{option.title}</h3>
                <p className="text-muted-foreground mb-4">{option.description}</p>
                <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
                  <Clock className="h-4 w-4 mr-1" />
                  {option.availability}
                </div>
                {option.action && (
                  <Button 
                    className="w-full" 
                    disabled={option.disabled}
                    onClick={option.onClick ? option.onClick : undefined}
                  >
                    {option.action}
                  </Button>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-muted/5 via-background to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
