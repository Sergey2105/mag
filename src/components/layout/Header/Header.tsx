import { Menu } from "@/components/layout/Header/Menu";
import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <header className="px-6 py-4 h-[68px] flex items-center justify-between flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
                img
            </Link>

            <Menu />
        </header>
    );
}
