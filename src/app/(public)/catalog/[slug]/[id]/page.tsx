import Product from "@/components/pages/Product";

interface Props {
    params: { id: string };
}

export default async function CatalogProductPage({ params }: Props) {
    const { id } = await params;

    return <Product id={id} />;
}
