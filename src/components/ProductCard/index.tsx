import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { Badge } from "@/components/ui/badge";

export default function ProductCard(props: any) {
    const { id, name, price, imageURL, category, className } = props;
    return (
        <Link href="/" id={id} className="relative cursor-pointer group rounded-2xl border border-amber-500 flex flex-col w-full pt-4 pb-6 px-4 md:px-6">
            <Badge className="absolute z-20">Предзаказ</Badge>
            <div>
                <div className="relative w-full h-full aspect-square">
                    <Image src={imageURL} alt={name} fill className="object-contain transition-transform duration-300 group-hover:scale-110" />
                </div>
            </div>

            <div className="relative z-20 flex flex-col justify-end h-[110px]">
                <span className="text-[14px] text-[#2f80ed] font-regular">{category}</span>
                <div className="flex justify-between items-end gap-2">
                    <span className="text-[20px] font-bold">{name}</span>
                    <span className="text-[20px] font-bold">{price}</span>
                </div>
                <div className="mt-2.5">
                    <Button className="w-full">Купить</Button>
                </div>
            </div>
        </Link>
    );
}
