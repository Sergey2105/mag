import ProfilePage from "@/components/pages/ProfilePage";
import TokenHandler from "@/untils/TokenHandler";
import { Suspense } from "react";

export default async function Profile() {
    // const profile = await getUserProfile();
    return (
        <>
            <Suspense fallback={null}>
                <TokenHandler />
            </Suspense>
            <ProfilePage />
        </>
    );
}
