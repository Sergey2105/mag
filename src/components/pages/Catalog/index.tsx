import BreadcrumbsServer from "@/components/Breadcrumbs/BreadcrumbsServer";
import CatalogContent from "@/components/pages/Catalog/catalogContent";
import CatalogSkeleton from "@/components/pages/Catalog/catalogSkeleton";
import { Title } from "@/components/ui/title";
import { Suspense } from "react";

export default function Catalog() {
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
