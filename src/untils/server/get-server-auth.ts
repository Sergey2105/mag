"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { transformUserToState, TUserDataState } from "../transform-user-to-state";
import { getNewTokensByRefresh } from "@/server-actions/middlewares/utils/get-new-tokens-by-refresh";
import { AuthToken, ITokenInside } from "@/services/auth/auth.types";

export async function getServerAuth(): Promise<TUserDataState | null> {
    const JWT_SECRET = process.env.JWT_SECRET;
    const cookie = await cookies();

    let accessToken = cookie.get(AuthToken.ACCESS_TOKEN)?.value;
    const refreshToken = cookie.get(AuthToken.REFRESH_TOKEN)?.value;

    if (!refreshToken) return null;

    if (!accessToken) {
        try {
            const data = await getNewTokensByRefresh(refreshToken);
            accessToken = data.accessToken;
        } catch (error) {
            return null;
        }
    }

    try {
        const { payload }: { payload: ITokenInside } = await jwtVerify(accessToken, new TextEncoder().encode(`${JWT_SECRET}`));

        if (!payload) return null;

        return transformUserToState(payload);
    } catch (error) {
        return null;
    }
}
