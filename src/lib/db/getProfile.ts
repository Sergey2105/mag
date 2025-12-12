import { axiosWithAuth } from "@/app/api/api.interseptor";

export async function getUserProfile() {
    try {
        const res = await axiosWithAuth.get("http://localhost:5000/user/profile");
        return res.data;
    } catch (error: any) {
        console.error("Ошибка получения профиля", error);
        throw error;
    }
}
