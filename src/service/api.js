import axios from "axios";
import { BASE_URL } from "../constants"

const api = {
    call() {
        return axios.create({
            baseURL: BASE_URL,
        });
    }
}


export default api

