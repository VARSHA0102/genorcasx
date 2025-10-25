import ContactForm from '../ContactForm';
import { Toaster } from '@/components/ui/toaster';

export default function ContactFormExample() {
  return (
    <div className="bg-background">
      <ContactForm />
      <Toaster />
    </div>
  );
}