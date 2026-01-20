// const { data: favorites } = useQuery({
//     queryKey: ["favorites"],
//     queryFn: favoritesService.getFavorites,
// });

// const favoriteIds = new Set(favorites?.map((f) => f.productId));

import type { Metadata } from "next";
import BreadcrumbsServer from "@/components/Breadcrumbs/BreadcrumbsServer";
import { Title } from "@/components/ui/title";
import { getProductWithoutPaginationServer } from "@/lib/db/getProducts";

export const metadata: Metadata = {
    title: "Избранное",
};

export default async function CartPage() {
    const products = await getProductWithoutPaginationServer();

    console.log(products);

    return (
        <div className="wrapper mt-10">
            <BreadcrumbsServer lastLabel="Избранное" />
            <Title text="Избранное" size="lg" className="mt-6" />
            <div className="mt-10"></div>
        </div>
    );
}
