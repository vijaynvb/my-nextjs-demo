# **Routing & Authentication in Next.js v15**

A structured, up-to-date guide for Next.js v15 using the latest App Router, dynamic routing, and Auth.js integration.

---

## **Table of Content**

[**Routing in Next.js**](#routing-in-next.js-v15)

1. [**Static Routes**](#static-routes)
2. [**Dynamic Routes**](#dynamic-routes)
3. [**Catch-all Routes**](#catch-all-routes)
4. [**Nested Routes**](#nested-routes)

[**Authentication & Authorization**](#authentication-&-authorization-in-next.js-v15)

1. [**Client-side protection**](#client-side-protection)
2. [**Server-side protection**](#server-side-protection)
3. [**NextAuth.js integration**](#nextauth.js-integration) 

[**Summary**](#summary)

[**Futher Understanding**](#futher-understanding)

## **Routing in Next.js v15**

Next.js v15 uses **file-system-based routing** under the `app/` directory.

1. [**Static Routes**](#static-routes)
2. [**Dynamic Routes**](#dynamic-routes)
3. [**Catch-all Routes**](#catch-all-routes)
4. [**Nested Routes**](#nested-routes)

---

### **Static Routes**

> Static routes are simple folders and files.

**Example:**

```
app/about/page.tsx
```

**Access:**

```
http://localhost:3000/about
```

**Code:**

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return <h1>About Us</h1>;
}
```

- SEO friendly  
- Fast, pre-rendered by default

---

### **Dynamic Routes**

> Dynamic segments use square brackets.

**Example:**

```
app/products/[id]/page.tsx
```

**Access:**

```
http://localhost:3000/products/123
```

**Client Component Example:**

```tsx
// app/products/[id]/page.tsx
'use client';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const params = useParams();
  return <h1>Product ID: {params.id}</h1>;
}
```

**Server Component Example:**

```tsx
export default function ProductPage({ params }: { params: { id: string } }) {
  return <h1>Product ID: {params.id}</h1>;
}
```

- Great for user profiles, product pages, etc.

---

### **Catch all Routes**

> Use `[[...param]]` to catch multiple segments.

**Example:**

```
app/docs/[...slug]/page.tsx
```

**Access:**

- `/docs`
- `/docs/setup/installation`
- `/docs/setup/advanced/features`

**Code:**

```tsx
export default function DocsPage({ params }: { params: { slug?: string[] } }) {
  return <pre>{JSON.stringify(params.slug)}</pre>;
}
```

**Useful for:**

- Documentation
- Nested categories
- Optional paths

---

### **Nested Routes**

> Folders = nested routes.

**Example:**

```
app/mydashboard/settings/page.tsx  
app/mydashboard/profile/page.tsx
```

**Access:**

- `/mydashboard/settings`
- `/mydashboard/profile`

**Code:**

```tsx
// app/mydashboard/settings/page.tsx
export default function SettingsPage() {
  return <h1>Dashboard Settings</h1>;
}
```

- Layout support using `layout.tsx`

---

## **Authentication & Authorization in Next.js v15**

Next.js v15 works seamlessly with **NextAuth.js (Auth.js)** for client-side and server-side authentication.

1. [**Client-side protection**](#client-side-protection)
2. [**Server-side protection**](#server-side-protection)
3. [**NextAuth.js integration**](#nextauth.js-integration) 

---

### **Client side Protection**

> Use `useSession()` from `next-auth/react`.

```tsx
// app/protected/page.tsx
'use client';

import { useSession, signIn } from 'next-auth/react';

export default function ProtectedPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) {
    signIn(); // Redirects to login
    return <p>Redirecting...</p>;
  }

  return <h1>Protected Content for {session.user?.name}</h1>;
}
```

- Redirect unauthenticated users  
- Ideal for interactive UIs

---

### **Server side Protection**

> Use `getServerSession()` in server components.

```tsx
// app/protected/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <h1>Access Denied</h1>;
  }

  return <h1>Welcome, {session.user?.name}</h1>;
}
```

- No flicker / immediate protection  
- Ideal for SSR, server-only pages

---

### **NextAuth.js Integration**

1. [**Create API Route**](#create-api-route)
2. [**Wrap in Session Provider**](#wrap-in-session-provider)
3. [**Use Session in Client Component**](#use-session-in-client-component)

#### **Create API Route**

**Install**

```bash
npm install next-auth
```

**Create API Route**

```
app/api/auth/[...nextauth]/route.ts
```

**Code:**

```tsx
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

####  **Wrap in Session Provider**

```tsx
// app/layout.tsx
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

```

---

#### **Use Session in Client Component**

```tsx
// components/NavbarSession.tsx
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function NavbarSession() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <span>Welcome, {session.user?.name}</span>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </div>
  );
}
```

- Supports social login providers  
- JWT or database sessions  
- Auto refresh  
- Works on client + server

---

## **Summary**

| Feature                  | Approach                                      |
|--------------------------|-----------------------------------------------|
| **Static Routes**        | `app/about/page.tsx`                          |
| **Dynamic Routes**       | `app/products/[id]/page.tsx`                 |
| **Catch-all Routes**     | `app/docs/[...slug]/page.tsx`                |
| **Nested Routes**        | `app/dashboard/settings/page.tsx`            |
| **Client-side Protection** | `useSession()` in client components         |
| **Server-side Protection** | `getServerSession()` in server components   |
| **NextAuth.js Integration** | API route + `SessionProvider`            |

---

## **Futher Understanding**

Would you like to extend this project with:

- API Route protection via middleware
- Token rotation & JWT strategies
- Role-based access control (RBAC)
- Middleware-based redirects for unauthorized users
- Login/Logout functionality in Navbar

---