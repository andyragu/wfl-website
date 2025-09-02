import Link from "next/link";
import logo from './media/logo.svg';

export default function NavBar() {
    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-[#ffffff] border-b border-gray-300">
        <div className="text-xl text-[#A23131] font-bold font-sans"><Link href="/">WFL</Link></div>
        <ul className="flex gap-4 text-[#A23131] font-sans font-bold">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/archives">Archives</Link></li>
        </ul>
        {/* <img src={logo} alt="WFL Logo" /> */}
        </nav>
    )
}