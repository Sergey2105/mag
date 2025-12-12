"use client";
import { authService } from "@/services/auth/auth.service";
import { useRouter } from "next/navigation";

export default function ProfilePage(props: any) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await authService.logout().then(() => {
                router.push("/");
            });
        } catch (error) {
            console.error("Ошибка выхода:", error);
        }
    };
    return (
        <div className="container mx-auto p-4">
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Выйти
            </button>
        </div>
    );
}
