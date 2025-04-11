
import './globals.css';
import Navbar from '../components/Navbar';
import { ReactNode } from 'react';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';


export const metadata = {
  title: 'Next.js 15 Mini Project',
  description: 'Routing, Auth, Assets, Data Sharing',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
        <Navbar />
        {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
