import axios from "axios";
import { ACCESS_TOKEN, BASE_URL } from "../constants"

const api = {
    call() {
        return axios.create({
            baseURL: BASE_URL,
        });
    },
    callWithToken() {
        return axios.create({
            baseURL: BASE_URL,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
        })
    }
}


export default api

