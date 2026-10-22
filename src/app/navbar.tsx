import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-[#ffffff] border-b border-gray-300">
        <Link href="/">
            <Image src="/logo-nav.png" alt="WFL" width={295} height={388} className="h-10 w-auto" priority />
        </Link>
        <ul className="flex gap-4 items-center text-[#CC0000] font-sans font-bold [&_a:hover]:underline">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/archives">Archives</Link></li>
            <li>
                <Link href="/write" className="px-3 py-1 rounded bg-[#CC0000] text-white">Write</Link>
            </li>
        </ul>
        {/* <img src={logo} alt="WFL Logo" /> */}
        </nav>
    )
}