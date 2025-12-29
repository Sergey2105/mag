import { axiosClassic } from "@/app/api/axios";
import { ICategory } from "@/types/category.interface";

class CategoryService {
    private _BASE_URL = "/category";

    async fetchAll() {
        return axiosClassic.get<ICategory[]>(this._BASE_URL);
    }
}

export default new CategoryService();
