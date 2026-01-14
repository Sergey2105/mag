import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CatalogSkeleton() {
    return (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
                <Card className="group gap-3 px-6 py-4" key={i}>
                    <CardContent className="px-0 py-0 flex items-center justify-center">
                        <Skeleton className="w-[clamp(120px,14vw,150px)] h-[clamp(120px,14vw,150px)] rounded-lg" />
                    </CardContent>
                    <CardFooter className="px-0 py-0">
                        <div className="w-full flex flex-col items-center">
                            <Skeleton className="text-[16px] text-center font-semibold leading-5 h-[2.8em] overflow-hidden line-clamp-2" />{" "}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
