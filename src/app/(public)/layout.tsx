import { Header } from "@/components/layout/Header/Header";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />

            <div className="">{children}</div>
        </div>
    );
}
