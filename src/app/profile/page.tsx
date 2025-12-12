import { Suspense } from "react";
import TokenHandler from "@/untils/TokenHandler";
import ProfilePage from "@/components/pages/ProfilePage";

export default async function Profile() {
    return (
        <>
            <Suspense fallback={null}>
                <TokenHandler />
            </Suspense>
            <ProfilePage />
        </>
    );
}
