import { IProductWithCategory } from "@/types/product.interface";
import axios from "axios";
//клиентская
class CategoryServices {
    private URL = `${process.env.NEXT_PUBLIC_API_URL}/category`;
    getCategory = () => {
        return axios.get<IProductWithCategory[]>(this.URL);
    };
}

export const categoryServices = new CategoryServices();
