import { Suspense } from "react";
import TokenHandler from "@/untils/TokenHandler";
import ProfilePage from "@/components/pages/ProfilePage";
import { getUserProfile } from "@/lib/db/getProfile";

export default async function Profile() {
    const profile = getUserProfile();

    return (
        <>
            <Suspense fallback={null}>
                <TokenHandler />
            </Suspense>
            <ProfilePage profile={[]} />
        </>
    );
}
