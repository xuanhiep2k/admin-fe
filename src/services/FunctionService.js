import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
};

export function createFunction(body) {
    const url = "/function/create";
    return axios.post(url, body, config);
}


export function updateFunction(body) {
    const url = "/function/update";
    return axios.post(url, body, config);
}

export function getAllFunctions(body) {
    const url = "/function/getAllFunctions";
    return axios.post(url, body, config);
}

export function getFunctionByRoleCode(roles) {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
        },
        params: {
            roles: roles.join(",")
        }
    };
    const url = "/function/getFunctionByRoleCode";
    return axios.get(url, config);
}

export function getTree(body) {
    const url = "/function/getTree";
    return axios.post(url, body, config);
}

export function lockFunction(code) {
    const url = "/function/lock/";
    return axios.post(url + code, "", config);
}

export function unlockFunction(code) {
    const url = "/function/unlock/";
    return axios.post(url + code, "", config);
}

export function deleteFunction(code) {
    const url = "/function/delete/";
    return axios.post(url + code, "", config);
}