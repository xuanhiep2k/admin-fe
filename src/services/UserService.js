import axios from "axios";

export function getAllUsers(body, config) {
    const url = "/user/getAllUsers";
    return axios.post(url, body, config);
}

export function createUser(body, config) {
    const url = "/user/create";
    return axios.post(url, body, config);
}
