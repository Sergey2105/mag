import { AuthToken } from "@/services/auth/auth.types";
import Cookies from "js-cookie";

// class AuthTokenService {
//     getAccessToken() {
//         const accessToken = Cookies.get(AuthToken.ACCESS_TOKEN);
//         return accessToken || null;
//     }

//     saveAccessToken(accessToken: string) {
//         Cookies.set(AuthToken.ACCESS_TOKEN, accessToken, {
//             domain: "localhost",
//             sameSite: "strict",
//             expires: 1,
//         });
//     }

//     removeAccessToken() {
//         Cookies.remove(AuthToken.ACCESS_TOKEN);
//     }
// }

// export default new AuthTokenService();

export const AuthTokenService = () => {
    const accessToken = Cookies.get(AuthToken.ACCESS_TOKEN);
    return accessToken || null;
};

export const saveAccessToken = (accessToken: string) => {
    Cookies.set(AuthToken.ACCESS_TOKEN, accessToken, {
        domain: "localhost",
        sameSite: "strict",
        expires: 1,
    });
};

export const removeAccessToken = () => {
    Cookies.remove(AuthToken.ACCESS_TOKEN);
};
