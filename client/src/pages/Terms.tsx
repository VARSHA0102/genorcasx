import GlassCard from '@/components/GlassCard';
import { Badge } from '@/components/ui/badge';
import { FileText, Scale, CheckCircle } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="text-primary border-primary/20 mb-6">Terms of Service</Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground">
            The terms and conditions for using GenOrcasX AI tools and services.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-6">By accessing and using GenOrcasX services, you accept and agree to be bound by the terms and provision of this agreement.</p>
              
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Use License</h2>
              <p className="text-muted-foreground mb-4">Permission is granted to temporarily use GenOrcasX AI tools for personal and commercial purposes under the following conditions:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                <li>This is the grant of a license, not a transfer of title</li>
                <li>You may not modify or copy the materials</li>
                <li>You may not use the materials for any commercial purpose or for any public display</li>
                <li>You may not reverse engineer any software contained on our website</li>
              </ul>

              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Service Availability</h2>
              <p className="text-muted-foreground mb-6">We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We reserve the right to modify or discontinue services with reasonable notice.</p>

              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground mb-6">GenOrcasX shall not be liable for any damages arising from the use or inability to use our services, including but not limited to direct, indirect, incidental, punitive, and consequential damages.</p>

              <p className="text-sm text-muted-foreground mt-8">Last updated: December 2024</p>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
