import { AuthPageWrapper } from "@/app/auth/AuthPageWrapper";
import FormAuth from "@/app/auth/form/FormAuth";

interface Props {
    isLogin: boolean;
}

export function AuthPage({ isLogin }: Props) {
    return (
        <AuthPageWrapper>
            <FormAuth isLogin={isLogin} />
        </AuthPageWrapper>
    );
}
