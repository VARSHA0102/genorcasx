import Footer from '../Footer';
import { Toaster } from '@/components/ui/toaster';

export default function FooterExample() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="flex-1 p-8">
        <p className="text-muted-foreground text-center">Page content above footer</p>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}