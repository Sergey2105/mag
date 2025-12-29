import CatalogContent from "@/app/(public)/catalog/CatalogContent";
import CatalogSkeleton from "@/app/(public)/catalog/CatalogSkeleton";
import BreadcrumbsServer from "@/components/Breadcrumbs/BreadcrumbsServer";
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
