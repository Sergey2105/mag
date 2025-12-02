"use client";

import { Menu } from "@/components/layout/Header/Menu";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../shared/icon/Logo.svg";
import { InputSearch } from "@/components/inputs/InputSearch";
import { productServices } from "@/services/product.services";
import { IProductWithCategory } from "@/types/product.interface";
import { LinkList } from "@/components/layout/Header/LinkList";
import { MenuMobile } from "@/components/layout/Header/MenuMobile";
import { SearchDialog } from "@/components/SearchDialog";

export function Header() {
    return (
        <header className="py-4 border-b border-[#B5B5B5] ">
            <div className="wrapper flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Logo className="text-black dark:text-white" />
                </Link>
                <div className="hidden lg:flex gap-6 items-center">
                    <SearchDialog<IProductWithCategory>
                        onSearch={(query) => productServices.getProductBySearch(query)}
                        renderItem={(product) => (
                            <>
                                <Image className="rounded-sm h-8 w-8" width={32} height={32} src={product.imageURL} alt={product.name} />
                                <span>{product.name}</span>
                            </>
                        )}
                        getItemKey={(product) => product.id}
                        getItemHref={(product) => `/catalog/${product.category.slug}/${product.id}`}
                    />
                    <LinkList className="flex items-center gap-12" />
                    <Menu />
                </div>
                <MenuMobile />
            </div>
        </header>
    );
}
