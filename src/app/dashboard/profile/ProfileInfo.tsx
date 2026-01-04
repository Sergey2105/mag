"use client";
import { PUBLIC_PAGES } from "@/constants/routes";
import { useProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";
import authService from "@/services/auth/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function ProfileInfo() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { isLoading, refetch, user } = useProfile();

    console.log(user);

    const [isPending, startTransition] = useTransition();

    const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
        mutationKey: ["logout"],
        mutationFn: () => authService.logout(),
        onSuccess() {
            // Очищаем кэш React Query при выходе
            // Инвалидируем все запросы профиля - это заставит компоненты перерендериться
            // и перепроверить токен из cookies
            queryClient.removeQueries({ queryKey: ["profile"] });
            queryClient.removeQueries({ queryKey: ["cart"] });
            queryClient.invalidateQueries({ queryKey: ["profile"] });

            startTransition(() => {
                router.push(PUBLIC_PAGES.LOGIN);
            });
        },
    });

    const isLogoutLoading = isLogoutPending || isPending;

    if (isLoading)
        return (
            <div className="mt-10">
                <LoaderCircleIcon className="animate-spin" />
            </div>
        );

    return (
        <div className="wrapper mt-10">
            {user.avatarPath && <Image src={user.avatarPath} alt="Avatar" width={70} height={70} className="rounded-xl mb-6" />}
            <h2 className="text-2xl font-bold">Hi, {user.name || "Anonym"}</h2>
            <br />
            <p className="text-lg">
                Ваш email: {user.email} <i>({user.verificationToken ? "Requires email verification" : "Verified"})</i>
            </p>
            <br />
            <p>Rights: {user.rights?.join(", ")}</p>
            <br />
            <button onClick={() => mutateLogout()} disabled={isLogoutLoading} className={cn("mt-2 bg-primary text-white px-4 py-2 rounded-md", isLogoutLoading && "bg-gray-500")}>
                {isLogoutLoading ? <LoaderCircleIcon className="animate-spin" /> : "Logout"}
            </button>
        </div>
    );
}
