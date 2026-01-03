import { Header } from "@/components/layout/Header/Header";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {children}
        </div>
    );
}
