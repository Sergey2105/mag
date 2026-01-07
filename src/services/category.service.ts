import { axiosClassic } from "@/app/api/axios";
import { ICategory } from "@/types/category.interface";

class CategoryService {
    private _BASE_URL = "/category";

    async getAllCategory() {
        return axiosClassic.get<ICategory[]>(this._BASE_URL).then((res) => {
            return res.data;
        });
    }
}

export default new CategoryService();
