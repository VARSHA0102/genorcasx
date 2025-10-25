import GlassCard from '../GlassCard';

export default function GlassCardExample() {
  return (
    <div className="p-8 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      <div className="max-w-md mx-auto space-y-4">
        <GlassCard>
          <h3 className="text-lg font-semibold">Basic Glass Card</h3>
          <p className="text-muted-foreground">This is a basic glass card with glassmorphic styling.</p>
        </GlassCard>
        
        <GlassCard hover>
          <h3 className="text-lg font-semibold">Hoverable Glass Card</h3>
          <p className="text-muted-foreground">This card has hover effects and elevates on interaction.</p>
        </GlassCard>
      </div>
    </div>
  );
}