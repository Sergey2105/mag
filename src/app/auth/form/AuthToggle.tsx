import { Button } from "@/components/ui/button";
import { PUBLIC_PAGES } from "@/constants/routes";
import { useRouter } from "next/navigation";

export function AuthToggle({ isLogin }: { isLogin: boolean }) {
    const router = useRouter();

    return (
        <div className="mt-4 text-center text-sm text-muted-foreground">
            {isLogin ? (
                <p>
                    Нет аккаунта?
                    <Button type="button" variant="link" className="h-auto p-0 text-primary" onClick={() => router.push(PUBLIC_PAGES.REGISTER)}>
                        Регистрация
                    </Button>
                </p>
            ) : (
                <p>
                    Уже есть аккаунт?
                    <Button type="button" variant="link" className="h-auto p-0 text-primary" onClick={() => router.push(PUBLIC_PAGES.LOGIN)}>
                        Войти
                    </Button>
                </p>
            )}
        </div>
    );
}
