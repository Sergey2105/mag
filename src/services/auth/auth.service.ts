import { IUser } from "@/types/user.types";
import { axiosClassic } from "@/app/api/axios";
import { ISimpleCartItem } from "@/types/cart.types";
import { removeAccessToken, saveAccessToken } from "@/services/auth/auth-token.service";
import { IFormData } from "@/services/auth/auth.types";

interface IAuthResponse {
    user: IUser;
    accessToken: string;
}

class AuthService {
    async main(type: "login" | "register", data: IFormData, recaptchaToken?: string | null, cartItems?: ISimpleCartItem[]) {
        const response = await axiosClassic.post<IAuthResponse>(`/auth/${type}`, cartItems?.length ? { ...data, cartItems } : data, {
            headers: {
                recaptcha: recaptchaToken,
            },
        });

        if (response.data.accessToken) {
            saveAccessToken(response.data.accessToken);
        }

        return response;
    }

    async getNewTokens() {
        const response = await axiosClassic.post<IAuthResponse>("/auth/access-token");

        if (response.data.accessToken) saveAccessToken(response.data.accessToken);

        return response;
    }

    async getNewTokensByRefresh(refreshToken: string) {
        const response = await axiosClassic.post<IAuthResponse>(
            "/auth/access-token",
            {},
            {
                headers: {
                    Cookie: `refreshToken=${refreshToken}`,
                },
            },
        );

        return response.data;
    }

    async logout() {
        const response = await axiosClassic.post<boolean>("/auth/logout");

        if (response.data) removeAccessToken();

        return response;
    }
}

export default new AuthService();
