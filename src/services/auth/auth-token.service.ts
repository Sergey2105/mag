import Cookies from "js-cookie";

export enum EnumTokens {
    "ACCESS_TOKEN" = "accessToken",
    "REFRESH_TOKEN" = "refreshToken",
}

export const getAccessToken = () => {
    return Cookies.get(EnumTokens.ACCESS_TOKEN);
};

export const getRefreshToken = (): string | undefined => {
    return Cookies.get(EnumTokens.REFRESH_TOKEN);
};

export const saveTokenStorage = (accessToken: string, refreshToken?: string) => {
    const cookieOptions: Cookies.CookieAttributes = {
        sameSite: "strict",
        expires: 1,
        ...(process.env.APP_DOMAIN && { domain: process.env.APP_DOMAIN }),
    };

    Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, cookieOptions);

    if (refreshToken) {
        Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
            ...cookieOptions,
            expires: 7,
        });
    }
};

export const removeFromStorage = () => {
    const cookieOptions: Cookies.CookieAttributes = {
        ...(process.env.APP_DOMAIN && { domain: process.env.APP_DOMAIN }),
    };

    Cookies.remove(EnumTokens.ACCESS_TOKEN, cookieOptions);
    Cookies.remove(EnumTokens.REFRESH_TOKEN, cookieOptions);
};
