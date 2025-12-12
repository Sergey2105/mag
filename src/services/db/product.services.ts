import { IProductWithCategory } from "@/types/product.interface";
import axios from "axios";
//клиентская
class ProductServices {
    private URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
    //products and category
    getProduct = () => {
        return axios.get<IProductWithCategory[]>(this.URL);
    };
    //products and category
    getProductByID = (id: number) => {
        return axios.get<IProductWithCategory>(`${this.URL}/${id}`);
    };

    //products
    getProductBySearch(search: string) {
        return axios
            .get<{ products: IProductWithCategory[] }>(this.URL, {
                params: { search: search },
            })
            .then((response) => ({
                ...response,
                data: response.data.products || [],
            }));
    }
    //products and category
    getProductBySlug(slug: string) {
        return axios.get<IProductWithCategory[]>(`${this.URL}?slug=${slug}`);
    }

    //products and category
    getProductBySlugAndSearch(slug: string, search: string) {
        return axios.get<IProductWithCategory[]>(this.URL, {
            params: { category: slug, query: search },
        });
    }
}

export const productServices = new ProductServices();
