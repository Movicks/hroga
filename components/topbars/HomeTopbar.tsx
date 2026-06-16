'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/authSlice';
import Image from 'next/image';

export default function HomeTopbar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't show HomeTopbar on portal pages
  if (pathname.startsWith('/admin') || pathname.startsWith('/alumni') || pathname.startsWith('/auth/signup') || pathname.startsWith('/auth/login')) {
    return null;
  }

  interface linkProps {
    name: string,
    href: string
  }

  const navLinks: linkProps[] = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "about" },
    { name: "Contact Us", href: "" },
    { name: "Events", href: "" }
  ]

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  

  return (
    <header className="bg-transparent fixed top-0 z-100 px-4 pt-3 lg:px-[5rem] xl:px-[12.7rem] w-full">
      <div className={`container flex items-center justify-between gap-6 transform duration-300 ${scrolled ? 'bg-white px-4 lg:px-8 rounded-full' : ''}`}>
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-secondary">
          <Image src="/images/HROGA_LOGO2.png" className={`transform duration-300 ${scrolled ? 'w-[3rem] max-h-[3.2rem]' : 'w-[3.5rem] max-h-[3.7rem]'}`}  alt="HROGA" width={100} height={100} loading="eager" />
        </Link>

        <section className={`hidden md:flex gap-15 xl:gap-4 xl:w-[55%] pl-8 justify-between h-full py-2 rounded-full overflow-hidden transform duration-300 ${scrolled ? 'bg-white' : 'bg-[#f3f9d2] pr-4'}`}>
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((item, index) => (
              <Link key={index} href={item.href} className={`text-gray-700 hover:text-primary transition-colors ${pathname === item.href ? 'text-primary' : ''}`}>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigate('/signup')}
                  className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors"
                >
                  Join Us
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-500 border border-red-500 rounded-full hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            )}

            <button
              onClick={() => handleNavigate('/donate')}
              className="px-4 py-2 text-primary bg-primary/15 rounded-full hover:bg-primary/10 transition-colors"
            >
              Donate
            </button>
          </div>

        </section>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden flex h-11 w-11 items-center justify-center rounded-full bg-[#f3f9d2] shadow-md"
        >
          <span className="flex flex-col gap-1.5 px-4 py-1">
            <span className="block h-0.5 w-5 bg-gray-700" />
            <span className="block h-0.5 w-5 bg-gray-700" />
            <span className="block h-0.5 w-5 bg-gray-700" />
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[110] bg-black/40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <aside
          className={`h-[100vh] w-[80%] flex flex-col justify-between max-w-xs bg-white px-6 py-8 shadow-xl transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className=''>
            <div className="mb-8 flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-secondary" onClick={() => setIsMenuOpen(false)}>
                HROGA
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-700"
              >
                x
              </button>
            </div>

            <nav className="flex flex-col gap-5">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium text-gray-700 transition-colors pl-2 py-2 rounded-r-full ${pathname === item.href ? 'bg-primary text-white' : 'hover:text-primary'}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-8 flex flex-col gap-3 h-full max-h-[27rem] justify-end">
            {!isAuthenticated ? (
              <button
                onClick={() => handleNavigate('/signup')}
                className="w-full rounded-full bg-primary px-4 py-3 text-white transition-colors hover:bg-primary/80"
              >
                Join Us
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full rounded-full border border-red-500 px-4 py-3 text-red-500 transition-colors hover:bg-red-50"
              >
                Logout
              </button>
            )}

            <button
              onClick={() => handleNavigate('/donate')}
              className="w-full rounded-full bg-primary/15 px-4 py-3 text-primary transition-colors hover:bg-primary/10"
            >
              Donate
            </button>
          </div>
        </aside>
      </div>
    </header>
  );
}
