"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Yandex from "@/shared/icon/Yandex.svg";
import Google from "@/shared/icon/Google.svg";
import { useOAuthPopup } from "@/hooks/useOAuthPopup";

interface SocialProps {
    className?: string;
}

export default function Social(props: SocialProps) {
    const { className } = props;
    const openPopup = useOAuthPopup();

    return (
        <div className={cn("", className)}>
            <Button variant="outline" className="w-full" onClick={() => openPopup(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`)}>
                <Google className="size-5" />
                Войти с Google
            </Button>
            <Button variant="outline" className="w-full" onClick={() => openPopup(`${process.env.NEXT_PUBLIC_API_URL}/auth/yandex`)}>
                <Yandex className="size-5" />
                Войти с Яндекс ID
            </Button>
        </div>
    );
}
