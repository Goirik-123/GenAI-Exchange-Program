import { Scale } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 text-primary">
      <Scale className="h-6 w-6" />
      <span className="font-bold text-xl font-headline text-foreground">
        Legally Simple
      </span>
    </div>
  );
}
