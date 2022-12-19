import axios from "axios";

export function login(body) {
    const url = "/auth/login";
    return axios.post(url, body);
}