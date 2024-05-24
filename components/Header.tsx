import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
<header className="navbar z-30 sticky top-0 bg-Background">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-md dropdown-content mt-2 z-[1] p-2 shadow bg-base-100 rounded-box w-[280px]">
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about">
            About
          </Link>
        </li>
        <li>
            <Link href={'/contact'}>
                Contact
            </Link>
        </li>
        <li>
            <Link href={'/blog'}>
                Blog
            </Link>
        </li>
      </ul>
    </div>
    <Link href="/">
      <Image src="/logo.svg" alt="Logo" width={176} height={40} className="min-w-[176px] ml-6"/>
    </Link>
  </div>
  <div className="navbar-end hidden md:flex">
    <ul className="menu menu-horizontal px-1">
    <li>
          <Link href="/" className=" outline-none transition-all hover:text-transparent hover:bg-gradient-to-r hover:from-Primary hover:to-Accent bg-Text bg-clip-text">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className=" outline-none transition-all hover:text-transparent hover:bg-gradient-to-r hover:from-Primary hover:to-Accent bg-Text bg-clip-text">
            About
          </Link>
        </li>
        <li>
            <Link href={'/contact'} className=" outline-none transition-all hover:text-transparent hover:bg-gradient-to-r hover:from-Primary hover:to-Accent bg-Text bg-clip-text">
                Contact
            </Link>
        </li>
        <li>
            <Link href={'/blog'} className=" outline-none transition-all  hover:text-transparent hover:bg-gradient-to-r hover:from-Primary hover:to-Accent bg-Text bg-clip-text">
                Blog
            </Link>
        </li>
    </ul>
  </div>

</header>
  )
}

export default Header