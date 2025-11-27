import CatalogItem from "@/components/CtalogItem";
import { Category } from "@prisma/client";

interface CatalogListProps {
    list: Category[];
}

export default function CatalogList(props: CatalogListProps) {
    const { list } = props;
    return (
        <>
            {list.map((cat: any) => (
                <CatalogItem key={cat.id} name={cat.name} imageURL={cat.imageURL} slug={cat.slug} />
            ))}
        </>
    );
}
