# Next.js 15 Professional Demo Project (TypeScript + App Router)

## **Tech Stack**

- **Next.js 15** (App Router enabled)
- **TypeScript**
- **Auth.js** (formerly next-auth)
- **Server & Client Component Separation**
- **Modern Asset Handling**
- **Dynamic Routing**
- **Session-based Authentication**

---

## **Project Structure**

```
/my-nextjs-demo
  /app
    /about
      page.tsx
    /api
      /auth
        [...nextauth]/route.ts
      /products
        route.ts    
    /dashboard
      layout.tsx
      page.tsx
    /docs
      /[...slug]
        page.tsx
    /isr
      page.tsx
    /login
      page.tsx
    /mydashboard
      /profile
        page.tsx
      /settings
        page.tsx  
    /products
      /[id]
        page.tsx
    /ssr
      page.tsx
    layout.tsx
    page.tsx
  /components
    Navbar.tsx
    NavbarSession.tsx
    ProductList.tsx
    SessionProviderWrapper.tsx
  /lib
    auth.ts
  /public
    logo.png
  /styles
    globals.css
  next.config.js
  tsconfig.json
  package.json
```

---

## **Step 1: Install Dependencies**

```bash
npx create-next-app@latest my-nextjs-demo -ts
cd my-nextjs-demo

npm install next@15 react@latest react-dom@latest
npm install next-auth@latest
```

---

## **Step 2: Core Code Overview**

### **`/app/layout.tsx`**

```tsx
import './globals.css';
import Navbar from '../components/Navbar';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'Next.js 15 Mini Project',
  description: 'Routing, Auth, Assets, Data Sharing',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
```

---

### **`/components/Navbar.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      <Link href="/">Home</Link> | 
      <Link href="/about">About</Link> | 
      <Link href="/dashboard">Dashboard</Link> | 
      {session ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
}
```

---

### **`/app/page.tsx`**

```tsx
export default function HomePage() {
  return <h1>🏠 Welcome to Next.js 15 Mini Project!</h1>;
}
```

### **`/app/about/page.tsx`**

```tsx
export default function AboutPage() {
  return <h1>📖 About Us Page</h1>;
}
```

### **`/app/dashboard/page.tsx`**

```tsx
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
```

### **`/app/login/page.tsx`**

```tsx
'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      callbackUrl: '/dashboard',
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <input name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
```

### **`/app/docs/[slug]/page.tsx`**

```tsx
export default function DocsPage({ params }: { params: { slug?: string[] } }) {
  return <pre>{JSON.stringify(params.slug)}</pre>;
}
```

### **`/app/products/[id]/page.tsx`**

```tsx
export default function ProductPage({ params }: { params: { id: string } }) {
  return <h1>🛒 Product Details for: {params.id}</h1>;
}
```

---

### **`/app/api/auth/[...nextauth]/route.ts`**

```ts
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
```

---

### **`/lib/auth.ts`**

```ts
export { authOptions } from '../app/api/auth/[...nextauth]/route';
```

---

## **Asset Handling**

Just add to the `/public` folder and use:

```tsx
<img src="/logo.png" alt="Logo" width={100} />
```

---