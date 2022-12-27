import axios from "axios";


const config = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
};

export function createRole(body) {
    const url = "/role/create";
    return axios.post(url, body, config);
}

export function updateRole(body) {
    const url = "/role/update";
    return axios.post(url, body, config);
}

export function getAllRoles(body) {
    const url = "/role/getAllRoles/";
    return axios.post(url, body, config);
}

export function lockRole(code) {
    const url = "/role/lock/";
    return axios.post(url + code, "", config);
}

export function unlockRole(code) {
    const url = "/role/unlock/";
    return axios.post(url + code, "", config);
}

export function deleteRole(code) {
    const url = "/role/delete/";
    return axios.post(url + code, "", config);
}
