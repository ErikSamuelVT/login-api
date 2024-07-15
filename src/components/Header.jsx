"use client"
import Image from "next/image";

import Logo from '../assets/logo.png'
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Header() {
  const path = usePathname()
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
          <Image className="w-14 h-14 rounded-full" src={Logo} alt="logo" priority={true} />
          <span className="ml-3 text-xl">LOGIN API</span>
        </a>

        <nav className="md:ml-auto flex gap-3  flex-wrap items-center text-base justify-center">
          <Link className={`cursor-pointer hover:underline ${path === '/' ? 'text-indigo-500 font-semibold' : 'text-gray-600'}`} href={'/'}>Home</Link>
          <Link className={`hover:text-indigo-500 cursor-pointer hover:underline ${path === '/dashboard' ? 'text-indigo-500 font-semibold' : 'text-gray-600'}`} href={'/dashboard'}>Dashboard</Link>
        </nav>
      </div>
    </header>
  )
}
