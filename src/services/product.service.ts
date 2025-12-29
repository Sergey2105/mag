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

    async getProductByID(id: number) {
        return axiosClassic.get<IProduct[]>(`${this._BASE_URL}/${id}`);
    }

    async getProductBySearch(search: string) {
        return axiosClassic
            .get<{ products: IProduct[] }>(this._BASE_URL, {
                params: { search: search },
            })
            .then((response) => ({
                ...response,
                data: response.data.products || [],
            }));
    }

    async getProductBySlug(slug: string) {
        return axiosClassic.get<IProductsPagination>(`${this._BASE_URL}/by-slug/${slug}`);
    }
    async getProductBySlugAndSearch(slug: string, search: string) {
        return axiosClassic.get<IProductsPagination>(this._BASE_URL, {
            params: { slug: slug, query: search },
        });
    }
}

export default new ProductService();
