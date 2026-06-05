// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'McGen+ | Professional Mockup & eCover Generator',
  description:
    'Create stunning professional mockups and eCovers for books, software boxes, devices, and more — entirely in your browser.',
  keywords: 'mockup generator, eCover, book mockup, device mockup, SaaS mockup, free mockup tool',
  openGraph: {
    title: 'McGen+ | Professional Mockup & eCover Generator',
    description: 'Create stunning professional mockups and eCovers in your browser.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#11111c',
              color: '#f0f0ff',
              border: '1px solid #1e1e30',
              borderRadius: '10px',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
            },
            success: {
              iconTheme: { primary: '#10b981', secondary: '#11111c' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#11111c' },
            },
          }}
        />
      </body>
    </html>
  );
}
