"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/Logo';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  { href: '/documents', label: 'Library' },
  { href: '/form-fill', label: 'AI Form Fill' },
  { href: '/community', label: 'Community' },
];

export function Header() {
  const pathname = usePathname();

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === href ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Logo />
        </Link>
        <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
            <NavLinks />
        </div>
        <div className="md:hidden flex flex-1 justify-end">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <SheetHeader className="sr-only">
                      <SheetTitle>Mobile Navigation</SheetTitle>
                    </SheetHeader>
                    <NavLinks className="flex-col items-start space-y-4 pt-8" />
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
