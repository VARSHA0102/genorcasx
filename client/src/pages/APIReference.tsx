import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Terminal, Key, Zap, Copy } from 'lucide-react';

export default function APIReference() {
  const endpoints = [
    {
      method: "POST",
      endpoint: "/api/tools/tokenize",
      description: "Tokenize text using various strategies",
      params: ["text", "language", "strategy"]
    },
    {
      method: "POST", 
      endpoint: "/api/tools/chunk",
      description: "Split text into manageable chunks",
      params: ["text", "chunk_size", "overlap"]
    },
    {
      method: "POST",
      endpoint: "/api/tools/chat",
      description: "Chat with AI assistant using Groq",
      params: ["groq_api_key", "message", "model"]
    },
    {
      method: "POST",
      endpoint: "/api/tools/embed",
      description: "Generate text embeddings",
      params: ["text", "model", "dimensions"]
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="text-primary border-primary/20 mb-6">API Reference</Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            API Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Complete reference for integrating GenOrcasX AI tools into your applications.
          </p>
        </div>
      </section>

      {/* Authentication */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-8 mb-12">
            <div className="flex items-center mb-4">
              <Key className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-display font-bold text-foreground">Authentication</h2>
            </div>
            <p className="text-muted-foreground mb-4">Most endpoints require API keys for external services (Groq, OpenAI). Include them in your request body.</p>
            <div className="bg-background/50 rounded-lg p-4 border border-glass-border dark:border-glass-dark-border">
              <code className="text-sm text-foreground">{"{ \"groq_api_key\": \"your-key-here\" }"}</code>
            </div>
          </GlassCard>

          {/* Endpoints */}
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-bold text-foreground text-center mb-8">API Endpoints</h2>
            {endpoints.map((endpoint, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <Badge className="mr-3 bg-green-500">{endpoint.method}</Badge>
                      <code className="text-foreground font-mono">{endpoint.endpoint}</code>
                    </div>
                    <p className="text-muted-foreground">{endpoint.description}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Parameters:</h4>
                  <div className="flex flex-wrap gap-2">
                    {endpoint.params.map((param, pIndex) => (
                      <Badge key={pIndex} variant="outline" className="text-xs">{param}</Badge>
                    ))}
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
