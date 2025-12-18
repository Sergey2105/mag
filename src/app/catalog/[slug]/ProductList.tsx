import ProductItem from "@/app/catalog/[slug]/ProductItem";
import { cn } from "@/lib/utils";
import { IProduct } from "@/types/product.interface";

interface Props {
    items: IProduct[];
    className?: string;
}

export default function ProductList(props: Props) {
    const { items, className } = props;

    return (
        <>
            {items.length !== 0 ? (
                <div className={cn("grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4", className)}>
                    {items.map((product, i) => (
                        <ProductItem
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            images={product.images}
                            price={product.price}
                            category={product.category.name}
                            slug={product.category.slug}
                            discountPrice={product.discountPrice}
                            isHasSecondDiscount={product.isHasSecondDiscount}
                        />
                    ))}
                </div>
            ) : (
                <div>ПУСТО</div>
            )}
        </>
    );
}
