import CatalogItem from "@/components/elements/CtalogItem";

interface CatalogListProps {
    list: any[];
}

export default function CatalogList(props: CatalogListProps) {
    const { list } = props;
    console.log(list);
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
