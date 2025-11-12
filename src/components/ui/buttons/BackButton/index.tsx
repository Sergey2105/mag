"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton(props: { children?: React.ReactNode }) {
    const { children } = props;
    const router = useRouter();

    return (
        <Button variant="outline" size="lg" onClick={() => router.back()}>
            <ArrowLeft size={18} className="text-black dark:text-white" />
            {children}
        </Button>
    );
}
