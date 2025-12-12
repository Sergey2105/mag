import { ICategory } from "@/types/category.interface";
import axios from "axios";
//клиентская
class CategoryServices {
    private URL = `${process.env.NEXT_PUBLIC_API_URL}/category`;
    getCategory = () => {
        return axios.get<ICategory[]>(this.URL);
    };
}

export const categoryServices = new CategoryServices();
