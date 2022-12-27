import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
};

export function getAllUsers(body) {
    const url = "/user/getAllUsers";
    return axios.post(url, body, config);
}

export function createUser(body) {
    const url = "/user/create";
    return axios.post(url, body, config);
}
