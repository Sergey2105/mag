import Link from "next/link";
import Image from "next/image";
import { PUBLIC_PAGES } from "@/constants/routes";
import Logo from "@/shared/icon/Logo.svg";
import Harry from "@/shared/img/harry.png";
import FormAuth from "@/app/(auth)/form/FormAuth";

interface AuthPageProps {
    isLogin: boolean;
}

export function AuthPage({ isLogin }: AuthPageProps) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href={PUBLIC_PAGES.HOME} className="flex items-center gap-3">
                        <Logo className="text-black dark:text-white" />
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full">
                        <FormAuth isLogin={isLogin} />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src={Harry}
                    alt="Image"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
