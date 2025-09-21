import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Inter, Lexend } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Legally Simple',
  description: 'Your AI-Powered Legal Co-Pilot',
};

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const lexend = Lexend({ subsets: ['latin'], weight: '700', variable: '--font-headline' });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable, lexend.variable)}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
