import BreadcrumbsServer from "@/components/Breadcrumbs/BreadcrumbsServer";
import CatalogContent from "@/components/pages/CatalogPage/catalogContent";
import CatalogSkeleton from "@/components/pages/CatalogPage/catalogSkeleton";
import { Title } from "@/components/ui/title";
import { Suspense } from "react";

export default function CatalogPage() {
    return (
        <div className="wrapper mt-10">
            <BreadcrumbsServer />
            <Title text="Каталог" size="lg" className="mt-6" />
            <Suspense fallback={<CatalogSkeleton />}>
                <CatalogContent />
            </Suspense>
        </div>
    );
}
