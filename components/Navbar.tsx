'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import NavbarSession from './NavbarSession';

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path ? 'underline font-semibold' : '';

  return (
    <nav className="flex gap-4 mb-6 border-b pb-4 items-center">
      <h1 className="font-bold">My App</h1>
      
      <Link className={linkClass('/')} href="/">Home</Link>
      <Link className={linkClass('/client')} href="/client">Client Fetch</Link>
      <Link className={linkClass('/ssr')} href="/ssr">SSR Fetch</Link>
      <Link className={linkClass('/isr')} href="/isr">ISR Fetch</Link>

      <div className="ml-auto">
        <NavbarSession />
      </div>
    </nav>
  );
}




// 'use client';

// import NavbarSession from './NavbarSession';

// export default function Navbar() {
//   return (
//     <nav>
//       <h1>My App</h1>
//       <NavbarSession />
//     </nav>
//   );
// }
