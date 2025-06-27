import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center items-center gap-4">
          <ShieldCheck className="w-16 h-16 text-primary" />
          <h1 className="text-6xl font-bold font-headline tracking-tighter">
            Serenity Watcher
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Proactive infrastructure monitoring and anomaly detection. Keep your systems stable, secure, and serene with AI-powered insights.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button asChild size="lg" className="font-bold text-lg">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="font-bold text-lg">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
