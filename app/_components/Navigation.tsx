import Link from 'next/link'


export default function Navigation() {
  return (
    <nav className='text-xl z-10'>
    <ul className="flex gap-16 items-center">
        <li >
            <Link href="/cabins" className="hover:text-accent-400 transition-colors">Cabins</Link>
        </li >
        <li >
            <Link href="/about" className="hover:text-accent-400 transition-colors">About</Link>
        </li>
        <li>
            <Link href="/account" className="hover:text-accent-400 transition-colors">Account</Link>
        </li>
    </ul>
    </nav>
  )
}
