import ProductCardControls from "@/components/ProductCardControls";
import { cn } from "@/lib/utils";

export default async function ProductInfo(props: any) {
    const { name, price, description, className } = props;

    return (
        <div className={cn("", className)}>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{name}</h2>
            <div className="flex flex-col gap-1 py-6 border-b">
                <p className="text-[18px] font-normal text-neutral-400">Статус:</p>
                <p className="text-[16px] font-normal">Под заказ</p>
            </div>
            <div className="pt-6">
                <p className="text-[32px] font-semibold">{price}</p>
                <ProductCardControls />
            </div>
            <div className="py-6">
                <p className="text-[18px] font-normal text-neutral-400">Описание:</p>
                <p className="text-[16px] font-normal">{description}</p>
            </div>
        </div>
    );
}
