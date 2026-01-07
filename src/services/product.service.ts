import { axiosClassic } from "@/app/api/axios";
import { IProduct, IProductsPagination } from "@/types/product.interface";

class ProductService {
    private _BASE_URL = "/products";

    async fetchAll() {
        return axiosClassic.get<IProductsPagination>(this._BASE_URL);
    }

    async fetchAllWithoutPagination() {
        return axiosClassic.get<IProduct[]>(`${this._BASE_URL}/without-pagination`);
    }

    // async getProductByID(id: number) {
    //     return axiosClassic.get<IProduct[]>(`${this._BASE_URL}/${id}`);
    // }

    async getProductBySearch(search: string): Promise<IProduct[]> {
        const response = await axiosClassic.get<{ products: IProduct[] }>(this._BASE_URL, {
            params: { search },
        });
        return response.data.products || [];
    }

    async getProductBySlug(
        slug: string,
        options?: {
            search?: string;
            minPrice?: number;
            maxPrice?: number;
            page?: number;
            limit?: number;
            sortBy?: "name" | "price" | "createdAt";
            sortOrder?: "asc" | "desc";
        },
    ) {
        const { search, minPrice, maxPrice, page = 1, limit = 20, sortBy = "createdAt", sortOrder = "desc" } = options || {};

        return axiosClassic.get<IProductsPagination>(`${this._BASE_URL}/by-slug/${slug}`, {
            params: {
                search,
                page,
                minPrice,
                maxPrice,
                limit,
                sortBy,
                sortOrder,
            },
        });
    }

    // async getProductBySlugAndSearch(slug: string, search: string) {
    //     return axiosClassic.get<IProductsPagination>(this._BASE_URL, {
    //         params: { slug: slug, query: search },
    //     });
    // }
}

export default new ProductService();
