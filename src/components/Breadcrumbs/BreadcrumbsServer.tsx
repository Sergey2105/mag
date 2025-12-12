import BreadcrumbsClient from "@/components/Breadcrumbs/BreadcrumbsClient";
import { getCategoriesServer } from "@/lib/db/getCategories";

interface BreadcrumbsServerProps {
    className?: string;
    lastLabel?: string;
}
export default async function BreadcrumbsServer(props: BreadcrumbsServerProps) {
    const { className, lastLabel } = props;
    const categories = await getCategoriesServer();

    return <BreadcrumbsClient className={className} lastLabel={lastLabel} categories={categories} />;
}
