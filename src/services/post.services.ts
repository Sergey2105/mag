import { IPost } from "@/types/post.interface";
import axios from "axios";

class PostServices {
    private URL = "https://jsonplaceholder.typicode.com/posts";
    getPosts = () => {
        return axios.get<IPost[]>(this.URL);
    };
    POSTPosts = () => {
        return axios.get<IPost[]>(this.URL);
    };
    getPostByID = (id: number) => {
        return axios.get<IPost>(`${this.URL}/${id}`);
    };
}

export const postServices = new PostServices();
