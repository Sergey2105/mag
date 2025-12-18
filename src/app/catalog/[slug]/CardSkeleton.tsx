import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    className?: string;
}

export default function ProductCardSkeleton(props: ProductCardProps) {
    const { className } = props;
    return (
        <div className="relative cursor-pointer overflow-hidden group rounded-2xl border border-amber-500 flex flex-col w-full pt-3 pb-6 px-3 lg:px-6 lg:pt-6 lg:pb-7 2xl:px-4 2xl:pt-4 2xl:pb-4">
            <div className="relative w-full h-full aspect-square">
                <Skeleton className="w-full h-full rounded-xl" />
            </div>

            <div className="relative z-20 flex flex-col justify-end h-[110px] mt-2">
                <Skeleton className="h-[21px] w-24" />
                <div className="flex flex-col md:flex-row justify-between gap-2 mt-1">
                    <Skeleton className="h-6 w-full flex-70" />
                    <Skeleton className="h-6 w-full self-end flex-30" />
                </div>
                <Skeleton className="h-9 w-full mt-2.5 rounded-xl" />
            </div>
        </div>
    );
}
