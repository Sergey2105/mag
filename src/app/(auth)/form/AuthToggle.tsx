import { FieldDescription } from "@/components/ui/field";
import { PUBLIC_PAGES } from "@/constants/routes";
import Link from "next/link";

export function AuthToggle({ isLogin }: { isLogin: boolean }) {
    return (
        <FieldDescription className="text-center">
            {isLogin ? (
                <>
                    Нет аккаунта?{" "}
                    <Link className="underline underline-offset-4" href={PUBLIC_PAGES.REGISTER}>
                        Регистрация
                    </Link>
                </>
            ) : (
                <>
                    Уже есть аккаунт?{" "}
                    <Link className="underline underline-offset-4" href={PUBLIC_PAGES.LOGIN}>
                        Войти
                    </Link>
                </>
            )}
        </FieldDescription>
    );
}
