"use client";
import { getUserProfile } from "@/lib/db/getProfile";
import { getAccessToken } from "@/services/auth/auth-token.service";
import { authService } from "@/services/auth/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function ProfilePage(props: any) {
    const { profile } = props;
    const router = useRouter();

    // const { data, isLoading, isSuccess, isError } = useQuery({
    //     queryKey: ["userProfile"],
    //     queryFn: () => getUserProfile(),
    //     enabled: !!getAccessToken(),
    // });

    // console.log(data);

    const handleLogout = async () => {
        await authService.logout().then(() => {
            router.push("/");
        });
    };

    return (
        <div className="container mx-auto p-4">
            <span>{profile.name}</span>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Выйти
            </button>
        </div>
    );
}
