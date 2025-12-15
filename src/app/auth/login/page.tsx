import type { Metadata } from "next";
import { AuthPage } from "../AuthPage";

export const metadata: Metadata = {
    title: "Вход в личный кабинет",
};

export default function LoginPage() {
    return <AuthPage isLogin />;
}
