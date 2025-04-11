import SessionProviderWrapper from '../../components/SessionProviderWrapper';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <SessionProviderWrapper>{children}</SessionProviderWrapper>;
}
