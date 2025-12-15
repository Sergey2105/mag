import FormAuth from "@/app/auth/form/FormAuth";

interface AuthPageProps {
    isLogin: boolean;
}

export function AuthPage({ isLogin }: AuthPageProps) {
    return (
        <div className="wrapper">
            <FormAuth isLogin={isLogin} />
        </div>
    );
}
