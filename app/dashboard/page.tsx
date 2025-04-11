import { authOptions } from '../../lib/auth';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return <h1>🚀 Welcome to Dashboard, {session.user?.name}!</h1>;
}
