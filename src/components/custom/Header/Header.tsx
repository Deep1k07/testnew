import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
import LogoutForm from '../Logout/Logout';

const Header = async() => {
  const session= await auth();

  let headerLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ] 

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">Tnv</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          {
            headerLinks.length>0 && headerLinks?.map((link,index) =>
              <a key={index} className="mr-5 hover:text-gray-900">{link?.label}</a>
            )
          }
        </nav>
        {session?.user ? (
          <LogoutForm/>
        ) : (
          <div className="flex gap-2">
            <Link href="/register">
              <Button>Register</Button>
            </Link>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header
