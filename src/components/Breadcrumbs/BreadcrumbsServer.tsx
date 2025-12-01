import BreadcrumbsClient from "@/components/Breadcrumbs/BreadcrumbsClient";
import { getCategories } from "@/lib/db/getCategories";

interface BreadcrumbsServerProps {
    className?: string;
    lastLabel?: string;
}
export default async function BreadcrumbsServer(props: BreadcrumbsServerProps) {
    const { className, lastLabel } = props;
    const categories = await getCategories();

    return <BreadcrumbsClient className={className} lastLabel={lastLabel} categories={categories} />;
}
