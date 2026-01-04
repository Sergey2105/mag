import { AuthTokenService } from "@/services/auth/auth-token.service";
import userService from "@/services/user.service";
import { transformUserToState } from "@/untils/transform-user-to-state";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export function useProfile() {
    const hasToken = Boolean(AuthTokenService());

    const {
        data,
        isLoading,
        isError,
        refetch: refetchProfile,
    } = useQuery({
        queryKey: ["profile", hasToken],
        queryFn: () => userService.fetchProfile(),
        refetchInterval: 1800000, // 30 minutes
        retry: false, // не повторять в случае ошибки - interceptor сам обработает обновление токена
        enabled: hasToken,
    });

    const profile = data?.data;

    const userState = profile ? transformUserToState(profile) : null;

    const isLoggedIn = useMemo(() => {
        if (profile) return true;
        if (!hasToken) return false;
        return false;
    }, [profile, hasToken]);

    return {
        isLoading: hasToken ? isLoading : false,
        refetch: refetchProfile,
        user: {
            ...profile,
            ...userState,
            isLoggedIn,
        },
    };
}
