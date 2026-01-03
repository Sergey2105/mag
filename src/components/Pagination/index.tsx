"use client";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface PaginationData {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface ProductPaginationProps {
    pagination: PaginationData;
    className?: string;
}

export function ProductPagination(props: ProductPaginationProps) {
    const { pagination, className } = props;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { page, totalPages } = pagination;

    useEffect(() => {
        if (page > totalPages && totalPages > 0) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", "1");
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [page, totalPages, pathname, searchParams, router]);

    if (totalPages <= 1) {
        return null;
    }

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
            range.push(i);
        }

        if (page - delta > 2) {
            rangeWithDots.push(1, "ellipsis-start");
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (page + delta < totalPages - 1) {
            rangeWithDots.push("ellipsis-end", totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    const visiblePages = getVisiblePages();

    return (
        <Pagination className={cn("", className)}>
            <PaginationContent>
                <PaginationItem>
                    {page > 1 ? <PaginationPrevious href={createPageURL(page - 1)} /> : <PaginationPrevious href="#" className="pointer-events-none opacity-50" />}
                </PaginationItem>

                {visiblePages.map((pageNumber, index) => {
                    if (pageNumber === "ellipsis-start" || pageNumber === "ellipsis-end") {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={pageNumber}>
                            <PaginationLink href={createPageURL(pageNumber as number)} isActive={pageNumber === page}>
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    {page < totalPages ? <PaginationNext href={createPageURL(page + 1)} /> : <PaginationNext href="#" className="pointer-events-none opacity-50" />}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
