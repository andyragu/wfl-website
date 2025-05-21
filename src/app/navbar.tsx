import Link from "next/link";
import WFLFont from "../../.next/types/app/fonts/football";

export default function NavBar() {
    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-[#EEEEEE] border-b border-gray-300">
        <div className="text-xl text-[#A23131] font-bold font-sans">WFL Weekly</div>
        <ul className="flex gap-4 text-[#A23131] font-sans font-bold">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
        </ul>
        </nav>
    )
}