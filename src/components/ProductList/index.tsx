import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

interface Props {
    items: any[];
    className?: string;
    listClassName?: string;
}

export default function ProductList(props: Props) {
    const { items, className, listClassName } = props;
    return (
        <div className={cn("grid gap-3 mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4", listClassName)}>
            {items.map((product, i) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    imageURL={product.imageURL}
                    price={product.price}
                    category={product.category.name}
                    slug={product.category.slug}
                />
            ))}
        </div>
    );
}
