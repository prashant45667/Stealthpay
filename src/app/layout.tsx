import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StealthPay | Confidential Split & Payroll Protocol on Midnight',
  description: 'Confidential multi-party split & payroll dApp powered by Midnight Network zero-knowledge smart contracts and Lace wallet integration.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-charcoal-950 text-white antialiased selection:bg-emerald-neon selection:text-charcoal-950">
        {children}
      </body>
    </html>
  );
}
