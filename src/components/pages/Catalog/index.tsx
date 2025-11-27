import Breadcrumbs from "@/components/Breadcrumbs";
import CatalogContent from "@/components/pages/Catalog/catalog-content";
import CatalogSkeleton from "@/components/pages/Catalog/catalog-skeleton";
import { Title } from "@/components/ui/title";
import { Suspense } from "react";

export default function Catalog() {
    return (
        <div className="wrapper mt-10">
            <Breadcrumbs className="mt-16" />
            <Title text="Каталог" size="lg" className="mt-6" />
            <Suspense fallback={<CatalogSkeleton />}>
                <CatalogContent />
            </Suspense>
        </div>
    );
}
