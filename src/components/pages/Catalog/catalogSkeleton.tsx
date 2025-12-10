import { Skeleton } from "@/components/ui/skeleton";

export default function CatalogSkeleton() {
    return (
        <div className="grid gap-6 mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-3 rounded-2xl  bg-[#EDEDED] dark:bg-[rgba(47,128,237,0.5)] px-6 py-4 h-full w-full">
                    <Skeleton className="w-[clamp(120px,14vw,150px)] h-[clamp(120px,14vw,150px)] rounded-lg" />
                    <div className="w-full space-y-2">
                        <Skeleton className="text-[16px] text-center font-semibold leading-5 h-[2.8em] overflow-hidden line-clamp-2" />
                    </div>
                </div>
            ))}
        </div>
    );
}
