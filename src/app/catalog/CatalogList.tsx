import CatalogItem from "@/app/catalog/CtalogItem";
import { ICategory } from "@/types/category.interface";

interface CatalogListProps {
    list: ICategory[];
}

export default function CatalogList(props: CatalogListProps) {
    const { list } = props;

    return (
        <>
            {list && list.length !== 0 ? (
                <>
                    {list.map((cat: any) => (
                        <CatalogItem key={cat.id} name={cat.name} images={cat.images} slug={cat.slug} />
                    ))}
                </>
            ) : (
                <div>Empty</div>
            )}
        </>
    );
}
