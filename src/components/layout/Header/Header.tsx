import { Menu } from "@/components/layout/Header/Menu";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../shared/icon/Logo.svg";

export function Header() {
    return (
        <header className="py-4 border-b border-[#B5B5B5] ">
            <div className="wrapper flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Logo className="text-black dark:text-white" />
                </Link>

                <Menu />
            </div>
        </header>
    );
}
