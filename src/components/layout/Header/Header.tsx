"use client";

import { Menu } from "@/components/layout/Header/Menu";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../shared/icon/Logo.svg";
import { productServices } from "@/services/db/product.services";
import { LinkList } from "@/components/layout/Header/LinkList";
import { MenuMobile } from "@/components/layout/Header/MenuMobile";
import { SearchDialog } from "@/components/SearchDialog";
import { IProduct } from "@/types/product.interface";
import { categoryServices } from "@/services/db/category.services";
import { ICategory } from "@/types/category.interface";

export function Header() {
    return (
        <header className="py-4 border-b border-[#B5B5B5] ">
            <div className="wrapper flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Logo className="text-black dark:text-white" />
                </Link>
                <div className="flex items-center gap-6">
                    <LinkList className="lg:flex items-center gap-12 hidden" />
                    <div className="flex items-center gap-2">
                        <SearchDialog<IProduct, ICategory>
                            onSearch={(query) => productServices.getProductBySearch(query)}
                            renderItem={(product) => (
                                <>
                                    <Image className="rounded-sm h-8 w-8" width={32} height={32} src={product.images[0]} alt={product.name} />
                                    <span>{product.name}</span>
                                </>
                            )}
                            getItemKey={(product) => product.id}
                            getItemHref={(product) => `/catalog/${product.category.slug}/${product.id}`}
                            searchLabel="Найденные товары"
                            placeholder="Поиск товаров..."
                            initialData={{
                                onSearch: () => categoryServices.getCategory(),
                                renderItem: (category) => (
                                    <>
                                        <Image className="rounded-sm h-8 w-8" width={32} height={32} src={category.images} alt={category.name} />
                                        <span className="font-medium">{category.name}</span>
                                    </>
                                ),
                                getItemKey: (category) => category.id,
                                getItemHref: (category) => `/catalog/${category.slug}`,
                                searchLabel: "Категории",
                            }}
                        />
                        <Menu />
                        <MenuMobile className="lg:hidden" />
                    </div>
                </div>
            </div>
        </header>
    );
}
