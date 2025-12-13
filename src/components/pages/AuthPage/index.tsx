import FormAuth from "@/app/auth/form/FormAuth";

export default async function AuthPage(props: any) {
    return (
        <div className="wrapper min-h-[calc(100vh-69px)] flex items-center justify-center">
            <FormAuth className="flex-1" />
        </div>
    );
}
