import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.username === 'admin' && credentials?.password === 'admin') {
          return { id: '1', name: 'Admin User', email: 'admin@example.com' };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'supersecretkey',
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
