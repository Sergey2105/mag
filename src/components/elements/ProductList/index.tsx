import ProductCard from "@/components/elements/ProductCard";
import ProductCardSkeleton from "@/components/elements/ProductCard/card-skeleton";
import { cn } from "@/lib/utils";
interface Props {
    items: any[];
    className?: string;
    listClassName?: string;
}

export default function ProductList(props: Props) {
    const { items, className, listClassName } = props;
    return (
        <>
            {items.length !== 0 ? (
                <div className={cn("grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4", listClassName)}>
                    {items.map((product, i) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            images={product.images}
                            price={product.price}
                            category={product.category.name}
                            slug={product.category.slug}
                        />
                    ))}
                </div>
            ) : (
                <div>ПУСТО</div>
            )}
        </>
    );
}
